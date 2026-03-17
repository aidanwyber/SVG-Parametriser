import type {
	DrawableShape,
	GeneratorOptions,
	GeneratedCode,
	PathCommand,
	PrimitiveData,
} from './types';
import { parsePathData } from './parser';
import { getPointName } from './utils';

/**
 * Format a number with specified precision and multiplier
 * Removes unnecessary trailing zeros
 */
function formatNumber(
	num: number,
	multiplier: number,
	precision: number,
): string {
	const fixed = (num * multiplier).toFixed(precision);
	return parseFloat(fixed).toString();
}

/**
 * Generate transform setup code
 */
function generateTransformSetup(options: GeneratorOptions): string {
	const {
		vectorFormat,
		language,
		processingVector = 'PVector',
		instanceMode = false,
	} = options;
	const isTS = language === 'typescript';
	const isProcessing = vectorFormat === 'Processing';
	const isVec2D = isProcessing && processingVector === 'Vec2D';
	const isInstanceMode = instanceMode && vectorFormat === 'createVector';

	if (isProcessing) {
		const vecType = isVec2D ? 'Vec2D' : 'PVector';
		const importStatement = isVec2D ? 'import toxi.geom.*;\n\n' : '';

		return `${importStatement}// Transform configuration
class TransformConfig {
	float preTranslateX = 0;
	float preTranslateY = 0;
	float scaleX = 1;
	float scaleY = 1;
	float rotation = 0;
	float translateX = 0;
	float translateY = 0;
}

TransformConfig transformConfig = new TransformConfig();

${vecType} applyTransform(${vecType} v) {
	float x = v.x + transformConfig.preTranslateX;
	float y = v.y + transformConfig.preTranslateY;

	x *= transformConfig.scaleX;
	y *= transformConfig.scaleY;

	if (transformConfig.rotation != 0) {
		float c = cos(transformConfig.rotation);
		float s = sin(transformConfig.rotation);
		float rx = x * c - y * s;
		float ry = x * s + y * c;
		x = rx;
		y = ry;
	}

	x += transformConfig.translateX;
	y += transformConfig.translateY;

	return new ${vecType}(x, y);
}

float applyTransformScalar(float value) {
	return applyTransformScalar(value, 'a');
}

float applyTransformScalar(float value, char axis) {
	if (axis == 'x') {
		return value * transformConfig.scaleX;
	}
	if (axis == 'y') {
		return value * transformConfig.scaleY;
	}
	return value * ((abs(transformConfig.scaleX) + abs(transformConfig.scaleY)) * 0.5);
}`;
	}

	if (vectorFormat === 'Vec') {
		const configType =
			isTS ?
				`: {
	preTranslateX: number;
	preTranslateY: number;
	scaleX: number;
	scaleY: number;
	rotation: number;
	translateX: number;
	translateY: number;
}`
			:	'';

		return `// Transform configuration
const transformConfig${configType} = {
	preTranslateX: 0,
	preTranslateY: 0,
	scaleX: 1,
	scaleY: 1,
	rotation: 0,
	translateX: 0,
	translateY: 0
};

class Matrix2D {
	${
		isTS ?
			'a: number; b: number; c: number; d: number; tx: number; ty: number;\n\n\t'
		:	''
	}constructor(a${isTS ? ': number' : ''}, b${isTS ? ': number' : ''}, c${
		isTS ? ': number' : ''
	}, d${isTS ? ': number' : ''}, tx${isTS ? ': number' : ''}, ty${
		isTS ? ': number' : ''
	}) {
		this.a = a; this.b = b;
		this.c = c; this.d = d;
		this.tx = tx; this.ty = ty;
	}

	transform(x${isTS ? ': number' : ''}, y${isTS ? ': number' : ''})${
		isTS ? ': [number, number]' : ''
	} {
		return [
			this.a * x + this.c * y + this.tx,
			this.b * x + this.d * y + this.ty
		];
	}

	static fromTransform(config${isTS ? ': typeof transformConfig' : ''})${
		isTS ? ': Matrix2D' : ''
	} {
		const cos = Math.cos(config.rotation);
		const sin = Math.sin(config.rotation);

		return new Matrix2D(
			config.scaleX * cos,
			config.scaleX * sin,
			config.scaleY * -sin,
			config.scaleY * cos,
			config.translateX + config.scaleX * (cos * config.preTranslateX - sin * config.preTranslateY),
			config.translateY + config.scaleY * (sin * config.preTranslateX + cos * config.preTranslateY)
		);
	}
}

const transform = Matrix2D.fromTransform(transformConfig);

function applyTransform(v${isTS ? ': Vec' : ''})${isTS ? ': Vec' : ''} {
	const [x, y] = transform.transform(v.x, v.y);
	return new Vec(x, y);
}

function applyTransformScalar(value${isTS ? ': number' : ''}, axis${
			isTS ? ": 'x' | 'y' | 'avg'" : ''
		} = 'avg')${isTS ? ': number' : ''} {
	if (axis === 'x') {
		return value * transformConfig.scaleX;
	}
	if (axis === 'y') {
		return value * transformConfig.scaleY;
	}
	return value * ((Math.abs(transformConfig.scaleX) + Math.abs(transformConfig.scaleY)) * 0.5);
}`;
	}

	// p5.js (createVector)
	const vecConstructor = isInstanceMode ? 'p.createVector' : 'createVector';
	const vecType = isTS ? 'p5.Vector' : '';
	const pParam =
		isInstanceMode ?
			isTS ? 'p: any'
			:	'p'
		:	'';

	return `// Transform configuration
const transformConfig${
		isTS ?
			`: {
	preTranslateX: number;
	preTranslateY: number;
	scaleX: number;
	scaleY: number;
	rotation: number;
	translateX: number;
	translateY: number;
}`
		:	''
	} = {
	preTranslateX: 0,
	preTranslateY: 0,
	scaleX: 1,
	scaleY: 1,
	rotation: 0,
	translateX: 0,
	translateY: 0
};

function applyTransform(${pParam ? pParam + ', ' : ''}v${
		isTS ? `: ${vecType}` : ''
	})${isTS ? `: ${vecType}` : ''} {
	let x = v.x + transformConfig.preTranslateX;
	let y = v.y + transformConfig.preTranslateY;

	x *= transformConfig.scaleX;
	y *= transformConfig.scaleY;

	if (transformConfig.rotation !== 0) {
		const cos = Math.cos(transformConfig.rotation);
		const sin = Math.sin(transformConfig.rotation);
		const rx = x * cos - y * sin;
		const ry = x * sin + y * cos;
		x = rx;
		y = ry;
	}

	x += transformConfig.translateX;
	y += transformConfig.translateY;

	return ${vecConstructor}(x, y);
}

function applyTransformScalar(value${isTS ? ': number' : ''}, axis${
		isTS ? ": 'x' | 'y' | 'avg'" : ''
	} = 'avg')${isTS ? ': number' : ''} {
	if (axis === 'x') {
		return value * transformConfig.scaleX;
	}
	if (axis === 'y') {
		return value * transformConfig.scaleY;
	}
	return value * ((Math.abs(transformConfig.scaleX) + Math.abs(transformConfig.scaleY)) * 0.5);
}`;
}

