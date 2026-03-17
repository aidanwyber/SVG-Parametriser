import { describe, expect, it } from 'vitest';
import { convertPathToP5 } from '../src/generator';
import type { GeneratorOptions } from '../src/types';

describe('convertPathToP5', () => {
	it('hoists transformed path points into global scope and creates a per-shape array', () => {
		const options: GeneratorOptions = {
			vectorFormat: 'createVector',
			language: 'javascript',
			coordMultiplier: 1,
			precision: 0,
			instanceMode: true,
		};

		const generated = convertPathToP5(
			'M 10 20 L 30 40',
			options,
			0,
			undefined,
			'drawPath1',
		);

		expect(generated.globalCode).toContain('let drawPath1_A;');
		expect(generated.globalCode).toContain('let drawPath1_B;');
		expect(generated.globalCode).toContain('let drawPath1Points = [];');
		expect(generated.pathCode).toContain(
			'drawPath1_A = applyTransform(p, p.createVector(10, 20));',
		);
		expect(generated.pathCode).toContain(
			'drawPath1_B = applyTransform(p, p.createVector(30, 40));',
		);
		expect(generated.pathCode).toContain(
			'drawPath1Points = [drawPath1_A, drawPath1_B];',
		);
		expect(generated.pathCode).toContain(
			'p.vertex(drawPath1_A.x, drawPath1_A.y);',
		);
		expect(generated.pathCode).toContain(
			'p.vertex(drawPath1_B.x, drawPath1_B.y);',
		);
	});
});
