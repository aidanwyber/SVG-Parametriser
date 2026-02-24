import type { DrawableShape, PathCommand, PrimitiveData } from './types';
import { parsePathData } from './parser';
import { getPointName } from './utils';

interface Point {
	name: string;
	x: number;
	y: number;
}

interface BoundingBox {
	minX: number;
	minY: number;
	maxX: number;
	maxY: number;
	width: number;
	height: number;
}

interface PathColor {
	stroke: [number, number, number];
}

interface XY {
	x: number;
	y: number;
}

interface LabeledPoint {
	point: XY;
	label: string;
}

interface PathBounds {
	minX: number;
	minY: number;
	maxX: number;
	maxY: number;
}

interface Subpath {
	commands: PathCommand[];
	closed: boolean;
	bounds: PathBounds;
}

function createBounds(): PathBounds {
	return {
		minX: Number.POSITIVE_INFINITY,
		minY: Number.POSITIVE_INFINITY,
		maxX: Number.NEGATIVE_INFINITY,
		maxY: Number.NEGATIVE_INFINITY,
	};
}

function includePoint(bounds: PathBounds, x: number, y: number): void {
	bounds.minX = Math.min(bounds.minX, x);
	bounds.minY = Math.min(bounds.minY, y);
	bounds.maxX = Math.max(bounds.maxX, x);
	bounds.maxY = Math.max(bounds.maxY, y);
}

function hasBounds(bounds: PathBounds): boolean {
	return (
		Number.isFinite(bounds.minX) &&
		Number.isFinite(bounds.minY) &&
		Number.isFinite(bounds.maxX) &&
		Number.isFinite(bounds.maxY)
	);
}

function splitCommandsIntoSubpaths(commands: PathCommand[]): Subpath[] {
	const subpaths: Subpath[] = [];
	let currentCommands: PathCommand[] = [];
	let currentClosed = false;
	let currentBounds = createBounds();

	const finalizeSubpath = () => {
		if (currentCommands.length === 0) return;
		const bounds =
			hasBounds(currentBounds) ?
				{ ...currentBounds }
			:	{ minX: 0, minY: 0, maxX: 0, maxY: 0 };
		subpaths.push({
			commands: currentCommands,
			closed: currentClosed,
			bounds,
		});
		currentCommands = [];
		currentClosed = false;
		currentBounds = createBounds();
	};

	commands.forEach(cmd => {
		if (cmd.type === 'M') {
			finalizeSubpath();
			currentCommands.push(cmd);
			includePoint(currentBounds, cmd.x!, cmd.y!);
			return;
		}

		if (cmd.type === 'L') {
			if (currentCommands.length === 0) {
				currentCommands.push({ type: 'M', x: cmd.x, y: cmd.y });
			}
			currentCommands.push(cmd);
			includePoint(currentBounds, cmd.x!, cmd.y!);
			return;
		}

		if (cmd.type === 'C') {
			if (currentCommands.length === 0) return;
			currentCommands.push(cmd);
			includePoint(currentBounds, cmd.x1!, cmd.y1!);
			includePoint(currentBounds, cmd.x2!, cmd.y2!);
			includePoint(currentBounds, cmd.x!, cmd.y!);
			return;
		}

		if (cmd.type === 'Z') {
			currentClosed = true;
			finalizeSubpath();
		}
	});

	finalizeSubpath();

	return subpaths;
}

function isSubpathInsideHost(
	subpath: Subpath,
	hostBounds: PathBounds,
): boolean {
	const epsilon = 1e-6;
	return (
		subpath.bounds.minX >= hostBounds.minX - epsilon &&
		subpath.bounds.maxX <= hostBounds.maxX + epsilon &&
		subpath.bounds.minY >= hostBounds.minY - epsilon &&
		subpath.bounds.maxY <= hostBounds.maxY + epsilon
	);
}

