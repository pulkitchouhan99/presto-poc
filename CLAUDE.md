# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Ecommerce Pro Starter project for building Dutchie Ecommerce themes. It's a React-based theme development framework using TypeScript, Styled Components, and Module Federation to expose themes for remote loading.

## Essential Commands

```bash
# Development
npm run dev          # Start dev server on port 3001 with hot reload
npm run preview      # Preview production build

# Build
npm run build        # Build production bundle using RSBuild

# Code Quality
npm run lint         # Run ESLint checks
npm run lint:fix     # Auto-fix linting issues
npm run ts           # TypeScript type checking
npm run test         # Run Jest tests
```

## Architecture

The project follows a theme-based architecture where each theme is a self-contained module exposed via Module Federation:

```
src/
├── themes/              # All theme implementations
│   ├── sample/         # Example theme with all required components
│   ├── good-day-farm/  # Custom branded theme
│   └── nola-cannabis/  # Custom branded theme
├── preview/            # Local preview system with theme switcher
├── data/              # Mock data and data bridge helpers
├── types/             # TypeScript type definitions (ExtensionSDK types)
└── styles/            # Global styles and reset
```

### Theme Structure

Each theme must export components via `RemoteModuleRegistry` interface:
- **StoreFront**: Header, Footer, Meta, Navigation, Hero
- **ProductDetails**: Meta, Primary
- **Pages**: TermsOfService, About, Careers (optional)
- **Interstitials**: Carousel (optional)
- **Events**: Theme-specific event handlers

Themes are automatically discovered from the `src/themes` directory and exposed as federated modules.

### Key Integration Points

1. **Dutchie Extensions SDK**: Core integration framework (`@dthie/extensions-react-sdk`)
2. **Module Federation**: Themes exposed as remote modules via RSBuild config
3. **Data Bridge**: Mock data system for local development (customizable per theme)
4. **Shadow DOM**: Component isolation using react-shadow

## Testing

- Framework: Jest with TypeScript support
- Test files: `*.test.ts`, `*.test.tsx`, `*.spec.ts`, `*.spec.tsx`
- Testing utilities: @testing-library/react, @testing-library/jest-dom
- Environment: jsdom for DOM testing

## Important Configuration

- **rsbuild.config.ts**: Build configuration, Module Federation setup, theme discovery
- **tsconfig.json**: Strict TypeScript with React JSX transform
- **Node.js**: Requires v20+ for development