/**
 * Convert index to Excel-style column name (base-26)
 * 0 -> A, 1 -> B, ..., 25 -> Z, 26 -> AA, 27 -> AB, etc.
 */
export function getPointName(index: number): string {
	let name = '';
	let num = index;

	while (num >= 0) {
		name = String.fromCharCode(65 + (num % 26)) + name;
		num = Math.floor(num / 26) - 1;
	}

	return name;
}
