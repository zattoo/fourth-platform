# Changelog

All notable changes to this talk will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/) loosely —
**MAJOR** for full content rewrites, **MINOR** for new slides or sections,
**PATCH** for copy / asset / styling tweaks.

## [Unreleased]

### Added
- `sw.js` service worker: the published deck works offline after one online visit (deck files, React/Babel from unpkg and Google Fonts precached). Registered from `fourth-platform.html` on `github.io` and `localhost` only.
- Event breadcrumb in every slide footer, picked from an "Event" select in the deck toolbar (after the 20m/35m toggle). Defaults to the next upcoming event: each venue in `VENUES` now carries an ISO talk day (`on`), and `nextVenueId()` picks the earliest one today or later. A stored pick is kept until its day passes; "No event" is always respected.
- "Offline ready" indicator in the deck toolbar, shown once the service worker is active.
- Favicon and Apple touch icon (`assets/favicon.png`).

### Changed
- Page title is now "The Fourth Platform" (dropped " — Zattoo").
- "The invitation" slide: reworded the demo line to "Amazon shared their vision for a new operating system powering the next generation of Fire TV devices."
- "The invitation" slide: removed the "Away from Android-based Fire OS" tile; grid now 2-up (Vega platform + React Native framework).

### Removed
- "Transforming the organisation" slide (Org chapter opener).
- Unused `assets/android-sad.png`.

## [1.0.0] — 2026-05-22

### Added
- Initial publish of "The Fourth Platform" talk.
- 53-slide deck covering Zattoo's migration from native (iOS / Android / Web) to a unified React Native codebase via Amazon Vega.
- `<deck-stage>` web component with auto-scaling, fullscreen, keyboard nav, and slide-counter overlay.
- Floating Tweaks panel: clickable slide index, short-mode toggles, length switcher (`S` key), theme switcher.
- GitHub Action that auto-deploys to GitHub Pages on every push to `main`.
- Standalone single-file build at `dist/the-fourth-platform.html` for offline presentation.

[Unreleased]: https://github.com/zattoo/fourth-platform/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/zattoo/fourth-platform/releases/tag/v1.0.0
