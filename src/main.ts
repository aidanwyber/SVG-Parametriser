import './style.css';
import type {
	VectorFormat,
	Language,
	DrawableShape,
	GeneratorOptions,
	ProcessingVector,
} from './types';
import { convertPathToP5, escapeHtml, generateDrawAllPaths } from './generator';
import { createCombinedPreview, createPreview } from './preview';
import { extractDrawableShapes } from './svgElements';

const dropZone = document.getElementById('dropZone') as HTMLElement;
const fileInput = document.getElementById('fileInput') as HTMLInputElement;
const functionPrefixInput = document.getElementById(
	'functionPrefix',
) as HTMLInputElement;
const output = document.getElementById('output') as HTMLElement;

interface ParsedFileData {
	file: File;
	fileIndex: number;
	shapes: DrawableShape[];
}

interface FileGroup {
	file: File;
	fileIndex: number;
	filePrefix: string;
	drawAllFunctionName: string;
}

interface ShapeEntry {
	fileIndex: number;
	fileName: string;
	shape: DrawableShape;
	functionName: string;
	globalId: number;
}

interface FileDrawingDownload {
	codeKey: string;
	code: string;
	drawAllFunctionName: string;
	fileName: string;
	sourceFileName: string;
}

let lastProcessedFiles: File[] = [];
let cleanupShapeNavigation: (() => void) | null = null;
let processRequestId = 0;

function getFileStem(fileName: string): string {
	const extensionIndex = fileName.lastIndexOf('.');
	if (extensionIndex <= 0) {
		return fileName;
	}
	return fileName.slice(0, extensionIndex);
}

function sanitizeFunctionIdentifier(name: string): string {
	const compact = name
		.trim()
		.replace(/[^a-zA-Z0-9_]/g, '_')
		.replace(/_+/g, '_')
		.replace(/^_+|_+$/g, '');

	if (compact.length === 0) return 'shape';
	if (/^[a-zA-Z_]/.test(compact)) return compact;
	return `_${compact}`;
}

function sanitizeIdentifierPrefix(prefix: string): string {
	return sanitizeFunctionIdentifier(prefix);
}

function makeUniquePrefixes(prefixes: string[]): string[] {
	const used = new Set<string>();
	const counts = new Map<string, number>();

	return prefixes.map(prefix => {
		if (!used.has(prefix)) {
			used.add(prefix);
			counts.set(prefix, 1);
			return prefix;
		}

		let nextIndex = (counts.get(prefix) || 1) + 1;
		let candidate = `${prefix}_${nextIndex}`;
		while (used.has(candidate)) {
			nextIndex += 1;
			candidate = `${prefix}_${nextIndex}`;
		}

		counts.set(prefix, nextIndex);
		used.add(candidate);
		return candidate;
	});
}

function getFunctionName(
	prefix: string,
	primitiveKind: string | undefined,
	shapeId: number,
): string {
	const kind = primitiveKind || 'path';
	return sanitizeFunctionIdentifier(`${prefix}_${kind}${shapeId}`);
}

function getDrawAllFunctionName(prefix: string): string {
	return sanitizeFunctionIdentifier(`${prefix}_drawAllPaths`);
}

function defaultFunctionPrefix(file: File): string {
	const stem = getFileStem(file.name).trim();
	return stem.length > 0 ? stem : 'shape';
}

function sanitizeDownloadStem(fileName: string, extension: string): string {
	const stem = getFileStem(fileName).trim();
	if (extension === 'pde') {
		const normalized = stem
			.replace(/[^a-zA-Z0-9_]/g, '_')
			.replace(/_+/g, '_')
			.replace(/^_+|_+$/g, '');
		if (normalized.length === 0) return 'drawing';
		return /^[0-9]/.test(normalized) ? `svg${normalized}` : normalized;
	}

	const normalized = stem
		.replace(/[^a-zA-Z0-9._-]/g, '-')
		.replace(/-+/g, '-')
		.replace(/^-+|-+$/g, '');
	return normalized.length > 0 ? normalized : 'drawing';
}

