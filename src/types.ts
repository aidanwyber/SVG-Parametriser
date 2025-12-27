export interface PathCommand {
	type: 'M' | 'L' | 'C' | 'Z';
	x?: number;
	y?: number;
	x1?: number;
	y1?: number;
	x2?: number;
	y2?: number;
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
	pathCode: string;
}

export interface TransformConfig {
	scaleX: number;
	scaleY: number;
	rotation: number;
	originX: number;
	originY: number;
}
