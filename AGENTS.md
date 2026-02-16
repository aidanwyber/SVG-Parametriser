# Repository Guidelines

## Project Structure & Module Organization
- `src/` contains all application source code.
- `src/main.ts` is the UI entry point and orchestrates upload, parsing, generation, and preview.
- `src/parser.ts`, `src/generator.ts`, and `src/preview.ts` are the core pipeline modules.
- `src/types.ts` centralizes shared TypeScript types; `src/style.css` contains app styling.
- `index.html` is the Vite app shell. `docs/` is the production build output for GitHub Pages and should be treated as generated artifacts.

## Build, Test, and Development Commands
- `npm run dev`: start local Vite dev server with hot reload.
- `npm run build`: run TypeScript checks (`tsc`) and create a production build in `docs/`.
- `npm run preview`: serve the built output locally for a production-like check.

Use Node + npm and run `npm install` once before development.

## Coding Style & Naming Conventions
- Language: TypeScript (strict mode enabled in `tsconfig.json`).
- Indentation: tabs (match existing files).
- Strings: prefer single quotes in TS files.
- Naming:
  - `camelCase` for variables/functions (`processSVG`, `createPreview`).
  - `PascalCase` for types/interfaces (`GeneratorOptions`, `PathCommand`).
  - Source file names are short, lower-case module names (for example `parser.ts`, `generator.ts`).
- Keep modules focused; put shared type updates in `src/types.ts`.

## Testing Guidelines
- No automated test framework is currently configured.
- Minimum validation for each change:
  - Run `npm run build` (must pass type checking and bundling).
  - Run `npm run dev` and smoke-test SVG upload, option toggles, preview rendering, and code download.
- For parser/generator logic changes, test at least one path with lines and curves.

## Commit & Pull Request Guidelines
- Existing history uses short, plain commit subjects (for example `no dist`, `working smooth`).
- Keep commit messages concise, imperative, and focused on one change.
- PRs should include:
  - What changed and why.
  - Manual test steps and results.
  - Screenshots or short clips for UI/preview changes.
  - Notes on whether `docs/` build output is intentionally included.
