# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a JavaScript learning center application built with Next.js 15 (App Router) and TypeScript. It provides interactive simulators and visualizations for core JavaScript concepts including Promise, Closure, Event Loop, Variable scope, Event Delegation, Prototype, Execution Context, Virtual DOM, and Rendering Strategies.

## Development Commands

```bash
# Install dependencies
yarn install

# Development server with Turbopack
yarn dev

# Build for production
yarn build

# Start production server
yarn start

# Run linting
yarn lint

# Type checking
yarn type-check
```

## Architecture

### Tech Stack
- Next.js 15 with App Router
- React 19
- TypeScript
- Tailwind CSS v4
- ESLint
- Vercel Analytics

### Directory Structure
- `/src/app/` - Next.js app router pages
  - Each concept has its own route (e.g., `/closure`, `/event-loop`, etc.)
  - Layout and global styles in root
- `/src/components/` - React components organized by feature
  - Each concept has its own UI components folder
  - Shared components in `/share/ui/`
- `/public/` - Static assets including favicons and images

### Key Patterns
1. **Page Structure**: Each learning concept follows the pattern:
   - Route page in `/app/[concept]/page.tsx`
   - Landing component in `/components/[concept]/ui/[Concept]Landing.tsx`
   - Components use barrel exports via `index.ts`

2. **Shared Layout**: `StudyPageLayout` component provides consistent page structure with:
   - Title and subtitle
   - Optional back navigation
   - Configurable max width (normal/wide/full)
   - Gradient background with card-based content

3. **Korean Localization**: The app is localized for Korean users with Korean metadata and content

4. **SEO Optimized**: Comprehensive metadata including OpenGraph, Twitter cards, and structured data

## Deployment
- Deployed on Vercel at https://1nnovator-js-study.vercel.app
- Google site verification enabled