function drawSubpathCommands(
	p: any,
	subpath: Subpath,
	transformPoint: (x: number, y: number) => XY,
): void {
	subpath.commands.forEach(cmd => {
		if (cmd.type === 'M' || cmd.type === 'L') {
			const pt = transformPoint(cmd.x!, cmd.y!);
			p.vertex(pt.x, pt.y);
			return;
		}

		if (cmd.type === 'C') {
			const cp1 = transformPoint(cmd.x1!, cmd.y1!);
			const cp2 = transformPoint(cmd.x2!, cmd.y2!);
			const end = transformPoint(cmd.x!, cmd.y!);
			p.bezierVertex(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
		}
	});
}

function drawPathWithContours(
	p: any,
	commands: PathCommand[],
	transformPoint: (x: number, y: number) => XY,
): void {
	const subpaths = splitCommandsIntoSubpaths(commands).filter(
		subpath => subpath.commands.length > 0,
	);
	if (subpaths.length === 0) return;

	let currentShape: Subpath | null = null;
	let currentShapeClosed = false;

	const finishShape = () => {
		if (!currentShape) return;
		p.endShape(currentShapeClosed ? p.CLOSE : p.OPEN);
		currentShape = null;
		currentShapeClosed = false;
	};

	subpaths.forEach(subpath => {
		if (!currentShape) {
			p.beginShape();
			drawSubpathCommands(p, subpath, transformPoint);
			currentShape = subpath;
			currentShapeClosed = subpath.closed;
			return;
		}

		const shouldDrawAsContour =
			isSubpathInsideHost(subpath, currentShape.bounds);

		if (shouldDrawAsContour) {
			// Contours require the host to close; force close when we nest.
			currentShapeClosed = true;
			p.beginContour();
			drawSubpathCommands(p, subpath, transformPoint);
			p.endContour();
			return;
		}

		finishShape();
		p.beginShape();
		drawSubpathCommands(p, subpath, transformPoint);
		currentShape = subpath;
		currentShapeClosed = subpath.closed;
	});

	finishShape();
}

/**
 * Extract all points from path commands
 */
function extractPoints(commands: PathCommand[]): Point[] {
	const points: Point[] = [];
	let pointIndex = 0;

	commands.forEach(cmd => {
		if (cmd.type === 'M' || cmd.type === 'L') {
			const name = getPointName(pointIndex);
			points.push({ name, x: cmd.x!, y: cmd.y! });
			pointIndex++;
		} else if (cmd.type === 'C') {
			const prevPointName = getPointName(pointIndex - 1);
			const nextPointName = getPointName(pointIndex);
			const cp1Name = prevPointName + 'c';
			const cp2Name = 'c' + nextPointName;

			points.push({ name: cp1Name, x: cmd.x1!, y: cmd.y1! });
			points.push({ name: cp2Name, x: cmd.x2!, y: cmd.y2! });
			points.push({ name: nextPointName, x: cmd.x!, y: cmd.y! });
			pointIndex++;
		}
	});

	return points;
}

/**
 * Calculate bounding box from points
 */
function calculateBoundingBox(points: Point[]): BoundingBox {
	const xs = points.map(p => p.x);
	const ys = points.map(p => p.y);

	const minX = Math.min(...xs);
	const minY = Math.min(...ys);
	const maxX = Math.max(...xs);
	const maxY = Math.max(...ys);

	return {
		minX,
		minY,
		maxX,
		maxY,
		width: maxX - minX,
		height: maxY - minY,
	};
}

function averageXY(points: XY[]): XY | null {
	if (points.length === 0) return null;
	const sum = points.reduce(
		(acc, p) => ({ x: acc.x + p.x, y: acc.y + p.y }),
		{ x: 0, y: 0 },
	);
	return { x: sum.x / points.length, y: sum.y / points.length };
}

function polygonCentroid(points: Array<[number, number]>): XY | null {
	if (points.length < 3) {
		return averageXY(points.map(([x, y]) => ({ x, y })));
	}

	let twiceArea = 0;
	let cx = 0;
	let cy = 0;
	for (let i = 0; i < points.length; i++) {
		const [x0, y0] = points[i];
		const [x1, y1] = points[(i + 1) % points.length];
		const cross = x0 * y1 - x1 * y0;
		twiceArea += cross;
		cx += (x0 + x1) * cross;
		cy += (y0 + y1) * cross;
	}

	if (Math.abs(twiceArea) < 1e-9) {
		return averageXY(points.map(([x, y]) => ({ x, y })));
	}

	return {
		x: cx / (3 * twiceArea),
		y: cy / (3 * twiceArea),
	};
}

function primitiveCentroid(primitive?: PrimitiveData): XY | null {
	if (!primitive) return null;

	if (primitive.kind === 'line') {
		if (
			primitive.x1 == null ||
			primitive.y1 == null ||
			primitive.x2 == null ||
			primitive.y2 == null
		) {
			return null;
		}
		return {
			x: (primitive.x1 + primitive.x2) / 2,
			y: (primitive.y1 + primitive.y2) / 2,
		};
	}

	if (primitive.kind === 'polyline') {
		const pts = primitive.points || [];
		return averageXY(pts.map(([x, y]) => ({ x, y })));
	}

	if (primitive.kind === 'polygon') {
		return polygonCentroid(primitive.points || []);
	}

	if (primitive.kind === 'rect') {
		if (
			primitive.x == null ||
			primitive.y == null ||
			primitive.width == null ||
			primitive.height == null
		) {
			return null;
		}
		return {
			x: primitive.x + primitive.width / 2,
			y: primitive.y + primitive.height / 2,
		};
	}

	if (primitive.kind === 'circle') {
		if (primitive.cx == null || primitive.cy == null) return null;
		return { x: primitive.cx, y: primitive.cy };
	}

	if (primitive.kind === 'ellipse') {
		if (primitive.cx == null || primitive.cy == null) return null;
		return { x: primitive.cx, y: primitive.cy };
	}

	return null;
}

function primitiveReferenceLabel(primitive?: PrimitiveData): string {
	if (!primitive) return 'reference';
	if (primitive.kind === 'line') return 'midpoint';
	if (primitive.kind === 'polyline' || primitive.kind === 'polygon') {
		return 'centroid';
	}
	return 'center';
}

function primitivePreviewPoints(primitive?: PrimitiveData): LabeledPoint[] {
	if (!primitive) return [];

	if (primitive.kind === 'line') {
		if (
			primitive.x1 == null ||
			primitive.y1 == null ||
			primitive.x2 == null ||
			primitive.y2 == null
		) {
			return [];
		}
		return [
			{ point: { x: primitive.x1, y: primitive.y1 }, label: 'start' },
			{ point: { x: primitive.x2, y: primitive.y2 }, label: 'end' },
		];
	}

	const centroid = primitiveCentroid(primitive);
	if (!centroid) return [];
	return [{ point: centroid, label: primitiveReferenceLabel(primitive) }];
}

/**
 * Create a p5.js instance mode preview for a path
 */
export function createPreview(
	pathData: string,
	containerId: string,
	shape?: DrawableShape,
	showCoordinates = true,
): void {
	const commands = parsePathData(pathData);
	const points = extractPoints(commands);
	const primitivePoints = primitivePreviewPoints(shape?.primitive);
	const isPrimitiveShape = !!shape?.primitive;

	if (points.length === 0) return;

	const bbox = calculateBoundingBox(points);

	// Create p5 sketch
	new (window as any).p5((p: any) => {
		const canvasSize = 500;
		const padding = 30; // Reduced padding for better fit
		const drawArea = canvasSize - padding * 2;

		// Calculate scale to fit shape in canvas (zoom to largest possible fit)
		const scaleX = bbox.width > 0 ? drawArea / bbox.width : 1;
		const scaleY = bbox.height > 0 ? drawArea / bbox.height : 1;
		const scale = Math.min(scaleX, scaleY); // Allow scaling up or down for best fit

		// Calculate offset to center the shape
		const scaledWidth = bbox.width * scale;
		const scaledHeight = bbox.height * scale;
		const offsetX = (canvasSize - scaledWidth) / 2 - bbox.minX * scale;
		const offsetY = (canvasSize - scaledHeight) / 2 - bbox.minY * scale;

		p.setup = () => {
			p.createCanvas(canvasSize, canvasSize);
			p.noLoop();
		};

		p.draw = () => {
			p.background(30);

			// Transform coordinates helper
			const transformPoint = (x: number, y: number) => ({
				x: x * scale + offsetX,
				y: y * scale + offsetY,
			});

			// Draw grid
			p.stroke(60);
			p.strokeWeight(1);
			for (let i = 0; i <= canvasSize; i += 50) {
				p.line(i, 0, i, canvasSize);
				p.line(0, i, canvasSize, i);
			}

			// Draw origin axes (at original SVG 0,0)
			const origin = transformPoint(0, 0);
			p.stroke(255, 100, 100); // Red for X axis
			p.strokeWeight(2);
			p.line(0, origin.y, canvasSize, origin.y);

			p.stroke(100, 255, 100); // Green for Y axis
			p.strokeWeight(2);
			p.line(origin.x, 0, origin.x, canvasSize);

			// Draw origin point
			p.noStroke();
			p.fill(255, 200, 0);
			p.circle(origin.x, origin.y, 12);

			// Label origin
			p.fill(255);
			p.textAlign(p.LEFT, p.BOTTOM);
			p.textSize(14);
			p.textStyle(p.BOLD);
			p.text('(0, 0)', origin.x + 8, origin.y - 8);

			// Draw the path
			p.fill(100, 150, 255, 50);
			p.stroke(100, 150, 255);
			p.strokeWeight(2);
			drawPathWithContours(p, commands, transformPoint);

			if (isPrimitiveShape && primitivePoints.length > 0) {
				// Primitives: show only relevant primitive points.
				primitivePoints.forEach(({ point, label }) => {
					const pt = transformPoint(point.x, point.y);
					p.noStroke();
					p.fill(255, 220, 120);
					p.circle(pt.x, pt.y, 12);

					p.fill(255);
					p.textAlign(p.CENTER, p.CENTER);
					p.textSize(12);
					p.textStyle(p.BOLD);
					p.text(label, pt.x, pt.y - 16);

					if (showCoordinates) {
						p.textSize(9);
						p.textStyle(p.NORMAL);
						p.fill(200);
						p.text(
							`(${point.x.toFixed(1)}, ${point.y.toFixed(1)})`,
							pt.x,
							pt.y + 16,
						);
					}
				});
			} else {
				// Draw control point lines
				p.stroke(255, 200, 100, 100);
				p.strokeWeight(1);
				let pointIdx = 0;
				commands.forEach(cmd => {
					if (cmd.type === 'C') {
						const prevPoint = points.find(
							pt =>
								pt.name ===
								String.fromCharCode(65 + pointIdx - 1),
						);
						const cp1Point = points.find(
							pt => pt.name === prevPoint?.name + 'c',
						);
						const cp2Point = points.find(
							pt =>
								pt.name ===
								'c' + String.fromCharCode(65 + pointIdx),
						);
						const endPoint = points.find(
							pt =>
								pt.name === String.fromCharCode(65 + pointIdx),
						);

						if (prevPoint && cp1Point) {
							const pt1 = transformPoint(
								prevPoint.x,
								prevPoint.y,
							);
							const pt2 = transformPoint(cp1Point.x, cp1Point.y);
							p.line(pt1.x, pt1.y, pt2.x, pt2.y);
						}
						if (cp2Point && endPoint) {
							const pt1 = transformPoint(cp2Point.x, cp2Point.y);
							const pt2 = transformPoint(endPoint.x, endPoint.y);
							p.line(pt1.x, pt1.y, pt2.x, pt2.y);
						}
						pointIdx++;
					} else if (cmd.type === 'M' || cmd.type === 'L') {
						pointIdx++;
					}
				});

				// Draw points and labels
				points.forEach(point => {
					const pt = transformPoint(point.x, point.y);

					// Determine if it's a control point
					const isControlPoint = point.name.includes('c');

					// Draw point
					p.noStroke();
					if (isControlPoint) {
						p.fill(255, 200, 100); // Orange for control points
						p.circle(pt.x, pt.y, 8);
					} else {
						p.fill(100, 255, 150); // Green for main points
						p.circle(pt.x, pt.y, 10);
					}

					// Draw label
					p.fill(255);
					p.noStroke();
					p.textAlign(p.CENTER, p.CENTER);
					p.textSize(12);
					p.textStyle(p.BOLD);

					// Position label slightly offset from point
					const labelOffset = 15;
					p.text(point.name, pt.x, pt.y - labelOffset);

					// Draw coordinate text
					if (showCoordinates) {
						p.textSize(9);
						p.textStyle(p.NORMAL);
						p.fill(200);
						p.text(
							`(${point.x.toFixed(1)}, ${point.y.toFixed(1)})`,
							pt.x,
							pt.y + labelOffset + 3,
						);
					}
				});
			}

			// Draw scale info
			p.fill(200);
			p.noStroke();
			p.textAlign(p.LEFT, p.TOP);
			p.textSize(11);
			p.text(`Scale: ${scale.toFixed(3)}x`, 10, 10);
			p.text(
				`Size: ${bbox.width.toFixed(1)} × ${bbox.height.toFixed(1)}`,
				10,
				25,
			);
		};
	}, containerId);
}

/**
 * Create a p5.js preview for all paths together with random colors
 */
export function createCombinedPreview(
	pathsData: string[],
	shapeIds: number[],
	containerId: string,
	shapes: DrawableShape[] = [],
): void {
	const parsedPaths = pathsData
		.map((pathData, index) => ({
			id: shapeIds[index] ?? index + 1,
			commands: parsePathData(pathData),
			primitive: shapes[index]?.primitive,
		}))
		.filter(item => item.commands.length > 0);
	const allPoints = parsedPaths.flatMap(item => extractPoints(item.commands));

	if (allPoints.length === 0) return;

	const bbox = calculateBoundingBox(allPoints);
	const colors: PathColor[] = parsedPaths.map(() => {
		const r = 80 + Math.floor(Math.random() * 176);
		const g = 80 + Math.floor(Math.random() * 176);
		const b = 80 + Math.floor(Math.random() * 176);
		return {
			stroke: [r, g, b],
		};
	});

	new (window as any).p5((p: any) => {
		const canvasSize = 500;
		const padding = 30;
		const drawArea = canvasSize - padding * 2;

		const scaleX = bbox.width > 0 ? drawArea / bbox.width : 1;
		const scaleY = bbox.height > 0 ? drawArea / bbox.height : 1;
		const scale = Math.min(scaleX, scaleY);

		const scaledWidth = bbox.width * scale;
		const scaledHeight = bbox.height * scale;
		const offsetX = (canvasSize - scaledWidth) / 2 - bbox.minX * scale;
		const offsetY = (canvasSize - scaledHeight) / 2 - bbox.minY * scale;

		const transformPoint = (x: number, y: number) => ({
			x: x * scale + offsetX,
			y: y * scale + offsetY,
		});

		p.setup = () => {
			p.createCanvas(canvasSize, canvasSize);
			p.noLoop();
		};

		p.draw = () => {
			p.background(30);

			// Draw grid
			p.stroke(60);
			p.strokeWeight(1);
			for (let i = 0; i <= canvasSize; i += 50) {
				p.line(i, 0, i, canvasSize);
				p.line(0, i, canvasSize, i);
			}

			// Draw origin axes (at original SVG 0,0)
			const origin = transformPoint(0, 0);
			p.stroke(255, 100, 100);
			p.strokeWeight(2);
			p.line(0, origin.y, canvasSize, origin.y);

			p.stroke(100, 255, 100);
			p.strokeWeight(2);
			p.line(origin.x, 0, origin.x, canvasSize);

			// Draw origin point
			p.noStroke();
			p.fill(255, 200, 0);
			p.circle(origin.x, origin.y, 10);

			parsedPaths.forEach((item, index) => {
				const commands = item.commands;
				const color = colors[index];
				p.noFill();
				p.stroke(color.stroke[0], color.stroke[1], color.stroke[2]);
				p.strokeWeight(2);
				drawPathWithContours(p, commands, transformPoint);
			});

			// Label each path start with its numeric ID
			p.noStroke();
			p.fill(255);
			p.textAlign(p.CENTER, p.CENTER);
			p.textSize(11);
			p.textStyle(p.BOLD);
			parsedPaths.forEach(item => {
				const centroidFromPrimitive = primitiveCentroid(item.primitive);
				const centroidFromPath = averageXY(
					extractPoints(item.commands).map(point => ({
						x: point.x,
						y: point.y,
					})),
				);
				const labelPoint = centroidFromPrimitive ?? centroidFromPath;
				if (!labelPoint) return;
				const pt = transformPoint(labelPoint.x, labelPoint.y);
				p.text(String(item.id), pt.x, pt.y);
			});

			// Draw scale and path count
			p.fill(200);
			p.noStroke();
			p.textAlign(p.LEFT, p.TOP);
			p.textSize(11);
			p.text(`Paths: ${parsedPaths.length}`, 10, 10);
			p.text(`Scale: ${scale.toFixed(3)}x`, 10, 25);
			p.text(
				`Size: ${bbox.width.toFixed(1)} x ${bbox.height.toFixed(1)}`,
				10,
				40,
			);
		};
	}, containerId);
}
