import type { TransformConfig } from './types';

/**
 * 2D Transformation Matrix
 * Represents affine transformations: scale, rotation, translation
 *
 * Matrix layout:
 * [ a  c  tx ]
 * [ b  d  ty ]
 * [ 0  0  1  ]
 */
export class Matrix2D {
	constructor(
		public a: number = 1,
		public b: number = 0,
		public c: number = 0,
		public d: number = 1,
		public tx: number = 0,
		public ty: number = 0
	) {}

	/**
	 * Apply transformation to a point (x, y)
	 * Returns: [x', y'] where:
	 *   x' = a*x + c*y + tx
	 *   y' = b*x + d*y + ty
	 */
	transform(x: number, y: number): [number, number] {
		return [
			this.a * x + this.c * y + this.tx,
			this.b * x + this.d * y + this.ty,
		];
	}

	/**
	 * Create a transformation matrix from scale, rotation, and translation
	 */
	static fromTransform(config: TransformConfig): Matrix2D {
		const { scaleX, scaleY, rotation, originX, originY } = config;
		const cos = Math.cos(rotation);
		const sin = Math.sin(rotation);

		return new Matrix2D(
			scaleX * cos, // a
			scaleX * sin, // b
			scaleY * -sin, // c
			scaleY * cos, // d
			originX, // tx
			originY // ty
		);
	}

	/**
	 * Format as code string for Vec class
	 */
	toVecCode(): string {
		return `new Matrix2D(${this.a}, ${this.b}, ${this.c}, ${this.d}, ${this.tx}, ${this.ty})`;
	}

	/**
	 * Format as code string for p5.js (using applyMatrix or manual transformation)
	 */
	toP5Code(): string {
		return `// Transform: scale(${this.a.toFixed(2)}, ${this.d.toFixed(
			2
		)}), rotate(${Math.atan2(this.b, this.a).toFixed(2)}), translate(${
			this.tx
		}, ${this.ty})`;
	}
}

/**
 * Helper to generate transformation function code for Vec class
 */
export function generateVecTransformCode(matrix: Matrix2D): string {
	return `// Transformation matrix: scale, rotate, translate combined
const transform = ${matrix.toVecCode()};

// Apply transformation to a Vec
function applyTransform(v) {
  const [x, y] = transform.transform(v.x, v.y);
  return new Vec(x, y);
}`;
}

/**
 * Helper to generate transformation function code for p5.js vectors
 */
export function generateP5TransformCode(
	matrix: Matrix2D,
	format: 'createVector' | 'PVector'
): string {
	const vecConstructor =
		format === 'createVector' ? 'createVector' : 'new p5.Vector';

	return `// Transformation matrix: scale, rotate, translate combined
const transform = {
  a: ${matrix.a}, b: ${matrix.b},
  c: ${matrix.c}, d: ${matrix.d},
  tx: ${matrix.tx}, ty: ${matrix.ty}
};

// Apply transformation to a vector
function applyTransform(v) {
  const x = transform.a * v.x + transform.c * v.y + transform.tx;
  const y = transform.b * v.x + transform.d * v.y + transform.ty;
  return ${vecConstructor}(x, y);
}`;
}
