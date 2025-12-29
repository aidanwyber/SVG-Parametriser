# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SVG Parametriser is a web-based tool that converts SVG paths from Adobe Illustrator to parametric p5.js/Processing code with transform control. The tool parses SVG path data and generates code with centralized transformation configuration, allowing easy manipulation of position, scale, and rotation.

## Build and Development Commands

```bash
# Start development server with hot reload
npm run dev

# Build for production (outputs to /docs for GitHub Pages)
npm run build

# Preview production build
npm run preview
```

## Architecture

### Core Pipeline

1. **SVG Upload** (main.ts) - User uploads SVG via drag-and-drop or file input
2. **Path Parsing** (parser.ts) - SVG path data is parsed into structured commands
3. **Code Generation** (generator.ts) - Commands are converted to p5.js/Processing code
4. **Preview Rendering** (preview.ts) - Visual preview is created using p5.js

### Key Files

- **main.ts** - Entry point; handles UI, file upload, option changes, and orchestrates the conversion pipeline
- **parser.ts** - Parses SVG path `d` attribute into `PathCommand[]` (M, L, C, Z commands). Handles both absolute and relative coordinates, and normalizes H/V commands to L
- **generator.ts** - Core code generation logic; produces transform setup code and individual path functions. Supports multiple output formats (Vec/createVector/Processing) and languages (JS/TS)
- **types.ts** - TypeScript type definitions for path commands, generator options, and transform configuration
- **utils.ts** - Utility for converting point indices to Excel-style names (A, B, C...Z, AA, AB, etc.)
- **matrix.ts** - 2D affine transformation matrix implementation (not currently used in generator output, but available for reference)
- **preview.ts** - Creates p5.js instance mode previews with visual debugging (shows grid, axes, points, control points, and coordinates)

### Code Generation Strategy

The generator produces two types of output:

1. **Shared Code** - Generated once per SVG file:
   - `transformConfig` object with pre-translate, scale, rotation, and translate properties
   - `applyTransform()` function that applies transformation matrix to vectors
   - `drawAllPaths()` function that calls all individual path functions
   - For Vec format: includes `Matrix2D` class for optimized matrix transformations

2. **Path Functions** - One per SVG `<path>` element:
   - Named `drawPath1()`, `drawPath2()`, etc.
   - Points named using Excel-style naming (A, B, C...Z, AA, AB)
   - Control points for Bezier curves named with 'c' prefix/suffix (e.g., `Ac`, `cB`)
   - All points transformed via `applyTransform()`

### Transform Application Order

The transform system applies transformations in a specific order:
1. Pre-translate (for centering shapes before other transforms)
2. Scale (separate X/Y scaling)
3. Rotation (around origin)
4. Translate (final positioning)

This order is critical and should be preserved when modifying transform logic.

### Output Format Support

The tool supports three vector formats with different characteristics:

- **Vec** (custom class): Uses optimized `Matrix2D` class for transforms. No p5.js dependency required
- **createVector** (p5.js): Uses p5.js vector library. Supports instance mode for multiple sketches
- **Processing** (Java): Supports both `PVector` and `Vec2D` (toxiclibs). No instance mode

Language options: JavaScript or TypeScript (adds type annotations)

### Instance Mode

When instance mode is enabled for p5.js formats:
- Functions receive `p` parameter (the p5 instance)
- All p5 functions are called with `p.` prefix (e.g., `p.vertex()`, `p.beginShape()`)
- Allows multiple p5 sketches on same page without conflicts

## Important Implementation Details

### Path Command Parsing

The parser handles complex SVG path syntax:
- Concatenated numbers (e.g., "4.44-8.862" or "1.5.2") are correctly split using regex
- Relative commands (lowercase) are converted to absolute coordinates
- H (horizontal) and V (vertical) commands are normalized to L (line) commands
- Current position is tracked throughout parsing for relative coordinate conversion
- Z (close path) command detection: `endShape(CLOSE)` is only used when the path ends with Z, otherwise `endShape(OPEN)` is used

### Coordinate Transformation

User can specify:
- **Coordinate Multiplier**: Scales all coordinates (useful for unit conversion)
- **Decimal Precision**: Number of decimal places in output (trailing zeros removed)

### Preview System

The preview uses p5.js instance mode to create independent sketches for each path:
- Auto-scales and centers paths to fit 500x500 canvas
- Shows coordinate grid, origin axes (red=X, green=Y)
- Displays points (green circles) and Bezier control points (orange circles)
- Labels points with names and coordinates
- Draws control point handles for Bezier curves

## Build Configuration

- **Vite** is used as the build tool
- **Output Directory**: `./docs` (configured for GitHub Pages deployment)
- **Base Path**: Empty string (allows deployment in any path)
- TypeScript compilation via `tsc && vite build`

## File Naming Conventions

- Source TypeScript files use standard names (parser, generator, utils, etc.)
- Generated code downloads use extensions based on format:
  - `.pde` for Processing
  - `.ts` for TypeScript
  - `.js` for JavaScript
