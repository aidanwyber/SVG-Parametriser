import { describe, expect, it } from 'vitest';
import { extractDrawableShapes } from '../src/svgElements';

function parseSvg(svg: string): Document {
	return new DOMParser().parseFromString(svg, 'image/svg+xml');
}

describe('extractDrawableShapes', () => {
	it('extracts supported elements in document order with expected primitive metadata', () => {
		const svg = parseSvg(`
      <svg xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0 L1 1"/>
        <line x1="1" y1="2" x2="3" y2="4"/>
        <polyline points="0,0 10,0 10,10"/>
        <polygon points="1 1 2 1 2 2"/>
        <rect x="5" y="6" width="10" height="10" rx="8"/>
        <circle cx="7" cy="8" r="3"/>
        <ellipse cx="9" cy="10" rx="4" ry="2"/>
      </svg>
    `);

		const shapes = extractDrawableShapes(svg);
		expect(shapes).toHaveLength(7);
		expect(shapes.map(shape => shape.sourceIndex)).toEqual([
			1, 2, 3, 4, 5, 6, 7,
		]);

		expect(shapes[0].primitive).toBeUndefined();
		expect(shapes[1].primitive?.kind).toBe('line');
		expect(shapes[2].primitive?.kind).toBe('polyline');
		expect(shapes[3].primitive?.kind).toBe('polygon');
		expect(shapes[4].primitive?.kind).toBe('rect');
		expect(shapes[5].primitive?.kind).toBe('circle');
		expect(shapes[6].primitive?.kind).toBe('ellipse');

		// rx is clamped to width/2, ry follows rx when missing and is clamped independently.
		// https://www.w3.org/TR/SVG2/shapes.html#RectElementRXAttribute
		expect(shapes[4].primitive?.rx).toBe(5);
		expect(shapes[4].primitive?.ry).toBe(5);
	});

	it('filters invalid drawable shapes while preserving source indices for valid ones', () => {
		const svg = parseSvg(`
      <svg xmlns="http://www.w3.org/2000/svg">
        <polyline points="1,1"/>
        <rect width="0" height="10"/>
        <circle cx="1" cy="1" r="0"/>
        <ellipse cx="1" cy="1" rx="2" ry="0"/>
        <path d="M0 0 L2 2"/>
      </svg>
    `);

		const shapes = extractDrawableShapes(svg);
		expect(shapes).toHaveLength(1);
		expect(shapes[0].pathData).toBe('M0 0 L2 2');
		expect(shapes[0].sourceIndex).toBe(5);
	});

	it('applies ry-only rect rule (rx follows ry) then clamps independently', () => {
		const svg = parseSvg(`
      <svg xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="20" height="10" ry="9"/>
      </svg>
    `);

		const shapes = extractDrawableShapes(svg);
		expect(shapes).toHaveLength(1);
		expect(shapes[0].primitive?.kind).toBe('rect');
		expect(shapes[0].primitive?.rx).toBe(9);
		expect(shapes[0].primitive?.ry).toBe(5);
	});

	it('converts polygon to a closed path and polyline to an open path', () => {
		const svg = parseSvg(`
      <svg xmlns="http://www.w3.org/2000/svg">
        <polyline points="0,0 1,0 1,1"/>
        <polygon points="0,0 2,0 2,2 0,2"/>
      </svg>
    `);

		const shapes = extractDrawableShapes(svg);
		expect(shapes).toHaveLength(2);
		expect(shapes[0].pathData.trim().endsWith('Z')).toBe(false);
		expect(shapes[1].pathData.trim().endsWith('Z')).toBe(true);
	});
});