function getFunctionDeclaration(
	functionName: string,
	options: GeneratorOptions,
): string {
	const { vectorFormat, language, instanceMode = false } = options;
	const isTS = language === 'typescript';
	const isProcessing = vectorFormat === 'Processing';
	const isInstanceMode =
		instanceMode &&
		(vectorFormat === 'createVector' || vectorFormat === 'Vec');

	if (isProcessing) {
		return `void ${functionName}() {`;
	}

	const returnType = isTS ? ': void' : '';
	const params =
		isInstanceMode ?
			isTS ? 'p: any'
			:	'p'
		:	'';
	return `function ${functionName}(${params})${returnType} {`;
}

function getShapePrefix(options: GeneratorOptions): string {
	const { vectorFormat, instanceMode = false } = options;
	const isInstanceMode =
		instanceMode &&
		(vectorFormat === 'createVector' || vectorFormat === 'Vec');
	return isInstanceMode ? 'p.' : '';
}

function getVectorType(options: GeneratorOptions): string {
	const { vectorFormat, processingVector = 'PVector', language } = options;

	if (vectorFormat === 'Processing') {
		return processingVector === 'Vec2D' ? 'Vec2D' : 'PVector';
	}

	if (vectorFormat === 'Vec') {
		return 'Vec';
	}

	return language === 'typescript' ? 'p5.Vector' : '';
}

