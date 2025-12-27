# SVG Parametriser

Convert SVG paths from Adobe Illustrator to parametric p5.js/Processing code with full transform control.

## Features

-   **Drag & drop** SVG files to convert all `<path>` elements
-   **Multiple output formats**: JavaScript, TypeScript, Processing (Java)
-   **Vector options**: Custom `Vec` class, p5.js `createVector`, Processing `PVector`/`Vec2D`
-   **Live preview** of each path with labeled control points
-   **Transform control**: Pre-translate, scale, rotate, translate via `transformConfig`
-   **p5 instance mode** support for all JS/TS formats
-   **Download complete file** with all paths and shared code

## Quick Start

```bash
npm install
npm run dev
```

Open browser to `http://localhost:5173`

## Usage

1. **Upload** an SVG file (drag & drop or click)
2. **Configure** output options:
    - Vector format (Vec/createVector/Processing)
    - Language (JavaScript/TypeScript)
    - Instance mode (for p5.js sketches)
    - Coordinate multiplier & precision
3. **Download** or copy generated code

## Output Structure

### Shared Code

-   `transformConfig` - Centralized transform settings
-   `applyTransform()` - Applies all transformations
-   `drawAllPaths()` - Calls all path functions

### Individual Paths

Each path gets its own function:

```javascript
function drawPath1(p) {
	const A = applyTransform(p.createVector(10, 20)),
		B = applyTransform(p.createVector(30, 40));

	p.beginShape();
	p.vertex(A.x, A.y);
	p.vertex(B.x, B.y);
	p.endShape(CLOSE);
}
```

## Transform Control

Modify any transformation via `transformConfig`:

```javascript
transformConfig.preTranslateX = -50; // Center shape
transformConfig.scaleX = 2; // Scale 2x horizontally
transformConfig.rotation = Math.PI / 4; // Rotate 45°
transformConfig.translateX = 100; // Position
```

Transformations apply in order: **preTranslate → scale → rotate → translate**

## License

MIT
