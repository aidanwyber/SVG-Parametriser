import type { GeneratorOptions, GeneratedCode } from './types';
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
}`;
}

/**
 * Convert SVG path data to p5.js code with matrix transformations
 */
export function convertPathToP5(
	pathData: string,
	options: GeneratorOptions,
	pathIndex: number
): GeneratedCode {
	const {
		vectorFormat,
		language,
		coordMultiplier,
		precision,
		processingVector = 'PVector',
		instanceMode = false,
	} = options;
	const commands = parsePathData(pathData);
	let pointIndex = 0;

	const isProcessing = vectorFormat === 'Processing';
	const isVec2D = isProcessing && processingVector === 'Vec2D';
	const isInstanceMode =
		instanceMode &&
		(vectorFormat === 'createVector' || vectorFormat === 'Vec');

	const vecConstructor = isProcessing
		? isVec2D
			? 'new Vec2D'
			: 'new PVector'
		: vectorFormat === 'Vec'
		? 'new Vec'
		: instanceMode && vectorFormat === 'createVector'
		? 'p.createVector'
		: 'createVector';

	const sharedCode = generateTransformSetup(options);
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
	const vertexPrefix = isInstanceMode ? 'p.' : '';

	// Check if path ends with Z (close path) command
	const hasClosePath = commands.length > 0 && commands[commands.length - 1].type === 'Z';

	commands.forEach(cmd => {
		if (cmd.type === 'M' || cmd.type === 'L') {
			const pointName = getPointName(pointIndex);
			const x = formatNumber(cmd.x!, coordMultiplier, precision);
			const y = formatNumber(cmd.y!, coordMultiplier, precision);
			pointDeclarations.push(
				`${pointName} = ${applyTransformCall}${vecConstructor}(${x}, ${y}))`
			);
			drawCalls.push(
				`${vertexPrefix}vertex(${pointName}.x, ${pointName}.y);`
			);
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
				`${vertexPrefix}bezierVertex(${cp1Name}.x, ${cp1Name}.y, ${cp2Name}.x, ${cp2Name}.y, ${nextPointName}.x, ${nextPointName}.y);`
			);
			pointIndex++;
		}
	});

	const isTS = language === 'typescript';
	const functionName = `drawPath${pathIndex + 1}`;

	let functionDeclaration: string;
	let indentedPoints: string;
	let indentedDrawCalls: string;
	const shapePrefix = isInstanceMode ? 'p.' : '';

	if (isProcessing) {
		// Processing: void drawPath1() { ... }
		functionDeclaration = `void ${functionName}() {`;
		indentedPoints = `\t${constKeyword} ${pointDeclarations.join(
			',\n\t\t'
		)};`;
		indentedDrawCalls = drawCalls.map(call => `\t${call}`).join('\n');
	} else {
		// JavaScript/TypeScript: function drawPath1(): void { ... } or function drawPath1(p): void { ... }
		const returnType = isTS ? ': void' : '';
		const params = isInstanceMode ? (isTS ? 'p: any' : 'p') : '';
		functionDeclaration = `function ${functionName}(${params})${returnType} {`;
		indentedPoints = `\t${constKeyword} ${pointDeclarations.join(
			',\n\t\t'
		)};`;
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
	pathCount: number,
	options: GeneratorOptions
): string {
	const { vectorFormat, language, instanceMode = false } = options;
	const isTS = language === 'typescript';
	const isProcessing = vectorFormat === 'Processing';
	const isInstanceMode =
		instanceMode &&
		(vectorFormat === 'createVector' || vectorFormat === 'Vec');

	const pathCalls = Array.from({ length: pathCount }, (_, i) => {
		const functionName = `drawPath${i + 1}`;
		if (isProcessing) {
			return `\t${functionName}();`;
		} else {
			return isInstanceMode
				? `\t${functionName}(p);`
				: `\t${functionName}();`;
		}
	}).join('\n');

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
