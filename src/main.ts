import './style.css';
import type {
	VectorFormat,
	Language,
	GeneratorOptions,
	ProcessingVector,
} from './types';
import { convertPathToP5, escapeHtml, generateDrawAllPaths } from './generator';
import { createPreview } from './preview';

const dropZone = document.getElementById('dropZone') as HTMLElement;
const fileInput = document.getElementById('fileInput') as HTMLInputElement;
const output = document.getElementById('output') as HTMLElement;

let lastProcessedFile: File | null = null;

// Click to browse
dropZone.addEventListener('click', () => fileInput.click());

// Show/hide Processing vector option and instance mode based on format selection
document.querySelectorAll('input[name="vectorFormat"]').forEach(radio => {
	radio.addEventListener('change', e => {
		const target = e.target as HTMLInputElement;
		const processingOption = document.getElementById(
			'processingVectorOption'
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
		'input[name="language"], input[name="processingVector"], #instanceMode'
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
	lastProcessedFile = file;
	const reader = new FileReader();

	reader.onload = e => {
		const svgContent = e.target?.result as string;
		const parser = new DOMParser();
		const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');

		const paths = svgDoc.querySelectorAll('path');

		if (paths.length === 0) {
			output.innerHTML =
				'<div class="output"><p>No &lt;path&gt; elements found in this SVG.</p></div>';
			return;
		}

		// Get all options
		const vectorFormat =
			((
				document.querySelector(
					'input[name="vectorFormat"]:checked'
				) as HTMLInputElement
			)?.value as VectorFormat) || 'Vec';

		const language =
			((
				document.querySelector(
					'input[name="language"]:checked'
				) as HTMLInputElement
			)?.value as Language) || 'javascript';

		const coordMultiplier =
			parseFloat(
				(document.getElementById('coordMultiplier') as HTMLInputElement)
					?.value
			) || 1;

		const precision =
			parseInt(
				(document.getElementById('precision') as HTMLInputElement)
					?.value
			) || 5;

		const processingVector =
			((
				document.querySelector(
					'input[name="processingVector"]:checked'
				) as HTMLInputElement
			)?.value as ProcessingVector) || 'PVector';

		const instanceMode =
			(document.getElementById('instanceMode') as HTMLInputElement)
				?.checked || false;

		const options: GeneratorOptions = {
			vectorFormat,
			language,
			coordMultiplier,
			precision,
			processingVector,
			instanceMode,
		};

		let sharedCode = '';
		let html = '';
		const pathsData: string[] = [];
		const pathCodes: string[] = [];

		paths.forEach((path, index) => {
			const d = path.getAttribute('d');
			if (d) {
				pathsData.push(d);
				const generated = convertPathToP5(d, options, index);

				// Use shared code from first path
				if (index === 0) {
					sharedCode = generated.sharedCode;
				}

				// Collect path codes
				pathCodes.push(generated.pathCode);

				const previewId = `preview-${index}`;
				html += `
          <div class="output path-section">
            <div class="path-header">
              <h2>Path ${index + 1}</h2>
              <button class="copy-btn" data-path="${index}">📋 Copy Code</button>
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
			}
		});

		// Add drawAllPaths function to shared code
		const drawAllPathsFunction = generateDrawAllPaths(
			pathCodes.length,
			options
		);
		const completeSharedCode = sharedCode + drawAllPathsFunction;

		// Generate downloadable file
		const fileExtension =
			vectorFormat === 'Processing'
				? 'pde'
				: language === 'typescript'
				? 'ts'
				: 'js';
		const fileName = `draw-paths.${fileExtension}`;
		const fullCode = `${completeSharedCode}\n\n${pathCodes.join('\n\n')}`;

		const downloadBlock = `
      <div class="command-section">
        <div class="command-header">
          <h2>Download Complete File</h2>
          <button class="download-btn" data-filename="${fileName}">⬇️ Download ${fileName}</button>
        </div>
        <div class="command-content">
          <p style="margin: 0; padding: 15px; color: #9cdcfe;">Click the button above to download a file containing all the shared code and path functions.</p>
        </div>
      </div>
    `;

		// Add shared code block at the top
		const sharedCodeBlock = `
      <div class="shared-code-section">
        <div class="shared-code-header">
          <h2>Shared Code</h2>
          <button class="copy-btn" data-shared="true">📋 Copy Shared Code</button>
        </div>
        <div class="shared-code-content">
          <pre><code>${escapeHtml(completeSharedCode)}</code></pre>
        </div>
      </div>
    `;

		output.innerHTML = downloadBlock + sharedCodeBlock + html;

		// Add download functionality
		const downloadBtn = output.querySelector(
			'.download-btn'
		) as HTMLButtonElement;
		if (downloadBtn) {
			downloadBtn.addEventListener('click', () => {
				const blob = new Blob([fullCode], { type: 'text/plain' });
				const url = URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.href = url;
				a.download = fileName;
				a.click();
				URL.revokeObjectURL(url);

				const originalText = downloadBtn.textContent;
				downloadBtn.textContent = '✅ Downloaded!';
				setTimeout(() => {
					downloadBtn.textContent = originalText;
				}, 2000);
			});
		}

		// Create previews after DOM is updated
		pathsData.forEach((pathData, index) => {
			createPreview(pathData, `preview-${index}`);
		});

		// Add click handlers to copy buttons
		const copyBtns = output.querySelectorAll('.copy-btn');
		copyBtns.forEach(btn => {
			btn.addEventListener('click', e => {
				const target = e.target as HTMLElement;
				const isShared = target.dataset.shared === 'true';

				let code = '';
				if (isShared) {
					const sharedSection = target.closest(
						'.shared-code-section'
					);
					code =
						sharedSection?.querySelector('code')?.textContent || '';
				} else {
					const pathSection = target.closest('.path-section');
					code =
						pathSection?.querySelector('code')?.textContent || '';
				}

				navigator.clipboard.writeText(code).then(() => {
					const originalText = target.textContent;
					target.textContent = '✅ Copied!';
					setTimeout(() => {
						target.textContent = originalText;
					}, 2000);
				});
			});
		});
	};

	reader.readAsText(file);
}
