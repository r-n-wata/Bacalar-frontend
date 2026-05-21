# Bacalar Frontend Architecture

## Overview

This frontend is a feature-based React application for planning a Bacalar trip across four MVP domains:

- home
- events
- restaurants
- tours

Booking is future-only and intentionally excluded from the MVP frontend experience.

The architecture keeps business logic close to each feature while centralizing app-wide infrastructure such as routing, providers, internationalization, shared HTTP helpers, and MSW test/runtime wiring.

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
- Mocking mirrors production usage: features call real `fetch` endpoints and MSW intercepts them in development and tests.

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
        api/
        components/
        hooks/
        mocks/
        pages/
        types/
      home/
        api/
        hooks/
        mocks/
        pages/
        types/
      restaurants/
        api/
        components/
        hooks/
        mocks/
        pages/
        types/
      tours/
        api/
        components/
        hooks/
        mocks/
        pages/
        types/
    lib/
    services/
    styles/
    test/
      msw/
```

## Layer responsibilities

### `src/app`

Application-level infrastructure.

- `hooks/`: shared app-level hooks such as `useFetchApi`.
- `i18n/`: initializes translation resources and default language behavior.
- `providers/`: owns `QueryClientProvider` wiring and app-wide provider setup.
- `router/`: defines route configuration and route-to-page mapping.
- `store/`: contains app-wide Zustand state that is not tied to a single feature.

### `src/components`

Shared UI organized with Atomic Design conventions.

- `atoms/`: lowest-level UI primitives such as buttons and inputs.
- `molecules/`: small composed pieces such as field groups or intro blocks.
- `organisms/`: larger reusable sections with multiple child elements.
- `templates/`: app shell and layout-level composition.

These files should stay domain-agnostic. If a component needs domain-specific copy, queries, or business rules, it likely belongs in a feature instead.

### `src/features`

Each feature owns its domain behavior end to end.

- `api/`: feature-specific network functions and query keys.
- `components/`: UI only meaningful inside that feature.
- `hooks/`: feature-level React Query hooks and composition hooks.
- `mocks/`: feature-local MSW handlers and fixtures.
- `pages/`: route-level entry points.
- `types/`: feature-owned TypeScript types.

Examples:

- `features/home` owns the homepage API contract, localized fixtures, and homepage rendering.
- `features/events` owns event fetching, localized event mocks, and the events page.

### `src/services`

Shared runtime infrastructure that features can call into.

- `http.ts`: locale-aware `fetch` helpers and API error handling.

### `src/lib`

Small shared code artifacts that do not fit a feature, such as query key builders.

### `src/test`

Cross-feature test infrastructure.

- `msw/`: shared MSW server, worker, base handlers, and handler composition.
- `renderWithProviders.tsx`: app-like test rendering with a fresh query client and language.
- `setup.ts`: Vitest global test lifecycle.

## Data flow

### Server state

Remote data flows through:

1. page or component
2. feature hook
3. feature API function
4. shared HTTP helper
5. `/api/*` endpoint

React Query owns caching, request lifecycle, refetching, and loading/error states.

### Client state

Zustand is reserved for client-only state such as:

- the homepage spotlight selection
- future UI state that does not come from the server

Avoid copying fetched collections like events or restaurants into Zustand.

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

## Routing

The app uses a single shared shell with nested routes.

- `/` renders the overview experience
- `/events` renders events
- `/restaurants` renders restaurants
- `/tours` renders tours

Top-level route configuration lives in `src/app/router` and is the only place where URL structure should be defined.

## Internationalization

App-wide translations are initialized in `src/app/i18n/config.ts`.

Current language concerns:

- shell copy is translated centrally
- feature requests are locale-aware
- the active language is included in every localized query key
- requests send both `Accept-Language` and `?lang=...`

When a feature becomes localized, keep UI strings in i18n resources and keep locale-dependent mock fixtures inside that feature's `mocks/` directory.

## Mocking strategy

The frontend uses an opinionated shared-plus-local MSW model.

- Shared MSW runtime lives in `src/test/msw`.
- Feature-specific handlers live in `src/features/*/mocks/handlers.ts`.
- Shared handler composition happens in `src/test/msw/handlers.ts`.
- Browser mocking starts from `src/main.tsx`.
- Test mocking starts from `src/test/setup.ts`.

This keeps infrastructure centralized while leaving payload shape and domain scenarios close to the owning feature.

## Testing strategy

Tests should prefer behavior over implementation details.

- Use Testing Library for user-visible assertions.
- Use MSW for network behavior instead of mocking hooks directly.
- Use `renderWithProviders(...)` to get a fresh React Query client and language-aware render path.
- Override handlers with `server.use(...)` for feature-specific test scenarios.
- Keep cache behavior assertions close to the shared hook and feature hooks.

Current reference examples cover:

- homepage rendering and locale refetching
- events rendering and localized error handling
- shared query hook success, error, and cache reuse behavior

## Validation and CI

The frontend should remain safe for the current CI shape:

```bash
npm run lint
npm run typecheck
npm run test:ci
npm run build
```

When MSW is upgraded, regenerate the worker file with:

```bash
npm run msw:init
```