function createDownloadFileName(baseName: string, extension: string): string {
	if (extension === 'pde') {
		const normalized = baseName
			.replace(/[^a-zA-Z0-9_]/g, '_')
			.replace(/_+/g, '_')
			.replace(/^_+|_+$/g, '');
		const nonEmpty = normalized.length > 0 ? normalized : 'drawing';
		const safe = /^[0-9]/.test(nonEmpty) ? `svg${nonEmpty}` : nonEmpty;
		return `${safe}.pde`;
	}
	return `${baseName}.${extension}`;
}

async function copyToClipboard(text: string): Promise<boolean> {
	if (!text) return false;

	if (
		typeof navigator !== 'undefined' &&
		navigator.clipboard &&
		typeof navigator.clipboard.writeText === 'function'
	) {
		try {
			await navigator.clipboard.writeText(text);
			return true;
		} catch {
			// Fall back to execCommand path below.
		}
	}

	// Fallback for older browsers or if Clipboard API fails
	const textArea = document.createElement('textarea');
	textArea.value = text;
	textArea.setAttribute('readonly', '');
	textArea.style.position = 'fixed';
	textArea.style.top = '0';
	textArea.style.left = '-9999px';
	textArea.style.opacity = '0';
	textArea.style.pointerEvents = 'none';
	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();
	textArea.setSelectionRange(0, textArea.value.length);

	let success = false;
	try {
		success = document.execCommand('copy');
	} catch {
		success = false;
	}

	document.body.removeChild(textArea);
	return success;
}

const copyButtonResetTimers = new WeakMap<HTMLButtonElement, number>();

function getButtonBaseLabel(button: HTMLButtonElement): string {
	const existing = button.dataset.baseLabel;
	if (existing !== undefined) {
		return existing;
	}

	const baseLabel = button.textContent || '';
	button.dataset.baseLabel = baseLabel;
	return baseLabel;
}

function showTemporaryButtonLabel(
	button: HTMLButtonElement,
	label: string,
	durationMs = 2000,
): void {
	const baseLabel = getButtonBaseLabel(button);
	const pendingTimer = copyButtonResetTimers.get(button);
	if (pendingTimer !== undefined) {
		window.clearTimeout(pendingTimer);
	}

	button.textContent = label;
	const timeoutId = window.setTimeout(() => {
		button.textContent = baseLabel;
		copyButtonResetTimers.delete(button);
	}, durationMs);
	copyButtonResetTimers.set(button, timeoutId);
}

function isSvgFile(file: File): boolean {
	return (
		file.type === 'image/svg+xml' ||
		file.name.toLowerCase().endsWith('.svg')
	);
}

function getSvgFiles(fileList: FileList | File[]): File[] {
	return Array.from(fileList).filter(isSvgFile);
}

// Click to browse
dropZone.addEventListener('click', () => fileInput.click());

// Show/hide Processing vector option and instance mode based on format selection
document.querySelectorAll('input[name="vectorFormat"]').forEach(radio => {
	radio.addEventListener('change', e => {
		const target = e.target as HTMLInputElement;
		const processingOption = document.getElementById(
			'processingVectorOption',
		);
		const instanceModeOption =
			document.getElementById('instanceModeOption');
		if (processingOption) {
			processingOption.style.display =
				target.value === 'Processing' ? 'flex' : 'none';
		}
		if (instanceModeOption) {
			// Hide instance mode only for Processing (Java), show for all JS/TS modes
			instanceModeOption.style.display =
				target.value === 'Processing' ? 'none' : 'flex';
		}
		if (lastProcessedFiles.length > 0) {
			void processSVGFiles(lastProcessedFiles);
		}
	});
});

// Re-process when any option changes
document
	.querySelectorAll(
		'input[name="language"], input[name="processingVector"], input[name="sortMode"], #instanceMode, #showCoordinates',
	)
	.forEach(input => {
		input.addEventListener('change', () => {
			if (lastProcessedFiles.length > 0) {
				void processSVGFiles(lastProcessedFiles);
			}
		});
	});

document.querySelectorAll('#coordMultiplier, #precision').forEach(input => {
	input.addEventListener('change', () => {
		if (lastProcessedFiles.length > 0) {
			void processSVGFiles(lastProcessedFiles);
		}
	});
});

if (functionPrefixInput) {
	functionPrefixInput.addEventListener('input', () => {
		if (lastProcessedFiles.length > 0) {
			void processSVGFiles(lastProcessedFiles);
		}
	});
}

