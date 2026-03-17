export interface PathCommand {
	type: 'M' | 'L' | 'C' | 'Z';
	x?: number;
	y?: number;
	x1?: number;
	y1?: number;
	x2?: number;
	y2?: number;
}

export type PrimitiveKind =
	| 'line'
	| 'polyline'
	| 'polygon'
	| 'rect'
	| 'circle'
	| 'ellipse';

export interface PrimitiveData {
	kind: PrimitiveKind;
	points?: Array<[number, number]>;
	x?: number;
	y?: number;
	width?: number;
	height?: number;
	rx?: number;
	ry?: number;
	cx?: number;
	cy?: number;
	r?: number;
	x1?: number;
	y1?: number;
	x2?: number;
	y2?: number;
}

export interface DrawableShape {
	pathData: string;
	sourceIndex: number;
	primitive?: PrimitiveData;
}

export type VectorFormat = 'Vec' | 'createVector' | 'Processing';
export type Language = 'javascript' | 'typescript';
export type ProcessingVector = 'PVector' | 'Vec2D';

export interface GeneratorOptions {
	vectorFormat: VectorFormat;
	language: Language;
	coordMultiplier: number;
	precision: number;
	processingVector?: ProcessingVector;
	instanceMode?: boolean;
}

export interface GeneratedCode {
	sharedCode: string;
	globalCode: string;
	pathCode: string;
}

export interface TransformConfig {
	scaleX: number;
	scaleY: number;
	rotation: number;
	originX: number;
	originY: number;
}
