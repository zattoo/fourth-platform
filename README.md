# The Fourth Platform: How Vega got us surprisingly close to "Write Once, Run Everywhere"

The story about how Zattoo moved from 3 native platforms (Android, Apple, Web) tech stack to a unified React Native architecture, enabled by the fourth platform: Vega.

---

## The talk

"Write once, run everywhere" is a promising goal in software development, but one that often breaks down under real-world problems. At Zattoo, building streaming applications across Android, Apple, and Web meant years of separate native stacks that were not aligned, and therefore did not scale. This talk explains how moving to a multiplatform architecture, enabled by Vega as a fourth (React Native first platform), brought us very close to achieving that goal.

We walk through the architectural decisions behind Zattoo's transition from platform-specific native applications to a unified React Native based multiplatform codebase. How the codebase is structured, what parts of the application are shared, where platform-specific boundaries still exist, and how Vega fits into this architecture alongside Android, Apple, and Web.

We also discuss the practical trade-offs of this approach, including challenges encountered during the migration, limitations of cross-platform abstractions, and areas where platform-specific work remains necessary. And we cover how teams are organized around business domains rather than platforms, and how this shift helped improve alignment and speed up delivery across ecosystems.

Rather than presenting an idealized solution, this talk focuses on lessons learned from building and shipping a real production streaming application across all major ecosystems, and what it takes to make a "write once, run everywhere" strategy look like in practice.

## What you'll learn

- Designing a scalable multiplatform architecture with React Native
- Managing shared code and platform-specific constraints
- Lessons learned from shipping one application across all major ecosystems

## Who it's for

Frontend and platform engineers working on applications that must run across multiple ecosystems, including Mobile, Web, and TV. Particularly relevant for teams evaluating or already using React Native, and for engineers interested in unifying business logic, UI, and tooling across platforms without sacrificing performance or platform integration.

Also useful for technical leads and engineering managers responsible for platform strategy, team alignment, and long-term scalability, who are considering a shift from platform-specific development toward a shared multiplatform architecture.

## Duration

- Short version: 20 minutes
- Long version: 35 minutes

## Tags

Multiplatform · React Native · Vega · Platform Architecture · Cross-Platform Development · Software Architecture

---

## View the deck

- **Live**: <https://zattoo.github.io/fourth-platform/>
- **Locally**: any static server will do

```bash
# Python
python3 -m http.server 8080

# Node
npx serve .
```

Open <http://localhost:8080>.

> The deck is plain HTML + Babel-compiled JSX in the browser. No build step.

## Controls

| Key                | Action                                  |
| ------------------ | --------------------------------------- |
| `→` / `Space`      | Next slide (or next build step)         |
| `←`                | Previous slide / step                   |
| `S`                | Toggle Short (20 min) ↔ Full (35 min)   |
| Fullscreen button  | Enter fullscreen presentation mode      |

The on-screen **Tweaks** panel (bottom-right) gives you:

- A clickable slide index with optional-slide toggles (●) for short mode
- A length switcher (20m / 35m)
- A theme switcher (dark / light)

## Repository layout

```
.
├── index.html                # Deck entry point
├── deck.css                  # Deck-wide styles
├── deck-stage.js             # <deck-stage> web component
├── tweaks-panel.jsx          # Floating Tweaks UI
├── slides-content.jsx        # ~50 slide components (the bulk of the talk)
├── slides-frame.jsx          # Cover / hook / whoami / closing — venue-neutral shell
├── ds/                       # Zattoo design tokens + Compasse font files
│   ├── colors_and_type.css
│   └── fonts/                # Compasse OTFs (5 weights)
├── assets/                   # Slide imagery
├── dist/                     # Standalone single-file build (offline / sharing)
├── CHANGELOG.md              # Versioned notes per iteration
└── .github/workflows/        # GitHub Pages auto-deploy
```

## Fonts

The deck uses **Compasse** by Dharma Type — a semi-condensed sans-serif that ships with this repo under Zattoo's org license. The 5 OTFs live in `ds/fonts/`:

```
ds/fonts/Compasse-Regular.otf
ds/fonts/Compasse-Bold.otf
ds/fonts/Compasse-ExtraBold.otf
ds/fonts/Compasse-Light.otf
ds/fonts/Compasse-Italic.otf
```

A Google-Fonts copy of [Barlow Semi Condensed](https://fonts.google.com/specimen/Barlow+Semi+Condensed) loads as a fallback for the rare case the OTFs fail to load.

## Editing slides

Slides are React components rendered through Babel-standalone — there is no bundler, so you can edit `.jsx` files and hard-reload to see changes.

Slide order lives in the `slides` array inside `index.html`. To reorder, add, or remove slides, edit that array; page numbers and the slide counter rebuild themselves from DOM order on load.

## Credit

Content © Zattoo.
