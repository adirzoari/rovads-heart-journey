# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
bun run dev          # Start Vite dev server
bun run build        # Production build
bun run build:dev    # Development build
bun run preview      # Preview production build
bun run lint         # ESLint

# Testing
bun run test         # Run Vitest once
bun run test:watch   # Vitest in watch mode
```

Tests live in `src/test/`. Run a single test file with `bun run test src/test/example.test.ts`.

## Architecture

**"Rovad" (רובד)** is a Hebrew-language dating card game (RTL layout) where couples progress through conversation levels together. The entire app is a single-page experience — no routing beyond `/` and `*`.

### State model (`src/hooks/useGameState.ts`)

All game logic lives in `useGameState`. State is persisted to `localStorage` under the key `rovad_game_state`. The hook manages:

- `currentLevel` / `questionIndex` — which question to show
- `totalAnswered` — drives level unlock thresholds (`unlockAt` on each `Level`)
- `globalCardCount` — triggers interstitial cards every 7 (special/gold cards) and every 12 (Would You Rather)
- `sparks` — chemistry counter incremented by favoriting or picking a WYR option
- `favorites` — array of favorited question IDs

The `advance` / `skip` / `favorite` actions handle all state transitions. Special interstitial states (`showSpecial`, `showWYR`, `showLevelUp`) are local component state inside the hook.

### Data (`src/data/gameData.ts`)

All content is defined statically in this file:
- `levels: Level[]` — 3 levels (id 1-3) with `unlockAt` thresholds (0, 10, 20) and `questions: Question[]`
- `specialCards: SpecialCard[]` — 20 gold cards shown as interstitials every 7 swipes
- Question types: `'either-or'` (quick binary choices) and `'open'` (discussion prompts)

WYR dilemmas (`dilemmas[]`) are defined inside `src/components/WouldYouRather.tsx` alongside the `getRandomDilemma()` export consumed by `useGameState`.

### Component tree

```
Index (src/pages/Index.tsx)
  WelcomeScreen          -- shown before game starts (local useState)
  HouseProgress          -- SVG house fills as progress increases (0-1 float)
  LevelSelector          -- tabs for the 3 levels, unlocked by totalAnswered
  GameCard               -- swipeable card with framer-motion drag + AnimatePresence
  WouldYouRather         -- interstitial every 12 cards
  LevelUpModal           -- modal on level unlock
```

`Index` owns no state beyond `started` — everything else flows from `useGameState`.

### Styling

- **Tailwind CSS** with a custom gold/navy/cream palette defined in `src/index.css` as CSS variables
- `html { direction: rtl }` is set globally — the entire UI is right-to-left
- Custom utility classes: `.gold-shimmer`, `.gold-border`, `.card-shadow`
- Font: Google Fonts "Assistant" (Hebrew-optimized)
- shadcn/ui components in `src/components/ui/` (standard, unmodified)

### Path aliases

`@/` maps to `src/` (configured in Vite + TypeScript).