// Drag and drop handlers
dropZone.addEventListener('dragover', e => {
	e.preventDefault();
	dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
	dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', e => {
	e.preventDefault();
	dropZone.classList.remove('dragover');

	const droppedFiles = e.dataTransfer?.files;
	if (!droppedFiles) {
		alert('Please drop at least one SVG file');
		return;
	}

	const svgFiles = getSvgFiles(droppedFiles);
	if (svgFiles.length === 0) {
		alert('Please drop at least one valid SVG file');
		return;
	}

	void processSVGFiles(svgFiles);
});

// File input handler
fileInput.addEventListener('change', e => {
	const files = (e.target as HTMLInputElement).files;
	if (!files) return;

	const svgFiles = getSvgFiles(files);
	if (svgFiles.length === 0) return;

	void processSVGFiles(svgFiles);
});

/**
 * Process uploaded SVG files and generate p5.js code
 */
async function processSVGFiles(files: File[]): Promise<void> {
	const svgFiles = files.filter(isSvgFile);
	if (svgFiles.length === 0) {
		return;
	}

	const isMultiFile = svgFiles.length > 1;
	const isSameSingleFile =
		lastProcessedFiles.length === 1 &&
		svgFiles.length === 1 &&
		lastProcessedFiles[0] === svgFiles[0];

	if (functionPrefixInput) {
		functionPrefixInput.disabled = isMultiFile;
		if (isMultiFile) {
			functionPrefixInput.value = 'Auto per file';
			functionPrefixInput.title =
				'Disabled for multi-file imports. Filename prefixes are used automatically.';
		} else {
			functionPrefixInput.title = '';
			if (!isSameSingleFile) {
				functionPrefixInput.value = defaultFunctionPrefix(svgFiles[0]);
			}
		}
	}

	lastProcessedFiles = [...svgFiles];
	const requestId = ++processRequestId;

	let parsedFiles: ParsedFileData[] = [];
	try {
		parsedFiles = await Promise.all(
			svgFiles.map(async (file, fileIndex) => {
				const svgContent = await file.text();
				const parser = new DOMParser();
				const svgDoc = parser.parseFromString(
					svgContent,
					'image/svg+xml',
				);
				return {
					file,
					fileIndex,
					shapes: extractDrawableShapes(svgDoc),
				};
			}),
		);
	} catch {
		if (requestId !== processRequestId) return;
		output.innerHTML =
			'<div class="output"><p>Could not read one or more SVG files.</p></div>';
		return;
	}

	if (requestId !== processRequestId) return;

	if (cleanupShapeNavigation) {
		cleanupShapeNavigation();
		cleanupShapeNavigation = null;
	}

	const parsedWithShapes = parsedFiles.filter(
		fileData => fileData.shapes.length > 0,
	);
	if (parsedWithShapes.length === 0) {
		output.innerHTML =
			'<div class="output"><p>No supported drawable elements found (path, line, polyline, polygon, rect, circle, ellipse).</p></div>';
		return;
	}

	// Get all options
	const vectorFormat =
		((
			document.querySelector(
				'input[name="vectorFormat"]:checked',
			) as HTMLInputElement
		)?.value as VectorFormat) || 'Vec';

	const language =
		((
			document.querySelector(
				'input[name="language"]:checked',
			) as HTMLInputElement
		)?.value as Language) || 'javascript';

	const coordMultiplier =
		parseFloat(
			(document.getElementById('coordMultiplier') as HTMLInputElement)
				?.value,
		) || 1;

	const precision =
		parseInt(
			(document.getElementById('precision') as HTMLInputElement)?.value,
		) || 5;

	const processingVector =
		((
			document.querySelector(
				'input[name="processingVector"]:checked',
			) as HTMLInputElement
		)?.value as ProcessingVector) || 'PVector';

	const instanceMode =
		(document.getElementById('instanceMode') as HTMLInputElement)
			?.checked || false;
	const showCoordinates =
		(document.getElementById('showCoordinates') as HTMLInputElement)
			?.checked ?? true;

	const sortMode =
		((
			document.querySelector(
				'input[name="sortMode"]:checked',
			) as HTMLInputElement
		)?.value as 'primitive' | 'svg') || 'primitive';

	const options: GeneratorOptions = {
		vectorFormat,
		language,
		coordMultiplier,
		precision,
		processingVector,
		instanceMode,
	};

	const singlePrefix = sanitizeIdentifierPrefix(
		functionPrefixInput?.value ||
			defaultFunctionPrefix(parsedWithShapes[0].file),
	);
	const filePrefixes =
		isMultiFile ?
			makeUniquePrefixes(
				parsedWithShapes.map(fileData =>
					sanitizeIdentifierPrefix(
						defaultFunctionPrefix(fileData.file),
					),
				),
			)
		:	[singlePrefix];

	const fileGroups: FileGroup[] = parsedWithShapes.map((fileData, index) => {
		const filePrefix = isMultiFile ? filePrefixes[index] : singlePrefix;
		return {
			file: fileData.file,
			fileIndex: fileData.fileIndex,
			filePrefix,
			drawAllFunctionName: getDrawAllFunctionName(filePrefix),
		};
	});

	const allShapeEntries: ShapeEntry[] = [];
	let nextGlobalId = 1;
	parsedWithShapes.forEach((fileData, groupIndex) => {
		const group = fileGroups[groupIndex];
		fileData.shapes.forEach((shape, shapeIndex) => {
			allShapeEntries.push({
				fileIndex: fileData.fileIndex,
				fileName: fileData.file.name,
				shape,
				functionName: getFunctionName(
					group.filePrefix,
					shape.primitive?.kind,
					shapeIndex + 1,
				),
				globalId: nextGlobalId++,
			});
		});
	});

	const sortedEntries = [...allShapeEntries].sort((a, b) => {
		if (sortMode === 'svg') {
			if (a.fileIndex !== b.fileIndex) {
				return a.fileIndex - b.fileIndex;
			}
			return a.shape.sourceIndex - b.shape.sourceIndex;
		}

		const typeA = a.shape.primitive?.kind ?? 'path';
		const typeB = b.shape.primitive?.kind ?? 'path';
		if (typeA === typeB) {
			if (a.fileIndex !== b.fileIndex) {
				return a.fileIndex - b.fileIndex;
			}
			return a.shape.sourceIndex - b.shape.sourceIndex;
		}
		return typeA.localeCompare(typeB);
	});

	const orderedFunctionNames = sortedEntries.map(entry => entry.functionName);
	const orderedFunctionNamesByFile = new Map<number, string[]>();
	sortedEntries.forEach(entry => {
		const namesForFile =
			orderedFunctionNamesByFile.get(entry.fileIndex) || [];
		namesForFile.push(entry.functionName);
		orderedFunctionNamesByFile.set(entry.fileIndex, namesForFile);
	});

	let sharedCode = '';
	let html = '';
	const pathsData: string[] = [];
	const shapeIds: number[] = [];
	const previewShapes: DrawableShape[] = [];
	const previewDataByFile = new Map<
		number,
		{
			previewId: string;
			fileName: string;
			pathsData: string[];
			shapeIds: number[];
			shapes: DrawableShape[];
		}
	>();
	const shapeBlocksOrdered: string[] = [];
	const shapeBlockByFunctionName = new Map<string, string>();
	const navigationFunctionNames: string[] = [];

	sortedEntries.forEach((entry, index) => {
		pathsData.push(entry.shape.pathData);
		shapeIds.push(entry.globalId);
		previewShapes.push(entry.shape);
		navigationFunctionNames.push(entry.functionName);
		let previewData = previewDataByFile.get(entry.fileIndex);
		if (!previewData) {
			previewData = {
				previewId: `preview-all-file-${entry.fileIndex}`,
				fileName: entry.fileName,
				pathsData: [],
				shapeIds: [],
				shapes: [],
			};
			previewDataByFile.set(entry.fileIndex, previewData);
		}
		previewData.pathsData.push(entry.shape.pathData);
		previewData.shapeIds.push(entry.globalId);
		previewData.shapes.push(entry.shape);

		const generated = convertPathToP5(
			entry.shape.pathData,
			options,
			index,
			entry.shape,
			entry.functionName,
		);

		// Use shared code from first shape
		if (index === 0) {
			sharedCode = generated.sharedCode;
		}

		const shapeBlock = [generated.globalCode, generated.pathCode]
			.filter(section => section.trim().length > 0)
			.join('\n\n');

		// Collect shape code
		shapeBlocksOrdered.push(shapeBlock);
		shapeBlockByFunctionName.set(entry.functionName, shapeBlock);

		const previewId = `preview-${index}`;
		html += `
          <div class="output path-section" id="shape-section-${index}">
            <div class="path-header">
              <h2>${escapeHtml(entry.functionName)}</h2>
              <button class="copy-btn" data-path="${index}">Copy Code</button>
            </div>
            <p class="path-meta">${escapeHtml(entry.fileName)} · svg #${entry.shape.sourceIndex}</p>
            <div class="content-grid">
              <div class="preview-container">
                <div id="${previewId}"></div>
              </div>
              <div class="code-container">
                <pre><code>${escapeHtml(shapeBlock)}</code></pre>
              </div>
            </div>
          </div>
        `;
	});

	const sharedTransformCode = sharedCode.trim();
	const shapeFunctionsCode = shapeBlocksOrdered.join('\n\n').trim();

	const perFileDrawAllCodes: string[] = [];
	let topLevelDrawAllCode = '';

	if (isMultiFile) {
		const perFileDrawAllNames: string[] = [];
		fileGroups.forEach(group => {
			const fileFunctionNames =
				orderedFunctionNamesByFile.get(group.fileIndex) || [];
			if (fileFunctionNames.length === 0) return;
			perFileDrawAllNames.push(group.drawAllFunctionName);
			perFileDrawAllCodes.push(
				generateDrawAllPaths(
					fileFunctionNames,
					options,
					group.drawAllFunctionName,
				).trim(),
			);
		});

		topLevelDrawAllCode = generateDrawAllPaths(
			perFileDrawAllNames,
			options,
		).trim();
	} else {
		topLevelDrawAllCode = generateDrawAllPaths(
			orderedFunctionNames,
			options,
			fileGroups[0].drawAllFunctionName,
		).trim();
	}

	const drawingCode = [
		topLevelDrawAllCode,
		...perFileDrawAllCodes,
		shapeFunctionsCode,
	]
		.filter(section => section.length > 0)
		.join('\n\n');
	const fullCode = [sharedTransformCode, drawingCode]
		.filter(section => section.length > 0)
		.join('\n\n');

	const fileExtension =
		vectorFormat === 'Processing' ? 'pde'
		: language === 'typescript' ? 'ts'
		: 'js';
	const completeFileName = createDownloadFileName(
		'svg_complete',
		fileExtension,
	);
	const drawingFileName = createDownloadFileName('svg_paths', fileExtension);
	const sharedFileName = createDownloadFileName('svg_shared', fileExtension);

	const perFileDrawingDownloads: FileDrawingDownload[] = [];
	if (isMultiFile) {
		fileGroups.forEach(group => {
			const fileFunctionNames =
				orderedFunctionNamesByFile.get(group.fileIndex) || [];
			if (fileFunctionNames.length === 0) return;

			const fileDrawAllCode = generateDrawAllPaths(
				fileFunctionNames,
				options,
				group.drawAllFunctionName,
			).trim();
			const filePathCode = fileFunctionNames
				.map(
					functionName =>
						shapeBlockByFunctionName.get(functionName) || '',
				)
				.filter(section => section.length > 0)
				.join('\n\n')
				.trim();
			const fileDrawingCode = [fileDrawAllCode, filePathCode]
				.filter(section => section.length > 0)
				.join('\n\n');

			perFileDrawingDownloads.push({
				codeKey: `drawing-file-${group.filePrefix}`,
				code: fileDrawingCode,
				drawAllFunctionName: group.drawAllFunctionName,
				fileName: createDownloadFileName(
					`svg_${sanitizeDownloadStem(group.file.name, fileExtension)}`,
					fileExtension,
				),
				sourceFileName: group.file.name,
			});
		});
	}

	const codeByKey: Record<string, string> = {
		complete: fullCode,
		drawing: drawingCode,
		shared: sharedTransformCode,
	};
	perFileDrawingDownloads.forEach(entry => {
		codeByKey[entry.codeKey] = entry.code;
	});

	const exportBlock = `
      <div class="command-section">
        <div class="command-header">
          <h2>Complete File</h2>
          <div class="action-buttons">
            <button class="copy-btn" data-code-key="complete">Copy Complete Code</button>
            <button class="download-btn" data-code-key="complete" data-filename="${completeFileName}">Download ${completeFileName}</button>
          </div>
        </div>
        <div class="command-content">
          <p style="margin: 0; padding: 15px; color: #9cdcfe;">Includes shared transform code and all generated drawing functions.</p>
        </div>
      </div>
    `;

	const drawingCodeBlock = `
      <div class="shared-code-section drawing-code-section">
        <div class="shared-code-header">
          <h2>Drawing Code</h2>
          <div class="action-buttons">
            <button class="copy-btn" data-code-key="drawing">Copy Drawing Code</button>
            <button class="download-btn" data-code-key="drawing" data-filename="${drawingFileName}">Download ${drawingFileName}</button>
          </div>
        </div>
        <div class="shared-code-content">
          <pre><code>${escapeHtml(drawingCode)}</code></pre>
        </div>
      </div>
    `;

	const perFileDrawingDownloadsBlock =
		perFileDrawingDownloads.length > 0 ?
			`
	      <div class="command-section">
	        <div class="command-header">
	          <h2>Per-file Drawing Downloads</h2>
        </div>
        <div class="command-content">
          <div class="command-content-inner">
            <div class="per-file-actions">
	              ${perFileDrawingDownloads
						.map(
							entry => `
	                <div class="per-file-action-row">
	                  <div class="per-file-action-label">${escapeHtml(entry.sourceFileName)}</div>
	                  <div class="action-buttons action-buttons-start">
	                    <button class="copy-btn" data-code-key="${entry.codeKey}">Copy ${escapeHtml(entry.fileName)}</button>
	                    <button class="download-btn" data-code-key="${entry.codeKey}" data-filename="${entry.fileName}">Download ${escapeHtml(entry.fileName)}</button>
	                  </div>
	                </div>
	              `,
						)
						.join('')}
            </div>
          </div>
        </div>
      </div>
    `
		:	'';

	const sharedCodeBlock = `
      <div class="shared-code-section">
        <div class="shared-code-header">
          <h2>Shared Code</h2>
          <div class="action-buttons">
            <button class="copy-btn" data-code-key="shared">Copy Shared Code</button>
            <button class="download-btn" data-code-key="shared" data-filename="${sharedFileName}">Download ${sharedFileName}</button>
          </div>
        </div>
        <div class="shared-code-content">
          <pre><code>${escapeHtml(sharedTransformCode)}</code></pre>
        </div>
      </div>
    `;

	const combinedPreviewBlock =
		isMultiFile ?
			`
      <div class="combined-preview-section output">
        <div class="combined-preview-header">
          <h2>All paths by file</h2>
        </div>
        <div class="combined-preview-grid">
          ${fileGroups
				.map(group => {
					const previewData = previewDataByFile.get(group.fileIndex);
					if (!previewData || previewData.pathsData.length === 0) {
						return '';
					}

					return `
            <div class="combined-preview-file">
              <h3>${escapeHtml(previewData.fileName)}</h3>
              <div class="preview-container">
                <div id="${previewData.previewId}"></div>
              </div>
            </div>
          `;
				})
				.join('')}
        </div>
      </div>
    `
		:	`
      <div class="combined-preview-section output">
        <div class="combined-preview-header">
          <h2>All paths</h2>
        </div>
        <div class="preview-container">
          <div id="preview-all"></div>
        </div>
      </div>
    `;

	const navigationBlock = `
      <div class="shape-nav">
        <h3>Shapes</h3>
        <ul class="shape-nav-list">
          ${navigationFunctionNames
				.map(
					(functionName, index) => `
            <li>
              <button class="shape-nav-link" data-target="shape-section-${index}">${escapeHtml(functionName)}</button>
            </li>
          `,
				)
				.join('')}
        </ul>
      </div>
    `;

	output.innerHTML =
		navigationBlock +
		exportBlock +
		drawingCodeBlock +
		perFileDrawingDownloadsBlock +
		sharedCodeBlock +
		combinedPreviewBlock +
		html;

	// Create previews after DOM is updated
	if (isMultiFile) {
		fileGroups.forEach(group => {
			const previewData = previewDataByFile.get(group.fileIndex);
			if (!previewData || previewData.pathsData.length === 0) {
				return;
			}

			createCombinedPreview(
				previewData.pathsData,
				previewData.shapeIds,
				previewData.previewId,
				previewData.shapes,
			);
		});
	} else {
		createCombinedPreview(
			pathsData,
			shapeIds,
			'preview-all',
			previewShapes,
		);
	}

	pathsData.forEach((pathData, index) => {
		createPreview(
			pathData,
			`preview-${index}`,
			previewShapes[index],
			showCoordinates,
		);
	});

	cleanupShapeNavigation = setupShapeNavigation();

	const downloadBtns = output.querySelectorAll(
		'.download-btn[data-code-key]',
	) as NodeListOf<HTMLButtonElement>;
	downloadBtns.forEach(downloadBtn => {
		downloadBtn.addEventListener('click', () => {
			const codeKey = downloadBtn.dataset.codeKey;
			const fileName = downloadBtn.dataset.filename;
			if (!codeKey || !fileName) return;

			const code = codeByKey[codeKey];
			if (!code) return;

			const blob = new Blob([code], { type: 'text/plain' });
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = fileName;
			a.click();
			URL.revokeObjectURL(url);

			const originalText = downloadBtn.textContent;
			downloadBtn.textContent = 'Downloaded!';
			setTimeout(() => {
				downloadBtn.textContent = originalText;
			}, 2000);
		});
	});

	// Add click handlers to copy buttons
	const copyBtns = output.querySelectorAll('.copy-btn');
	copyBtns.forEach(btn => {
		btn.addEventListener('click', async e => {
			const target = e.currentTarget as HTMLButtonElement;
			if (target.dataset.copying === '1') return;
			const codeKey = target.dataset.codeKey;

			let code = '';
			if (codeKey) {
				code = codeByKey[codeKey] || '';
			} else {
				const pathSection = target.closest('.path-section');
				code = pathSection?.querySelector('code')?.textContent || '';
			}
			if (!code) {
				showTemporaryButtonLabel(target, 'No code');
				return;
			}

			target.dataset.copying = '1';
			let copied = false;
			try {
				copied = await copyToClipboard(code);
			} finally {
				target.dataset.copying = '0';
			}
			showTemporaryButtonLabel(
				target,
				copied ? 'Copied!' : 'Copy failed',
			);
		});
	});
}

