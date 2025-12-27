# SVG Parametriser

Convert SVG paths from Adobe Illustrator to parametric p5.js/Processing code with full transform control.

[Check out the demo here.](aidanwyber.github.io/SVG-Parametriser/)

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

```js
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

```js
transformConfig.preTranslateX = -50; // Center shape
transformConfig.scaleX = 2; // Scale 2x horizontally
transformConfig.rotation = Math.PI / 4; // Rotate 45°
transformConfig.translateX = 100; // Position
```

Transformations apply in order: **preTranslate → scale → rotate → translate**

## License

MIT
