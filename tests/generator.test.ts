import { describe, expect, it } from 'vitest';
import { convertPathToP5, generateSharedCode } from '../src/generator';
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

		expect(generated.globalCode).toContain('let drawPath1_A, drawPath1_B;');
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

	it('uses capital letter point names for polygon primitives', () => {
		const options: GeneratorOptions = {
			vectorFormat: 'createVector',
			language: 'javascript',
			coordMultiplier: 1,
			precision: 0,
			instanceMode: true,
		};

		const generated = convertPathToP5(
			'M0 0 L10 0 L10 10 Z',
			options,
			0,
			{
				pathData: 'M0 0 L10 0 L10 10 Z',
				sourceIndex: 1,
				primitive: {
					kind: 'polygon',
					points: [
						[0, 0],
						[10, 0],
						[10, 10],
					],
				},
			},
			'drawPoly',
		);

		expect(generated.globalCode).toContain(
			'let drawPoly_A, drawPoly_B, drawPoly_C;',
		);
		expect(generated.pathCode).toContain(
			'drawPoly_A = applyTransform(p, p.createVector(0, 0));',
		);
		expect(generated.pathCode).toContain(
			'drawPoly_B = applyTransform(p, p.createVector(10, 0));',
		);
		expect(generated.pathCode).toContain(
			'drawPoly_C = applyTransform(p, p.createVector(10, 10));',
		);
		expect(generated.pathCode).toContain(
			'drawPolyPoints = [drawPoly_A, drawPoly_B, drawPoly_C];',
		);
		expect(generated.pathCode).toContain(
			'p.vertex(drawPoly_A.x, drawPoly_A.y);',
		);
		expect(generated.pathCode).toContain(
			'p.vertex(drawPoly_B.x, drawPoly_B.y);',
		);
		expect(generated.pathCode).toContain(
			'p.vertex(drawPoly_C.x, drawPoly_C.y);',
		);
	});

	it('includes source bounds globals and commented centering lines in shared code', () => {
		const options: GeneratorOptions = {
			vectorFormat: 'createVector',
			language: 'javascript',
			coordMultiplier: 1,
			precision: 0,
			instanceMode: true,
		};

		const sharedCode = generateSharedCode(options, {
			minX: 10,
			minY: 20,
			maxX: 110,
			maxY: 220,
			width: 100,
			height: 200,
			centerX: 60,
			centerY: 120,
		});

		expect(sharedCode).toContain('const fileMinX = 10,');
		expect(sharedCode).toContain('fileMinY = 20,');
		expect(sharedCode).toContain('fileCenterX = 60,');
		expect(sharedCode).toContain('fileCenterY = 120;');
		expect(sharedCode).toContain(
			'// Uncomment to center around the source file bounds.',
		);
		expect(sharedCode).toContain('// x -= fileCenterX;');
		expect(sharedCode).toContain('// y -= fileCenterY;');
	});
});
