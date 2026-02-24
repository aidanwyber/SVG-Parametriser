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

let lastProcessedFile: File | null = null;
let cleanupShapeNavigation: (() => void) | null = null;

function getFileStem(fileName: string): string {
	const extensionIndex = fileName.lastIndexOf('.');
	if (extensionIndex <= 0) {
		return fileName;
	}
	return fileName.slice(0, extensionIndex);
}

function sanitizeIdentifierPrefix(prefix: string): string {
	const collapsed = prefix
		.trim()
		.replace(/[^a-zA-Z0-9_]/g, '_')
		.replace(/_+/g, '_')
		.replace(/^_+|_+$/g, '');

	if (collapsed.length === 0) return 'shape';
	if (/^[a-zA-Z_]/.test(collapsed)) return collapsed;
	return `shape_${collapsed}`;
}

function getFunctionName(prefix: string, shapeId: number): string {
	return `${prefix}_path${shapeId}`;
}

function defaultFunctionPrefix(file: File): string {
	const stem = getFileStem(file.name).trim();
	return stem.length > 0 ? stem : 'shape';
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
		if (lastProcessedFile) {
			processSVG(lastProcessedFile);
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
			if (lastProcessedFile) {
				processSVG(lastProcessedFile);
			}
		});
	});

document.querySelectorAll('#coordMultiplier, #precision').forEach(input => {
	input.addEventListener('change', () => {
		if (lastProcessedFile) {
			processSVG(lastProcessedFile);
		}
	});
});

