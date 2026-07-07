# Lume — Electron + React + Vite + TypeScript + Tailwind

Development:

Install dependencies:

```bash
npm install
```

Start dev environment (Vite + Electron):

```bash
npm run dev
```

Notes:
- The Electron main is `src/main/main.ts` (frameless, transparent window).
- The renderer is in `src/renderer` and built by Vite.
- `src/main/preload.js` exposes a small `electron` API for secure IPC.