function setupShapeNavigation(): () => void {
	const navLinks = Array.from(
		output.querySelectorAll('.shape-nav-link'),
	) as HTMLButtonElement[];

	if (navLinks.length === 0) {
		return () => {};
	}

	const sections = navLinks
		.map(link => {
			const targetId = link.dataset.target;
			return targetId ? document.getElementById(targetId) : null;
		})
		.filter((section): section is HTMLElement => section !== null);

	if (sections.length === 0) {
		return () => {};
	}

	const setActiveLink = (activeSection: HTMLElement) => {
		navLinks.forEach(link => {
			link.classList.toggle(
				'is-active',
				link.dataset.target === activeSection.id,
			);
		});
	};

	const updateActiveFromViewportCenter = () => {
		const viewportCenterY = window.innerHeight / 2;
		let closestSection = sections[0];
		let closestDistance = Number.POSITIVE_INFINITY;

		sections.forEach(section => {
			const rect = section.getBoundingClientRect();
			const centerY = rect.top + rect.height / 2;
			const distance = Math.abs(centerY - viewportCenterY);

			if (distance < closestDistance) {
				closestDistance = distance;
				closestSection = section;
			}
		});

		setActiveLink(closestSection);
	};

	const onLinkClick = (e: Event) => {
		const link = e.currentTarget as HTMLButtonElement;
		const targetId = link.dataset.target;
		if (!targetId) return;
		const target = document.getElementById(targetId);
		if (!target) return;

		target.scrollIntoView({ behavior: 'smooth', block: 'center' });
	};

	navLinks.forEach(link => {
		link.addEventListener('click', onLinkClick);
	});

	let ticking = false;
	const onViewportChange = () => {
		if (ticking) return;
		ticking = true;
		window.requestAnimationFrame(() => {
			ticking = false;
			updateActiveFromViewportCenter();
		});
	};

	window.addEventListener('scroll', onViewportChange, { passive: true });
	window.addEventListener('resize', onViewportChange);
	updateActiveFromViewportCenter();

	return () => {
		navLinks.forEach(link => {
			link.removeEventListener('click', onLinkClick);
		});
		window.removeEventListener('scroll', onViewportChange);
		window.removeEventListener('resize', onViewportChange);
	};
}