if (functionPrefixInput) {
	functionPrefixInput.addEventListener('input', () => {
		if (lastProcessedFile) {
			processSVG(lastProcessedFile);
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

	const file = e.dataTransfer?.files[0];
	if (file && file.type === 'image/svg+xml') {
		processSVG(file);
	} else {
		alert('Please drop a valid SVG file');
	}
});

// File input handler
fileInput.addEventListener('change', e => {
	const file = (e.target as HTMLInputElement).files?.[0];
	if (file) {
		processSVG(file);
	}
});

/**
 * Process uploaded SVG file and generate p5.js code
 */
function processSVG(file: File) {
	if (functionPrefixInput && file !== lastProcessedFile) {
		functionPrefixInput.value = defaultFunctionPrefix(file);
	}

	lastProcessedFile = file;
	const reader = new FileReader();

	reader.onload = e => {
		if (cleanupShapeNavigation) {
			cleanupShapeNavigation();
			cleanupShapeNavigation = null;
		}

		const svgContent = e.target?.result as string;
		const parser = new DOMParser();
		const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');

		const extractedShapes = extractDrawableShapes(svgDoc);

		if (extractedShapes.length === 0) {
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
				(document.getElementById('precision') as HTMLInputElement)
					?.value,
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
		const rawPrefix =
			functionPrefixInput?.value ?? defaultFunctionPrefix(file);
		const functionPrefix = sanitizeIdentifierPrefix(
			rawPrefix.length > 0 ? rawPrefix : defaultFunctionPrefix(file),
		);

		const options: GeneratorOptions = {
			vectorFormat,
			language,
			coordMultiplier,
			precision,
			processingVector,
			instanceMode,
		};

		// Shape IDs and names are fixed by the imported SVG chronology.
		const shapeMetaByRef = new Map<
			DrawableShape,
			{ id: number; name: string; functionName: string }
		>();
		extractedShapes.forEach((shape, index) => {
			const id = index + 1;
			const baseType = shape.primitive?.kind ?? 'path';
			const name = `${baseType}${id}`;
			shapeMetaByRef.set(shape, {
				id,
				name,
				functionName: getFunctionName(functionPrefix, id),
			});
		});

		const drawableShapes = [...extractedShapes].sort((a, b) => {
			if (sortMode === 'svg') {
				return a.sourceIndex - b.sourceIndex;
			}

			const typeA = a.primitive?.kind ?? 'path';
			const typeB = b.primitive?.kind ?? 'path';
			if (typeA === typeB) {
				return a.sourceIndex - b.sourceIndex;
			}
			return typeA.localeCompare(typeB);
		});

		let sharedCode = '';
		let html = '';
		const pathsData: string[] = [];
		const shapeIds: number[] = [];
		const pathCodes: string[] = [];
		const functionNames: string[] = [];
		const shapeNames: string[] = [];

		drawableShapes.forEach((shape: DrawableShape, index) => {
			const shapeMeta = shapeMetaByRef.get(shape);
			if (!shapeMeta) return;

			pathsData.push(shape.pathData);
			shapeIds.push(shapeMeta.id);
			const shapeName = shapeMeta.name;
			const functionName = shapeMeta.functionName;
			shapeNames.push(shapeName);
			functionNames.push(functionName);

			const generated = convertPathToP5(
				shape.pathData,
				options,
				index,
				shape,
				functionName,
			);

			// Use shared code from first shape
			if (index === 0) {
				sharedCode = generated.sharedCode;
			}

			// Collect shape code
			pathCodes.push(generated.pathCode);

			const previewId = `preview-${index}`;
			html += `
          <div class="output path-section" id="shape-section-${index}">
            <div class="path-header">
              <h2>${shapeName} (svg #${shape.sourceIndex})</h2>
              <button class="copy-btn" data-path="${index}">Copy Code</button>
            </div>
            <div class="content-grid">
              <div class="preview-container">
                <div id="${previewId}"></div>
              </div>
              <div class="code-container">
                <pre><code>${escapeHtml(generated.pathCode)}</code></pre>
              </div>
            </div>
          </div>
        `;
		});

		const drawAllPathsFunction = generateDrawAllPaths(
			functionNames,
			options,
		).trim();
		const sharedTransformCode = sharedCode.trim();
		const shapeFunctionsCode = pathCodes.join('\n\n').trim();
		const drawingCode = [drawAllPathsFunction, shapeFunctionsCode]
			.filter(section => section.length > 0)
			.join('\n\n');
		const fullCode = [sharedTransformCode, drawingCode]
			.filter(section => section.length > 0)
			.join('\n\n');

		const codeByKey: Record<string, string> = {
			complete: fullCode,
			drawing: drawingCode,
			shared: sharedTransformCode,
		};

		const fileExtension =
			vectorFormat === 'Processing' ? 'pde'
			: language === 'typescript' ? 'ts'
			: 'js';
		const completeFileName = `draw-paths.${fileExtension}`;
		const drawingFileName = `draw-paths-drawing.${fileExtension}`;
		const sharedFileName = `draw-paths-shared.${fileExtension}`;

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
      <div class="command-section">
        <div class="command-header">
          <h2>Drawing Code Only</h2>
          <div class="action-buttons">
            <button class="copy-btn" data-code-key="drawing">Copy Drawing Code</button>
            <button class="download-btn" data-code-key="drawing" data-filename="${drawingFileName}">Download ${drawingFileName}</button>
          </div>
        </div>
        <div class="command-content">
          <p style="margin: 0; padding: 15px; color: #9cdcfe;">Includes draw calls and shape functions without the shared transform section.</p>
        </div>
      </div>
    `;

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

		const combinedPreviewBlock = `
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
          ${shapeNames
				.map(
					(name, index) => `
            <li>
              <button class="shape-nav-link" data-target="shape-section-${index}">${name}</button>
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
			sharedCodeBlock +
			combinedPreviewBlock +
			html;

		// Create previews after DOM is updated
		createCombinedPreview(
			pathsData,
			shapeIds,
			'preview-all',
			drawableShapes,
		);

		pathsData.forEach((pathData, index) => {
			createPreview(
				pathData,
				`preview-${index}`,
				drawableShapes[index],
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
			btn.addEventListener('click', e => {
				const target = e.currentTarget as HTMLButtonElement;
				const codeKey = target.dataset.codeKey;

				let code = '';
				if (codeKey) {
					code = codeByKey[codeKey] || '';
				} else {
					const pathSection = target.closest('.path-section');
					code =
						pathSection?.querySelector('code')?.textContent || '';
				}
				if (!code) return;

				navigator.clipboard.writeText(code).then(() => {
					const originalText = target.textContent;
					target.textContent = 'Copied!';
					setTimeout(() => {
						target.textContent = originalText;
					}, 2000);
				});
			});
		});
	};

	reader.readAsText(file);
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
