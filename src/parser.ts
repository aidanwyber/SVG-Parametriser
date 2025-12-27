import type { PathCommand } from './types';

/**
 * Parse SVG path data (d attribute) into structured commands
 * Handles: M, L, H, V, C, Z (both absolute and relative)
 */
export function parsePathData(pathData: string): PathCommand[] {
	const commands: PathCommand[] = [];
	const commandRegex =
		/([MLHVCSQTAZmlhvcsqtaz])\s*([^MLHVCSQTAZmlhvcsqtaz]*)/g;
	let match;
	let currentX = 0;
	let currentY = 0;

	while ((match = commandRegex.exec(pathData)) !== null) {
		const cmd = match[1];
		const isRelative = cmd === cmd.toLowerCase();
		const type = cmd.toUpperCase();

		// Extract all numbers (handles concatenated numbers like "4.44-8.862" or "1.5.2")
		const numberRegex = /-?\d*\.?\d+/g;
		const coords = (match[2].match(numberRegex) || []).map(Number);

		if (type === 'M') {
			const x = isRelative ? currentX + coords[0] : coords[0];
			const y = isRelative ? currentY + coords[1] : coords[1];
			commands.push({ type: 'M', x, y });
			currentX = x;
			currentY = y;
		} else if (type === 'L') {
			const x = isRelative ? currentX + coords[0] : coords[0];
			const y = isRelative ? currentY + coords[1] : coords[1];
			commands.push({ type: 'L', x, y });
			currentX = x;
			currentY = y;
		} else if (type === 'H') {
			const x = isRelative ? currentX + coords[0] : coords[0];
			commands.push({ type: 'L', x, y: currentY });
			currentX = x;
		} else if (type === 'V') {
			const y = isRelative ? currentY + coords[0] : coords[0];
			commands.push({ type: 'L', x: currentX, y });
			currentY = y;
		} else if (type === 'C') {
			const x1 = isRelative ? currentX + coords[0] : coords[0];
			const y1 = isRelative ? currentY + coords[1] : coords[1];
			const x2 = isRelative ? currentX + coords[2] : coords[2];
			const y2 = isRelative ? currentY + coords[3] : coords[3];
			const x = isRelative ? currentX + coords[4] : coords[4];
			const y = isRelative ? currentY + coords[5] : coords[5];
			commands.push({ type: 'C', x1, y1, x2, y2, x, y });
			currentX = x;
			currentY = y;
		} else if (type === 'Z') {
			commands.push({ type: 'Z' });
		}
	}

	return commands;
}
