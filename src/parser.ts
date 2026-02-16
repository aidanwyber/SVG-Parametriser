import type { PathCommand } from './types';

/**
 * Parse SVG path data (d attribute) into structured commands
 * Handles: M, L, H, V, C, S, Z (both absolute and relative)
 */
export function parsePathData(pathData: string): PathCommand[] {
	const commands: PathCommand[] = [];
	const commandRegex =
		/([MLHVCSQTAZmlhvcsqtaz])\s*([^MLHVCSQTAZmlhvcsqtaz]*)/g;
	let match;
	let currentX = 0;
	let currentY = 0;
	let subpathStartX = 0;
	let subpathStartY = 0;
	let lastCommandType = '';
	let lastCubicControlX: number | null = null;
	let lastCubicControlY: number | null = null;

	const clearCubicState = () => {
		lastCubicControlX = null;
		lastCubicControlY = null;
	};

	const parseNumbers = (segment: string): number[] => {
		// Supports integers, decimals, signs, and exponents (e.g. 1e-3)
		const numberRegex = /[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/g;
		return (segment.match(numberRegex) || []).map(Number);
	};

	while ((match = commandRegex.exec(pathData)) !== null) {
		const cmd = match[1];
		const isRelative = cmd === cmd.toLowerCase();
		const type = cmd.toUpperCase();
		const coords = parseNumbers(match[2]);

		if (type === 'M') {
			// First pair is move, subsequent pairs are implicit line commands.
			for (let i = 0; i + 1 < coords.length; i += 2) {
				const x = isRelative ? currentX + coords[i] : coords[i];
				const y = isRelative ? currentY + coords[i + 1] : coords[i + 1];

				if (i === 0) {
					commands.push({ type: 'M', x, y });
					subpathStartX = x;
					subpathStartY = y;
				} else {
					commands.push({ type: 'L', x, y });
				}

				currentX = x;
				currentY = y;
			}
			clearCubicState();
			lastCommandType = coords.length > 2 ? 'L' : 'M';
		} else if (type === 'L') {
			for (let i = 0; i + 1 < coords.length; i += 2) {
				const x = isRelative ? currentX + coords[i] : coords[i];
				const y = isRelative ? currentY + coords[i + 1] : coords[i + 1];
				commands.push({ type: 'L', x, y });
				currentX = x;
				currentY = y;
			}
			clearCubicState();
			lastCommandType = 'L';
		} else if (type === 'H') {
			for (let i = 0; i < coords.length; i++) {
				const x = isRelative ? currentX + coords[i] : coords[i];
				commands.push({ type: 'L', x, y: currentY });
				currentX = x;
			}
			clearCubicState();
			lastCommandType = 'L';
		} else if (type === 'V') {
			for (let i = 0; i < coords.length; i++) {
				const y = isRelative ? currentY + coords[i] : coords[i];
				commands.push({ type: 'L', x: currentX, y });
				currentY = y;
			}
			clearCubicState();
			lastCommandType = 'L';
		} else if (type === 'C') {
			for (let i = 0; i + 5 < coords.length; i += 6) {
				const x1 = isRelative ? currentX + coords[i] : coords[i];
				const y1 =
					isRelative ? currentY + coords[i + 1] : coords[i + 1];
				const x2 =
					isRelative ? currentX + coords[i + 2] : coords[i + 2];
				const y2 =
					isRelative ? currentY + coords[i + 3] : coords[i + 3];
				const x = isRelative ? currentX + coords[i + 4] : coords[i + 4];
				const y = isRelative ? currentY + coords[i + 5] : coords[i + 5];

				commands.push({ type: 'C', x1, y1, x2, y2, x, y });
				currentX = x;
				currentY = y;
				lastCubicControlX = x2;
				lastCubicControlY = y2;
				lastCommandType = 'C';
			}
		} else if (type === 'S') {
			for (let i = 0; i + 3 < coords.length; i += 4) {
				let x1 = currentX;
				let y1 = currentY;

				if (
					(lastCommandType === 'C' || lastCommandType === 'S') &&
					lastCubicControlX !== null &&
					lastCubicControlY !== null
				) {
					x1 = currentX * 2 - lastCubicControlX;
					y1 = currentY * 2 - lastCubicControlY;
				}

				const x2 = isRelative ? currentX + coords[i] : coords[i];
				const y2 =
					isRelative ? currentY + coords[i + 1] : coords[i + 1];
				const x = isRelative ? currentX + coords[i + 2] : coords[i + 2];
				const y = isRelative ? currentY + coords[i + 3] : coords[i + 3];

				commands.push({ type: 'C', x1, y1, x2, y2, x, y });
				currentX = x;
				currentY = y;
				lastCubicControlX = x2;
				lastCubicControlY = y2;
				lastCommandType = 'S';
			}
		} else if (type === 'Z') {
			commands.push({ type: 'Z' });
			currentX = subpathStartX;
			currentY = subpathStartY;
			clearCubicState();
			lastCommandType = 'Z';
		} else {
			// Unsupported commands are currently skipped by codegen; reset cubic reflection state.
			clearCubicState();
			lastCommandType = type;
		}
	}

	return commands;
}
