import type {
	DrawableShape,
	GeneratorOptions,
	GeneratedCode,
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
	precision: number
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
		const configType = isTS
			? `: {
	preTranslateX: number;
	preTranslateY: number;
	scaleX: number;
	scaleY: number;
	rotation: number;
	translateX: number;
	translateY: number;
}`
			: '';

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
		isTS
			? 'a: number; b: number; c: number; d: number; tx: number; ty: number;\n\n\t'
			: ''
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
	const pParam = isInstanceMode ? (isTS ? 'p: any' : 'p') : '';

	return `// Transform configuration
const transformConfig${
		isTS
			? `: {
	preTranslateX: number;
	preTranslateY: number;
	scaleX: number;
	scaleY: number;
	rotation: number;
	translateX: number;
	translateY: number;
}`
			: ''
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
	options: GeneratorOptions
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
	const params = isInstanceMode ? (isTS ? 'p: any' : 'p') : '';
	return `function ${functionName}(${params})${returnType} {`;
}

function getShapePrefix(options: GeneratorOptions): string {
	const { vectorFormat, instanceMode = false } = options;
	const isInstanceMode =
		instanceMode &&
		(vectorFormat === 'createVector' || vectorFormat === 'Vec');
	return isInstanceMode ? 'p.' : '';
}

function generatePrimitiveDrawLines(
	primitive: PrimitiveData,
	options: GeneratorOptions,
	coordMultiplier: number,
	precision: number,
	vecType: string,
	vecConstructor: string,
	applyTransformCall: string
): { declarations: string[]; drawCalls: string[] } | null {
	const isProcessing = options.vectorFormat === 'Processing';
	const shapePrefix = getShapePrefix(options);
	const f = (value: number) => formatNumber(value, coordMultiplier, precision);
	const declarations: string[] = [];
	const drawCalls: string[] = [];
	const axisX = "'x'";
	const axisY = "'y'";
	const axisAvg = isProcessing ? "'a'" : "'avg'";

	const addPointDeclaration = (name: string, x: number, y: number) => {
		const valueExpr = `${applyTransformCall}${vecConstructor}(${f(x)}, ${f(y)}))`;
		if (isProcessing) {
			declarations.push(`${vecType} ${name} = ${valueExpr};`);
		} else {
			declarations.push(`const ${name} = ${valueExpr};`);
		}
	};

	const addScalarDeclaration = (name: string, value: number, axis: string) => {
		const valueExpr = `applyTransformScalar(${f(value)}, ${axis})`;
		if (isProcessing) {
			declarations.push(`float ${name} = ${valueExpr};`);
		} else {
			declarations.push(`const ${name} = ${valueExpr};`);
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
		addPointDeclaration('p1', primitive.x1, primitive.y1);
		addPointDeclaration('p2', primitive.x2, primitive.y2);
		drawCalls.push(`${shapePrefix}line(p1.x, p1.y, p2.x, p2.y);`);
		return { declarations, drawCalls };
	}

	if (primitive.kind === 'polyline' || primitive.kind === 'polygon') {
		const points = primitive.points || [];
		if (points.length < 2) return null;

		points.forEach(([x, y], index) => {
			addPointDeclaration(`p${index}`, x, y);
		});

		drawCalls.push(`${shapePrefix}beginShape();`);
		points.forEach((_, index) => {
			drawCalls.push(`${shapePrefix}vertex(p${index}.x, p${index}.y);`);
		});
		drawCalls.push(
			`${shapePrefix}endShape(${primitive.kind === 'polygon' ? 'CLOSE' : 'OPEN'});`
		);
		return { declarations, drawCalls };
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

		addPointDeclaration('rectPos', primitive.x, primitive.y);
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
				`${shapePrefix}rect(rectPos.x, rectPos.y, rectW, rectH, rectR);`
			);
		} else {
			drawCalls.push(`${shapePrefix}rect(rectPos.x, rectPos.y, rectW, rectH);`);
		}

		return { declarations, drawCalls };
	}

	if (primitive.kind === 'circle') {
		if (primitive.cx == null || primitive.cy == null || primitive.r == null) {
			return null;
		}
		addPointDeclaration('circleCenter', primitive.cx, primitive.cy);
		addScalarDeclaration('circleDiameter', primitive.r * 2, axisAvg);
		drawCalls.push(
			`${shapePrefix}circle(circleCenter.x, circleCenter.y, circleDiameter);`
		);
		return { declarations, drawCalls };
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
		addPointDeclaration('ellipseCenter', primitive.cx, primitive.cy);
		addScalarDeclaration('ellipseW', primitive.rx * 2, axisX);
		addScalarDeclaration('ellipseH', primitive.ry * 2, axisY);
		drawCalls.push(
			`${shapePrefix}ellipse(ellipseCenter.x, ellipseCenter.y, ellipseW, ellipseH);`
		);
		return { declarations, drawCalls };
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
	functionNameInput?: string
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

	const vecConstructor = isProcessing
		? isVec2D
			? 'new Vec2D'
			: 'new PVector'
		: vectorFormat === 'Vec'
		? 'new Vec'
		: instanceMode && vectorFormat === 'createVector'
		? 'p.createVector'
		: 'createVector';

	const pointDeclarations: string[] = [];
	const drawCalls: string[] = [];

	const constKeyword = isProcessing
		? isVec2D
			? 'Vec2D'
			: 'PVector'
		: 'const';
	// Only pass p to applyTransform for createVector in instance mode, not for Vec
	const applyTransformCall =
		isInstanceMode && vectorFormat === 'createVector'
			? 'applyTransform(p, '
			: 'applyTransform(';
	const sharedCode = generateTransformSetup(options);
	const functionDeclaration = getFunctionDeclaration(functionName, options);
	const shapePrefix = getShapePrefix(options);

	if (shape?.primitive) {
		const primitiveCode = generatePrimitiveDrawLines(
			shape.primitive,
			options,
			coordMultiplier,
			precision,
			constKeyword,
			vecConstructor,
			applyTransformCall
		);

		if (primitiveCode) {
			const primitiveDeclarations =
				primitiveCode.declarations.length > 0
					? `${primitiveCode.declarations
							.map(line => `\t${line}`)
							.join('\n')}\n\n`
					: '';
			const primitiveDrawCalls = primitiveCode.drawCalls
				.map(line => `\t${line}`)
				.join('\n');
			const pathCode = `${functionDeclaration}
${primitiveDeclarations}${primitiveDrawCalls}
}`;
			return { sharedCode, pathCode };
		}
	}

	const commands = parsePathData(pathData);
	let pointIndex = 0;

	// Check if path ends with Z (close path) command
	const hasClosePath =
		commands.length > 0 && commands[commands.length - 1].type === 'Z';

	commands.forEach(cmd => {
		if (cmd.type === 'M' || cmd.type === 'L') {
			const pointName = getPointName(pointIndex);
			const x = formatNumber(cmd.x!, coordMultiplier, precision);
			const y = formatNumber(cmd.y!, coordMultiplier, precision);
			pointDeclarations.push(
				`${pointName} = ${applyTransformCall}${vecConstructor}(${x}, ${y}))`
			);
			drawCalls.push(`${shapePrefix}vertex(${pointName}.x, ${pointName}.y);`);
			pointIndex++;
		} else if (cmd.type === 'C') {
			const prevPointName = getPointName(pointIndex - 1);
			const nextPointName = getPointName(pointIndex);
			const cp1Name = prevPointName + 'c';
			const cp2Name = 'c' + nextPointName;

			const x1 = formatNumber(cmd.x1!, coordMultiplier, precision);
			const y1 = formatNumber(cmd.y1!, coordMultiplier, precision);
			const x2 = formatNumber(cmd.x2!, coordMultiplier, precision);
			const y2 = formatNumber(cmd.y2!, coordMultiplier, precision);
			const x = formatNumber(cmd.x!, coordMultiplier, precision);
			const y = formatNumber(cmd.y!, coordMultiplier, precision);

			pointDeclarations.push(
				`${cp1Name} = ${applyTransformCall}${vecConstructor}(${x1}, ${y1}))`
			);
			pointDeclarations.push(
				`${cp2Name} = ${applyTransformCall}${vecConstructor}(${x2}, ${y2}))`
			);
			pointDeclarations.push(
				`${nextPointName} = ${applyTransformCall}${vecConstructor}(${x}, ${y}))`
			);

			drawCalls.push(
				`${shapePrefix}bezierVertex(${cp1Name}.x, ${cp1Name}.y, ${cp2Name}.x, ${cp2Name}.y, ${nextPointName}.x, ${nextPointName}.y);`
			);
			pointIndex++;
		}
	});

	let indentedPoints: string;
	let indentedDrawCalls: string;

	if (isProcessing) {
		indentedPoints = `\t${constKeyword} ${pointDeclarations.join(',\n\t\t')};`;
		indentedDrawCalls = drawCalls.map(call => `\t${call}`).join('\n');
	} else {
		indentedPoints = `\t${constKeyword} ${pointDeclarations.join(',\n\t\t')};`;
		indentedDrawCalls = drawCalls.map(call => `\t${call}`).join('\n');
	}

	const pathCode = `${functionDeclaration}
${indentedPoints}

\t${shapePrefix}beginShape();
${indentedDrawCalls}
\t${shapePrefix}endShape(${hasClosePath ? 'CLOSE' : 'OPEN'});
}`;

	return { sharedCode, pathCode };
}

/**
 * Generate drawAllPaths function
 */
export function generateDrawAllPaths(
	functionNames: string[],
	options: GeneratorOptions
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
			return isInstanceMode
				? `\t${functionName}(p);`
				: `\t${functionName}();`;
		}
		})
		.join('\n');

	if (isProcessing) {
		return `\nvoid drawAllPaths() {\n${pathCalls}\n}`;
	} else {
		const returnType = isTS ? ': void' : '';
		const params = isInstanceMode ? (isTS ? 'p: any' : 'p') : '';
		return `\nfunction drawAllPaths(${params})${returnType} {\n${pathCalls}\n}`;
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
