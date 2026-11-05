# CJ Trahey — React portfolio

A React 19 application with Vite, reusable JSX components, structured content, and stateful interactions. This replaces the earlier static implementation. Content is grounded in the latest résumé and the verified projects from cjtrahey.com.

## Run locally

Install Node.js 22.12 or later, then run:

```sh
npm install
npm run dev
```

The development URL is http://127.0.0.1:4173. pnpm 11.25.0 is also supported (`pnpm install`, then `pnpm dev`).

```sh
npm test
npm run build
npm run preview
```

The production build writes `dist/`. Deploy its contents to the existing cjtrahey.com host or any static host. Relative asset URLs allow subdirectory hosting. This client-side portfolio does not require a backend.

## Interactive features

- Support / Build / Learn explorer with selectable steps and contextual explanations.
- Experience tabs with arrow-key, Home, and End keyboard navigation.
- Project category filters and detail dialogs with native focus containment and Escape-to-close behavior.
- Persistent light/dark themes and a responsive mobile navigation menu.
- Scroll progress, active section navigation, hover effects, and entrance animations.
- Reduced-motion support, focus outlines, keyboard-accessible controls, and a skip link.
- Copy email with explicit success or selection fallback.
- Printable résumé transcribed from the latest supplied PDF.

## Structure

- `src/main.jsx`: React components, hooks, and interactions
- `src/data.js`: experience, projects, filters, and approach content
- `src/styles.css`: core responsive visual design
- `src/interactive.css`: interactive states, themes, animations, and mobile controls
- `public/resume.html`: printable résumé
- `public/favicon.svg`: site icon
- `tests/projects.test.mjs`: filtering and project-detail content checks
- `vite.config.js`: Vite configuration with relative production asset paths
- `.openai/hosting.json`: existing private preview identity; preserve on deployment retry

## Portable preview

`CJ_Trahey_Portfolio_Preview.html` uses the same React component tree. It embeds the compiled components, styles, and résumé; React and ReactDOM load from pinned esm.sh URLs, so this portable preview requires internet access. The application source uses local React dependencies and Vite.

## Verification and limitations

JSX transpilation and generated JavaScript syntax checks passed, using an installed TypeScript compiler. Project filtering tests passed.

Dependency installation failed because the environment could not reach registry.npmjs.org. A Vite production build and browser interaction checks remain unverified. The environment also blocked local browser routing and the Git publication host. No production URL is being claimed, and cjtrahey.com has not changed. The private preview project remains registered as `appgprj_6aec3bc2175c8191b7ab82cb88a65765` with no published version.

Project artwork is abstract decoration. Project details describe the original purpose and approach, without presenting old API integrations as currently operational.
