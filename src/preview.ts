import type { PathCommand } from './types';
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

/**
 * Create a p5.js instance mode preview for a path
 */
export function createPreview(pathData: string, containerId: string): void {
	const commands = parsePathData(pathData);
	const points = extractPoints(commands);

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
			p.beginShape();

			let currentPointIndex = 0;
			commands.forEach(cmd => {
				if (cmd.type === 'M') {
					const pt = transformPoint(cmd.x!, cmd.y!);
					p.vertex(pt.x, pt.y);
					currentPointIndex++;
				} else if (cmd.type === 'L') {
					const pt = transformPoint(cmd.x!, cmd.y!);
					p.vertex(pt.x, pt.y);
					currentPointIndex++;
				} else if (cmd.type === 'C') {
					const cp1 = transformPoint(cmd.x1!, cmd.y1!);
					const cp2 = transformPoint(cmd.x2!, cmd.y2!);
					const end = transformPoint(cmd.x!, cmd.y!);
					p.bezierVertex(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
					currentPointIndex++;
				}
			});
			p.endShape(p.CLOSE);

			// Draw control point lines
			p.stroke(255, 200, 100, 100);
			p.strokeWeight(1);
			let pointIdx = 0;
			commands.forEach(cmd => {
				if (cmd.type === 'C') {
					const prevPoint = points.find(
						pt => pt.name === String.fromCharCode(65 + pointIdx - 1)
					);
					const cp1Point = points.find(
						pt => pt.name === prevPoint?.name + 'c'
					);
					const cp2Point = points.find(
						pt =>
							pt.name === 'c' + String.fromCharCode(65 + pointIdx)
					);
					const endPoint = points.find(
						pt => pt.name === String.fromCharCode(65 + pointIdx)
					);

					if (prevPoint && cp1Point) {
						const pt1 = transformPoint(prevPoint.x, prevPoint.y);
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
				p.textSize(9);
				p.textStyle(p.NORMAL);
				p.fill(200);
				p.text(
					`(${point.x.toFixed(1)}, ${point.y.toFixed(1)})`,
					pt.x,
					pt.y + labelOffset + 3
				);
			});

			// Draw scale info
			p.fill(200);
			p.noStroke();
			p.textAlign(p.LEFT, p.TOP);
			p.textSize(11);
			p.text(`Scale: ${scale.toFixed(3)}x`, 10, 10);
			p.text(
				`Size: ${bbox.width.toFixed(1)} × ${bbox.height.toFixed(1)}`,
				10,
				25
			);
		};
	}, containerId);
}
