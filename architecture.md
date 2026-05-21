# Bacalar Frontend Architecture

## Overview

This frontend is a feature-based React application for planning a Bacalar trip across four MVP domains:

- home
- events
- restaurants
- tours

Booking is future-only and intentionally excluded from the active MVP frontend experience.

The architecture keeps business logic close to each feature while centralizing routing, providers, internationalization, runtime HTTP behavior, and shared mock/test infrastructure.

## Stack

- React 19
- Vite
- TypeScript
- React Router
- TanStack React Query
- Zustand
- `react-i18next`
- Vitest
- Testing Library
- Mock Service Worker
- Sass modules

## Core principles

- Feature-first organization: domain code lives under `src/features`.
- Shared UI stays generic: reusable presentational building blocks live under `src/components`.
- React Query owns server state: fetched API data should not be duplicated in Zustand.
- Zustand owns lightweight client state: only UI state such as the homepage spotlight selection belongs there.
- Infrastructure is centralized: routing, providers, i18n, HTTP helpers, and MSW composition live in dedicated app/test layers.
- Runtime mode is environment-driven: the same frontend can use MSW or a real backend without feature rewrites.

## Folder structure

```txt
frontend/
  public/
    mockServiceWorker.js
  src/
    app/
      hooks/
      i18n/
      providers/
      router/
      store/
    components/
      atoms/
      molecules/
      organisms/
      templates/
    features/
      events/
      home/
      restaurants/
      tours/
    lib/
    services/
    styles/
    test/
      msw/
  .env.example
  netlify.toml
```

## Data and runtime flow

Remote data flows through:

1. page or component
2. feature hook
3. feature API function
4. shared HTTP helper
5. `/api/*` endpoint

The shared HTTP layer owns:

- locale-aware request construction
- API base URL selection
- `Accept-Language` handling
- typed JSON fetching

Runtime modes:

- MSW mode for local mock-driven development
- real-backend mode for local or deployed API usage

Environment decides which mode is active; feature code does not.

## Caching strategy

The shared request hook is `src/app/hooks/fetchApi.ts`, exported as `useFetchApi`.

Responsibilities:

- standardize typed query usage around `ApiError`
- accept per-feature React Query options
- keep request policy shared without absorbing feature business logic

Cache policy lives in feature hooks, not in pages:

- `useHomeContent`: longest freshness window
- `useRestaurants`: long freshness window
- `useTours`: medium freshness window
- `useEvents`: shortest freshness window among MVP features

Localized query keys remain the cache identity mechanism, so English and Spanish responses stay isolated in React Query.

## Deployment model

The MVP deployment topology is:

- Netlify hosts the frontend
- Render hosts the backend API

Frontend deployment expectations:

- Netlify uses `npm run build`
- Netlify publishes `dist`
- SPA routing is handled through `netlify.toml`
- `VITE_API_BASE_URL` points to the Render backend
- `VITE_ENABLE_MSW=false` in hosted environments

## Testing strategy

Tests should prefer behavior over implementation details.

- Use Testing Library for user-visible assertions.
- Use MSW for network behavior instead of mocking hooks directly.
- Use `renderWithProviders(...)` to get a fresh React Query client and language-aware render path.
- Override handlers with `server.use(...)` for feature-specific test scenarios.
- Keep runtime config assertions close to the shared HTTP/MSW helpers.

Current reference examples cover:

- homepage rendering and locale refetching
- events rendering and localized error handling
- shared query hook success, error, and cache reuse behavior
- API base URL selection
- mock mode switching

## Validation and CI

The frontend should remain safe for the current CI shape:

```bash
npm run lint
npm run typecheck
npm run test:ci
npm run build
```