function formatGlobalPointDeclarations(
	pointNames: string[],
	options: GeneratorOptions,
): string[] {
	if (pointNames.length === 0) return [];

	if (options.vectorFormat === 'Processing') {
		return [`${getVectorType(options)} ${pointNames.join(', ')};`];
	}

	const typeAnnotation =
		options.language === 'typescript' ? `: ${getVectorType(options)}` : '';
	return pointNames.map(name => `let ${name}${typeAnnotation};`);
}

function formatPointArrayDeclaration(
	arrayName: string,
	options: GeneratorOptions,
): string {
	if (options.vectorFormat === 'Processing') {
		return `${getVectorType(options)}[] ${arrayName} = new ${getVectorType(options)}[0];`;
	}

	if (options.language === 'typescript') {
		return `let ${arrayName}: ${getVectorType(options)}[] = [];`;
	}

	return `let ${arrayName} = [];`;
}

function formatPointArrayAssignment(
	arrayName: string,
	pointNames: string[],
	options: GeneratorOptions,
): string {
	if (options.vectorFormat === 'Processing') {
		return `${arrayName} = new ${getVectorType(options)}[] { ${pointNames.join(', ')} };`;
	}

	return `${arrayName} = [${pointNames.join(', ')}];`;
}

function indentLines(lines: string[]): string {
	return lines.map(line => `\t${line}`).join('\n');
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

function generatePrimitiveDrawLines(
	primitive: PrimitiveData,
	options: GeneratorOptions,
	coordMultiplier: number,
	precision: number,
	vecConstructor: string,
	applyTransformCall: string,
	globalPrefix: string,
	pointArrayName: string,
): {
	globalCode: string;
	assignments: string[];
	localDeclarations: string[];
	drawCalls: string[];
} | null {
	const isProcessing = options.vectorFormat === 'Processing';
	const shapePrefix = getShapePrefix(options);
	const f = (value: number) =>
		formatNumber(value, coordMultiplier, precision);
	const pointAssignments: string[] = [];
	const pointNames: string[] = [];
	const localDeclarations: string[] = [];
	const drawCalls: string[] = [];
	const axisX = "'x'";
	const axisY = "'y'";
	const axisAvg = isProcessing ? "'a'" : "'avg'";

	const addPointAssignment = (name: string, x: number, y: number) => {
		const scopedName = `${globalPrefix}_${name}`;
		const valueExpr = `${applyTransformCall}${vecConstructor}(${f(x)}, ${f(y)}))`;
		pointNames.push(scopedName);
		pointAssignments.push(`${scopedName} = ${valueExpr};`);
		return scopedName;
	};

	const addScalarDeclaration = (
		name: string,
		value: number,
		axis: string,
	) => {
		const valueExpr = `applyTransformScalar(${f(value)}, ${axis})`;
		if (isProcessing) {
			localDeclarations.push(`float ${name} = ${valueExpr};`);
		} else {
			localDeclarations.push(`const ${name} = ${valueExpr};`);
		}
	};

	if (primitive.kind === 'line') {
		if (
			primitive.x1 == null ||
			primitive.y1 == null ||
			primitive.x2 == null ||
			primitive.y2 == null
		) {
			return null;
		}
		const p1 = addPointAssignment('p1', primitive.x1, primitive.y1);
		const p2 = addPointAssignment('p2', primitive.x2, primitive.y2);
		drawCalls.push(
			`${shapePrefix}line(${p1}.x, ${p1}.y, ${p2}.x, ${p2}.y);`,
		);
		return {
			globalCode: [
				...formatGlobalPointDeclarations(pointNames, options),
				formatPointArrayDeclaration(pointArrayName, options),
			].join('\n'),
			assignments: [
				...pointAssignments,
				formatPointArrayAssignment(pointArrayName, pointNames, options),
			],
			localDeclarations,
			drawCalls,
		};
	}

	if (primitive.kind === 'polyline' || primitive.kind === 'polygon') {
		const points = primitive.points || [];
		if (points.length < 2) return null;

		points.forEach(([x, y], index) => {
			addPointAssignment(`p${index}`, x, y);
		});

		drawCalls.push(`${shapePrefix}beginShape();`);
		pointNames.forEach(pointName => {
			drawCalls.push(
				`${shapePrefix}vertex(${pointName}.x, ${pointName}.y);`,
			);
		});
		drawCalls.push(
			`${shapePrefix}endShape(${primitive.kind === 'polygon' ? 'CLOSE' : 'OPEN'});`,
		);
		return {
			globalCode: [
				...formatGlobalPointDeclarations(pointNames, options),
				formatPointArrayDeclaration(pointArrayName, options),
			].join('\n'),
			assignments: [
				...pointAssignments,
				formatPointArrayAssignment(pointArrayName, pointNames, options),
			],
			localDeclarations,
			drawCalls,
		};
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

		const rectPos = addPointAssignment('rectPos', primitive.x, primitive.y);
		addScalarDeclaration('rectW', primitive.width, axisX);
		addScalarDeclaration('rectH', primitive.height, axisY);

		const rx = primitive.rx || 0;
		const ry = primitive.ry || 0;
		if (rx > 0 || ry > 0) {
			// SVG supports independent rx/ry; rect() supports one radius value cleanly.
			if (Math.abs(rx - ry) > 1e-9) {
				return null;
			}
			addScalarDeclaration('rectR', rx, axisAvg);
			drawCalls.push(
				`${shapePrefix}rect(${rectPos}.x, ${rectPos}.y, rectW, rectH, rectR);`,
			);
		} else {
			drawCalls.push(
				`${shapePrefix}rect(${rectPos}.x, ${rectPos}.y, rectW, rectH);`,
			);
		}

		return {
			globalCode: [
				...formatGlobalPointDeclarations(pointNames, options),
				formatPointArrayDeclaration(pointArrayName, options),
			].join('\n'),
			assignments: [
				...pointAssignments,
				formatPointArrayAssignment(pointArrayName, pointNames, options),
			],
			localDeclarations,
			drawCalls,
		};
	}

	if (primitive.kind === 'circle') {
		if (
			primitive.cx == null ||
			primitive.cy == null ||
			primitive.r == null
		) {
			return null;
		}
		const circleCenter = addPointAssignment(
			'circleCenter',
			primitive.cx,
			primitive.cy,
		);
		addScalarDeclaration('circleDiameter', primitive.r * 2, axisAvg);
		drawCalls.push(
			`${shapePrefix}circle(${circleCenter}.x, ${circleCenter}.y, circleDiameter);`,
		);
		return {
			globalCode: [
				...formatGlobalPointDeclarations(pointNames, options),
				formatPointArrayDeclaration(pointArrayName, options),
			].join('\n'),
			assignments: [
				...pointAssignments,
				formatPointArrayAssignment(pointArrayName, pointNames, options),
			],
			localDeclarations,
			drawCalls,
		};
	}

	if (primitive.kind === 'ellipse') {
		if (
			primitive.cx == null ||
			primitive.cy == null ||
			primitive.rx == null ||
			primitive.ry == null
		) {
			return null;
		}
		const ellipseCenter = addPointAssignment(
			'ellipseCenter',
			primitive.cx,
			primitive.cy,
		);
		addScalarDeclaration('ellipseW', primitive.rx * 2, axisX);
		addScalarDeclaration('ellipseH', primitive.ry * 2, axisY);
		drawCalls.push(
			`${shapePrefix}ellipse(${ellipseCenter}.x, ${ellipseCenter}.y, ellipseW, ellipseH);`,
		);
		return {
			globalCode: [
				...formatGlobalPointDeclarations(pointNames, options),
				formatPointArrayDeclaration(pointArrayName, options),
			].join('\n'),
			assignments: [
				...pointAssignments,
				formatPointArrayAssignment(pointArrayName, pointNames, options),
			],
			localDeclarations,
			drawCalls,
		};
	}

	return null;
}

/**
 * Convert SVG path data to p5.js code with matrix transformations
 */
export function convertPathToP5(
	pathData: string,
	options: GeneratorOptions,
	pathIndex: number,
	shape?: DrawableShape,
	functionNameInput?: string,
): GeneratedCode {
	const {
		vectorFormat,
		coordMultiplier,
		precision,
		processingVector = 'PVector',
		instanceMode = false,
	} = options;

	const isProcessing = vectorFormat === 'Processing';
	const isVec2D = isProcessing && processingVector === 'Vec2D';
	const isInstanceMode =
		instanceMode &&
		(vectorFormat === 'createVector' || vectorFormat === 'Vec');
	const functionName = functionNameInput || `drawPath${pathIndex + 1}`;

	const vecConstructor =
		isProcessing ?
			isVec2D ? 'new Vec2D'
			:	'new PVector'
		: vectorFormat === 'Vec' ? 'new Vec'
		: instanceMode && vectorFormat === 'createVector' ? 'p.createVector'
		: 'createVector';

	// Only pass p to applyTransform for createVector in instance mode, not for Vec
	const applyTransformCall =
		isInstanceMode && vectorFormat === 'createVector' ?
			'applyTransform(p, '
		:	'applyTransform(';
	const sharedCode = generateTransformSetup(options);
	const functionDeclaration = getFunctionDeclaration(functionName, options);
	const shapePrefix = getShapePrefix(options);
	const pointArrayName = `${functionName}Points`;

	if (shape?.primitive) {
		const primitiveCode = generatePrimitiveDrawLines(
			shape.primitive,
			options,
			coordMultiplier,
			precision,
			vecConstructor,
			applyTransformCall,
			functionName,
			pointArrayName,
		);

		if (primitiveCode) {
			const functionLines = [
				...primitiveCode.assignments,
				...primitiveCode.localDeclarations,
				...primitiveCode.drawCalls,
			];
			const pathCode = `${functionDeclaration}
${indentLines(functionLines)}
}`;
			return {
				sharedCode,
				globalCode: primitiveCode.globalCode,
				pathCode,
			};
		}
	}

	const commands = parsePathData(pathData);
	const subpaths = splitCommandsIntoSubpaths(commands);
	let pointIndex = 0;
	const pointNames: string[] = [];
	const pointAssignments: string[] = [];

	const getSubpathDrawLines = (subpath: Subpath): string[] => {
		const lines: string[] = [];

		subpath.commands.forEach(cmd => {
			if (cmd.type === 'M' || cmd.type === 'L') {
				const pointName = `${functionName}_${getPointName(pointIndex)}`;
				const x = formatNumber(cmd.x!, coordMultiplier, precision);
				const y = formatNumber(cmd.y!, coordMultiplier, precision);
				pointNames.push(pointName);
				pointAssignments.push(
					`${pointName} = ${applyTransformCall}${vecConstructor}(${x}, ${y}));`,
				);
				lines.push(
					`${shapePrefix}vertex(${pointName}.x, ${pointName}.y);`,
				);
				pointIndex++;
				return;
			}

			if (cmd.type === 'C') {
				const prevPointName = `${functionName}_${getPointName(pointIndex - 1)}`;
				const nextPointName = `${functionName}_${getPointName(pointIndex)}`;
				const cp1Name = prevPointName + 'c';
				const cp2Name = 'c' + nextPointName;

				const x1 = formatNumber(cmd.x1!, coordMultiplier, precision);
				const y1 = formatNumber(cmd.y1!, coordMultiplier, precision);
				const x2 = formatNumber(cmd.x2!, coordMultiplier, precision);
				const y2 = formatNumber(cmd.y2!, coordMultiplier, precision);
				const x = formatNumber(cmd.x!, coordMultiplier, precision);
				const y = formatNumber(cmd.y!, coordMultiplier, precision);

				pointNames.push(cp1Name, cp2Name, nextPointName);
				pointAssignments.push(
					`${cp1Name} = ${applyTransformCall}${vecConstructor}(${x1}, ${y1}));`,
				);
				pointAssignments.push(
					`${cp2Name} = ${applyTransformCall}${vecConstructor}(${x2}, ${y2}));`,
				);
				pointAssignments.push(
					`${nextPointName} = ${applyTransformCall}${vecConstructor}(${x}, ${y}));`,
				);

				lines.push(
					`${shapePrefix}bezierVertex(${cp1Name}.x, ${cp1Name}.y, ${cp2Name}.x, ${cp2Name}.y, ${nextPointName}.x, ${nextPointName}.y);`,
				);
				pointIndex++;
			}
		});

		return lines;
	};

	let currentShapeLines: string[] = [];
	let currentShapeClosed = false;
	let currentHostBounds: PathBounds | null = null;
	let currentContourCount = 0;
	const shapeBlocks: string[] = [];

	const flushCurrentShape = () => {
		if (currentShapeLines.length === 0) return;
		shapeBlocks.push(
			[
				`${shapePrefix}beginShape();`,
				...currentShapeLines,
				`${shapePrefix}endShape(${currentShapeClosed ? 'CLOSE' : 'OPEN'});`,
			].join('\n'),
		);
		currentShapeLines = [];
		currentShapeClosed = false;
		currentHostBounds = null;
		currentContourCount = 0;
	};

	subpaths.forEach(subpath => {
		const subpathLines = getSubpathDrawLines(subpath);
		if (subpathLines.length === 0) return;

		if (currentShapeLines.length === 0) {
			currentShapeLines = subpathLines;
			currentShapeClosed = subpath.closed;
			currentHostBounds = subpath.bounds;
			currentContourCount = 0;
			return;
		}

		const shouldAddContour =
			currentHostBounds !== null &&
			isSubpathInsideHost(subpath, currentHostBounds);

		if (shouldAddContour) {
			// Contours require the host to close; force close when we nest.
			currentShapeClosed = true;
			currentShapeLines.push(`${shapePrefix}beginContour();`);
			currentShapeLines.push(...subpathLines);
			currentShapeLines.push(`${shapePrefix}endContour();`);
			currentContourCount++;
			return;
		}

		const shouldSwapHostAndContour =
			currentHostBounds !== null &&
			currentContourCount === 0 &&
			isSubpathInsideHost(
				{
					commands: [],
					closed: false,
					bounds: currentHostBounds,
				},
				subpath.bounds,
			);

		if (shouldSwapHostAndContour) {
			// If the current host is inside the next subpath, use the larger one as host.
			const previousHostLines = [...currentShapeLines];
			currentShapeClosed = true;
			currentHostBounds = subpath.bounds;
			currentShapeLines = [
				...subpathLines,
				`${shapePrefix}beginContour();`,
				...previousHostLines,
				`${shapePrefix}endContour();`,
			];
			currentContourCount = 1;
			return;
		}

		flushCurrentShape();
		currentShapeLines = subpathLines;
		currentShapeClosed = subpath.closed;
		currentHostBounds = subpath.bounds;
		currentContourCount = 0;
	});

	flushCurrentShape();

	const globalLines = [
		...formatGlobalPointDeclarations(pointNames, options),
		formatPointArrayDeclaration(pointArrayName, options),
	];
	const indentedDrawCalls = shapeBlocks
		.map(block =>
			block
				.split('\n')
				.map(line => `\t${line}`)
				.join('\n'),
		)
		.join('\n\n');

	const functionLines = [
		...pointAssignments,
		formatPointArrayAssignment(pointArrayName, pointNames, options),
	];
	const pointsSection =
		functionLines.length > 0 ? `${indentLines(functionLines)}\n\n` : '';
	const drawSection = indentedDrawCalls ? `${indentedDrawCalls}\n` : '';

	const pathCode = `${functionDeclaration}
${pointsSection}${drawSection}}`;

	return {
		sharedCode,
		globalCode: globalLines.join('\n'),
		pathCode,
	};
}

/**
 * Generate drawAllPaths function
 */
export function generateDrawAllPaths(
	functionNames: string[],
	options: GeneratorOptions,
	drawFunctionName = 'drawAllPaths',
): string {
	const { vectorFormat, language, instanceMode = false } = options;
	const isTS = language === 'typescript';
	const isProcessing = vectorFormat === 'Processing';
	const isInstanceMode =
		instanceMode &&
		(vectorFormat === 'createVector' || vectorFormat === 'Vec');

	const pathCalls = functionNames
		.map(functionName => {
			if (isProcessing) {
				return `\t${functionName}();`;
			} else {
				return isInstanceMode ?
						`\t${functionName}(p);`
					:	`\t${functionName}();`;
			}
		})
		.join('\n');

	if (isProcessing) {
		return `\nvoid ${drawFunctionName}() {\n${pathCalls}\n}`;
	} else {
		const returnType = isTS ? ': void' : '';
		const params =
			isInstanceMode ?
				isTS ? 'p: any'
				:	'p'
			:	'';
		return `\nfunction ${drawFunctionName}(${params})${returnType} {\n${pathCalls}\n}`;
	}
}

/**
 * Helper to escape HTML for display
 */
export function escapeHtml(text: string): string {
	const div = document.createElement('div');
	div.textContent = text;
	return div.innerHTML;
}
