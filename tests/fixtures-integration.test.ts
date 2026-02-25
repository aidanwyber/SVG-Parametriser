import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { parsePathData } from '../src/parser';
import { extractDrawableShapes } from '../src/svgElements';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fixtureRoot = resolve(__dirname, 'fixtures');
const repoRoot = resolve(__dirname, '..');

function readFixture(relativePath: string): string {
	return readFileSync(resolve(fixtureRoot, relativePath), 'utf8');
}

function parseSvg(svg: string): Document {
	return new DOMParser().parseFromString(svg, 'image/svg+xml');
}

describe('SVG fixtures integration', () => {
	it('parses a hand-typed mixed SVG fixture', () => {
		const svg = readFixture('hand_typed_mixed.svg');
		const shapes = extractDrawableShapes(parseSvg(svg));

		expect(shapes.length).toBeGreaterThanOrEqual(6);
		expect(shapes.some(shape => shape.primitive?.kind === 'rect')).toBe(
			true,
		);
		expect(shapes.some(shape => shape.primitive?.kind === 'circle')).toBe(
			true,
		);

		shapes.forEach(shape => {
			const commands = parsePathData(shape.pathData);
			expect(commands.length).toBeGreaterThan(0);
		});
	});

	it('parses real-world user SVG fixture without throwing', () => {
		const svg = readFileSync(resolve(repoRoot, '1vv2.svg'), 'utf8');
		const shapes = extractDrawableShapes(parseSvg(svg));
		expect(shapes.length).toBeGreaterThan(0);

		shapes.forEach(shape => {
			expect(() => parsePathData(shape.pathData)).not.toThrow();
		});
	});

	const downloadedFixtures = [
		{
			file: 'downloaded/illustrator_wikimedia_109keyboard.svg',
			metadataPattern: /Adobe Illustrator/i,
			minShapeCount: 50,
		},
		{
			file: 'downloaded/inkscape_wikimedia_torus_1_0.svg',
			metadataPattern: /Inkscape/i,
			minShapeCount: 1,
		},
		{
			file: 'downloaded/wikipedia_svg_logo.svg',
			metadataPattern: /SVG logo/i,
			minShapeCount: 10,
		},
	] as const;

	downloadedFixtures.forEach(
		({ file, metadataPattern, minShapeCount }) => {
			it(`parses downloaded fixture: ${file}`, () => {
				const svg = readFixture(file);
				expect(svg).toMatch(metadataPattern);

				const shapes = extractDrawableShapes(parseSvg(svg));
				expect(shapes.length).toBeGreaterThanOrEqual(minShapeCount);

				// Validate parser robustness for many real-world paths.
				shapes.slice(0, 250).forEach(shape => {
					const commands = parsePathData(shape.pathData);
					expect(commands.length).toBeGreaterThan(0);
					expect(commands[0]?.type).toBe('M');
				});
			});
		},
	);
});
