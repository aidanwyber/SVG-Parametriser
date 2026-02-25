import { describe, expect, it } from 'vitest';
import { parsePathData } from '../src/parser';

describe('parsePathData', () => {
	it('treats additional moveto coordinate pairs as implicit lineto commands', () => {
		// SVG 2 paths: moveto with additional pairs behaves as implicit lineto.
		// https://www.w3.org/TR/SVG2/paths.html#PathDataMovetoCommands
		expect(parsePathData('M 10 10 20 20 30 10')).toEqual([
			{ type: 'M', x: 10, y: 10 },
			{ type: 'L', x: 20, y: 20 },
			{ type: 'L', x: 30, y: 10 },
		]);
	});

	it('supports relative moveto and implicit relative lineto', () => {
		expect(parsePathData('m 10 10 5 -5 10 0')).toEqual([
			{ type: 'M', x: 10, y: 10 },
			{ type: 'L', x: 15, y: 5 },
			{ type: 'L', x: 25, y: 5 },
		]);
	});

	it('expands H and V commands into L commands with current coordinates', () => {
		expect(parsePathData('M 1 2 H 5 v 3 h -2 V 0')).toEqual([
			{ type: 'M', x: 1, y: 2 },
			{ type: 'L', x: 5, y: 2 },
			{ type: 'L', x: 5, y: 5 },
			{ type: 'L', x: 3, y: 5 },
			{ type: 'L', x: 3, y: 0 },
		]);
	});

	it('parses repeated cubic bezier segments in one C command', () => {
		expect(
			parsePathData('M0 0 C10 0 10 10 20 10 30 10 30 0 40 0'),
		).toEqual([
			{ type: 'M', x: 0, y: 0 },
			{ type: 'C', x1: 10, y1: 0, x2: 10, y2: 10, x: 20, y: 10 },
			{ type: 'C', x1: 30, y1: 10, x2: 30, y2: 0, x: 40, y: 0 },
		]);
	});

	it('converts smooth cubic S to reflected cubic C after C/S', () => {
		// SVG 2 paths: S command reflects the previous cubic control point.
		// https://www.w3.org/TR/SVG2/paths.html#PathDataCubicBezierCommands
		expect(
			parsePathData('M 0 0 C 10 0 10 10 20 10 S 30 20 40 10'),
		).toEqual([
			{ type: 'M', x: 0, y: 0 },
			{ type: 'C', x1: 10, y1: 0, x2: 10, y2: 10, x: 20, y: 10 },
			{ type: 'C', x1: 30, y1: 10, x2: 30, y2: 20, x: 40, y: 10 },
		]);
	});

	it('uses current point as first control point for S after non-cubic commands', () => {
		expect(parsePathData('M0 0 L10 10 S20 20 30 10')).toEqual([
			{ type: 'M', x: 0, y: 0 },
			{ type: 'L', x: 10, y: 10 },
			{ type: 'C', x1: 10, y1: 10, x2: 20, y2: 20, x: 30, y: 10 },
		]);
	});

	it('parses scientific notation and signed numeric formats', () => {
		// SVG number grammar allows exponent notation.
		// https://www.w3.org/TR/SVG2/types.html#DataTypeNumber
		expect(parsePathData('M1e1 -2e-1 L+3.5e+1 -.4')).toEqual([
			{ type: 'M', x: 10, y: -0.2 },
			{ type: 'L', x: 35, y: -0.4 },
		]);
	});

	it('resets current point to subpath start after Z for following relative commands', () => {
		expect(parsePathData('M0 0 L10 0 Z l5 5')).toEqual([
			{ type: 'M', x: 0, y: 0 },
			{ type: 'L', x: 10, y: 0 },
			{ type: 'Z' },
			{ type: 'L', x: 5, y: 5 },
		]);
	});

	it('skips unsupported commands without throwing while preserving supported ones', () => {
		expect(
			parsePathData('M0 0 Q10 10 20 0 T30 0 A5 5 0 0 1 40 0 L50 0'),
		).toEqual([
			{ type: 'M', x: 0, y: 0 },
			{ type: 'L', x: 50, y: 0 },
		]);
	});

	it('returns an empty list for empty path data', () => {
		expect(parsePathData('')).toEqual([]);
	});
});
