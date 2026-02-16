import type { DrawableShape } from './types';

const KAPPA = 0.5522847498307936;

function parseNumber(value: string | null, fallback = 0): number {
	if (value == null) return fallback;
	const parsed = Number.parseFloat(value);
	return Number.isFinite(parsed) ? parsed : fallback;
}

function parsePoints(points: string | null): Array<[number, number]> {
	if (!points) return [];
	const numberRegex = /[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/g;
	const values = (points.match(numberRegex) || []).map(Number);
	const coords: Array<[number, number]> = [];
	for (let i = 0; i + 1 < values.length; i += 2) {
		coords.push([values[i], values[i + 1]]);
	}
	return coords;
}

function lineToShape(element: Element): DrawableShape {
	const x1 = parseNumber(element.getAttribute('x1'), 0);
	const y1 = parseNumber(element.getAttribute('y1'), 0);
	const x2 = parseNumber(element.getAttribute('x2'), 0);
	const y2 = parseNumber(element.getAttribute('y2'), 0);

	return {
		pathData: `M ${x1} ${y1} L ${x2} ${y2}`,
		sourceIndex: 0,
		primitive: {
			kind: 'line',
			x1,
			y1,
			x2,
			y2,
		},
	};
}

function polylineToShape(element: Element, close: boolean): DrawableShape | null {
	const points = parsePoints(element.getAttribute('points'));
	if (points.length < 2) return null;

	const [firstX, firstY] = points[0];
	const segments = points
		.slice(1)
		.map(([x, y]) => `L ${x} ${y}`)
		.join(' ');

	return {
		pathData: `M ${firstX} ${firstY} ${segments}${close ? ' Z' : ''}`,
		sourceIndex: 0,
		primitive: {
			kind: close ? 'polygon' : 'polyline',
			points,
		},
	};
}

function rectPathData(
	x: number,
	y: number,
	width: number,
	height: number,
	rx: number,
	ry: number
): string {
	if (rx === 0 || ry === 0) {
		return `M ${x} ${y} L ${x + width} ${y} L ${x + width} ${
			y + height
		} L ${x} ${y + height} Z`;
	}

	const kx = rx * KAPPA;
	const ky = ry * KAPPA;
	const right = x + width;
	const bottom = y + height;

	return [
		`M ${x + rx} ${y}`,
		`L ${right - rx} ${y}`,
		`C ${right - rx + kx} ${y} ${right} ${y + ry - ky} ${right} ${y + ry}`,
		`L ${right} ${bottom - ry}`,
		`C ${right} ${bottom - ry + ky} ${right - rx + kx} ${bottom} ${
			right - rx
		} ${bottom}`,
		`L ${x + rx} ${bottom}`,
		`C ${x + rx - kx} ${bottom} ${x} ${bottom - ry + ky} ${x} ${
			bottom - ry
		}`,
		`L ${x} ${y + ry}`,
		`C ${x} ${y + ry - ky} ${x + rx - kx} ${y} ${x + rx} ${y}`,
		'Z',
	].join(' ');
}

function rectToShape(element: Element): DrawableShape | null {
	const x = parseNumber(element.getAttribute('x'), 0);
	const y = parseNumber(element.getAttribute('y'), 0);
	const width = parseNumber(element.getAttribute('width'), 0);
	const height = parseNumber(element.getAttribute('height'), 0);
	if (width <= 0 || height <= 0) return null;

	const rawRx = element.getAttribute('rx');
	const rawRy = element.getAttribute('ry');
	let rx = parseNumber(rawRx, 0);
	let ry = parseNumber(rawRy, 0);

	if (rawRx != null && rawRy == null) ry = rx;
	if (rawRy != null && rawRx == null) rx = ry;

	rx = Math.max(0, Math.min(rx, width / 2));
	ry = Math.max(0, Math.min(ry, height / 2));

	return {
		pathData: rectPathData(x, y, width, height, rx, ry),
		sourceIndex: 0,
		primitive: {
			kind: 'rect',
			x,
			y,
			width,
			height,
			rx,
			ry,
		},
	};
}

function ellipsePathData(cx: number, cy: number, rx: number, ry: number): string {
	const kx = rx * KAPPA;
	const ky = ry * KAPPA;

	return [
		`M ${cx + rx} ${cy}`,
		`C ${cx + rx} ${cy + ky} ${cx + kx} ${cy + ry} ${cx} ${cy + ry}`,
		`C ${cx - kx} ${cy + ry} ${cx - rx} ${cy + ky} ${cx - rx} ${cy}`,
		`C ${cx - rx} ${cy - ky} ${cx - kx} ${cy - ry} ${cx} ${cy - ry}`,
		`C ${cx + kx} ${cy - ry} ${cx + rx} ${cy - ky} ${cx + rx} ${cy}`,
		'Z',
	].join(' ');
}

function circleToShape(element: Element): DrawableShape | null {
	const cx = parseNumber(element.getAttribute('cx'), 0);
	const cy = parseNumber(element.getAttribute('cy'), 0);
	const r = parseNumber(element.getAttribute('r'), 0);
	if (r <= 0) return null;

	return {
		pathData: ellipsePathData(cx, cy, r, r),
		sourceIndex: 0,
		primitive: {
			kind: 'circle',
			cx,
			cy,
			r,
		},
	};
}

function ellipseToShape(element: Element): DrawableShape | null {
	const cx = parseNumber(element.getAttribute('cx'), 0);
	const cy = parseNumber(element.getAttribute('cy'), 0);
	const rx = parseNumber(element.getAttribute('rx'), 0);
	const ry = parseNumber(element.getAttribute('ry'), 0);
	if (rx <= 0 || ry <= 0) return null;

	return {
		pathData: ellipsePathData(cx, cy, rx, ry),
		sourceIndex: 0,
		primitive: {
			kind: 'ellipse',
			cx,
			cy,
			rx,
			ry,
		},
	};
}

/**
 * Extract supported drawable SVG elements in document order.
 * Path data is always included for preview/fallback rendering.
 */
export function extractDrawableShapes(svgDoc: Document): DrawableShape[] {
	const selectors = 'path,rect,circle,ellipse,line,polyline,polygon';
	const elements = Array.from(svgDoc.querySelectorAll(selectors));
	const shapes: DrawableShape[] = [];

	elements.forEach((element, index) => {
		const sourceIndex = index + 1;
		const tag = element.tagName.toLowerCase();

		if (tag === 'path') {
			const d = element.getAttribute('d');
			if (d) shapes.push({ pathData: d, sourceIndex });
			return;
		}

		let shape: DrawableShape | null = null;
		if (tag === 'line') {
			shape = lineToShape(element);
		} else if (tag === 'polyline') {
			shape = polylineToShape(element, false);
		} else if (tag === 'polygon') {
			shape = polylineToShape(element, true);
		} else if (tag === 'rect') {
			shape = rectToShape(element);
		} else if (tag === 'circle') {
			shape = circleToShape(element);
		} else if (tag === 'ellipse') {
			shape = ellipseToShape(element);
		}

		if (shape) {
			shape.sourceIndex = sourceIndex;
			shapes.push(shape);
		}
	});

	return shapes;
}
