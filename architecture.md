# Bacalar Frontend Architecture

## Overview

This frontend is a feature-based React application for planning a Bacalar trip across four main domains:

- events
- restaurants
- tours
- booking

The architecture favors keeping business logic close to each feature while centralizing app-wide infrastructure such as routing, providers, server-state configuration, internationalization, and test/mocking utilities.

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
- Zustand owns client state: UI and draft state stay local or app-level in stores.
- Infrastructure is centralized: routing, providers, i18n, HTTP helpers, and MSW composition live in dedicated app/test layers.
- Mocking should mirror production usage: features call real `fetch` endpoints and MSW intercepts them in dev and tests.

## Folder structure

```txt
frontend/
  public/
    mockServiceWorker.js
  src/
    app/
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
      booking/
        api/
        components/
        hooks/
        mocks/
        pages/
        store/
        types/
      events/
        api/
        components/
        hooks/
        mocks/
        pages/
        types/
      home/
        pages/
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
    utils/
```

## Layer responsibilities

### `src/app`

Application-level infrastructure.

- `i18n/`: initializes `i18next` resources and default language behavior.
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
- `hooks/`: React Query hooks or feature-specific composition hooks.
- `mocks/`: feature-local MSW handlers and fixtures.
- `pages/`: route-level entry points.
- `store/`: feature-local Zustand state when needed.
- `types/`: feature-owned TypeScript types.

Examples:

- `features/events` owns event fetching, localized event mocks, and the events page.
- `features/booking` demonstrates the split between server state in React Query and draft state in Zustand.

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
- booking draft input
- future UI state that does not come from the server

Avoid copying fetched collections like events or restaurants into Zustand.

## Routing

The app uses a single shared shell with nested routes.

- `/` renders the overview experience
- `/events` renders events
- `/restaurants` renders restaurants
- `/tours` renders tours
- `/booking` renders booking

Route configuration lives in `src/app/router` and should remain the only place where top-level URL structure is defined.

## Internationalization

App-wide translations are initialized in `src/app/i18n/config.ts`.

Current language concerns:

- shell copy is translated centrally
- event requests are locale-aware
- the active language is included in the events query key to keep React Query caches correct per locale
- requests send both `Accept-Language` and `?lang=...`

When a feature becomes localized, keep UI strings in i18n resources and keep any locale-dependent mock fixtures inside that feature's `mocks/` directory.

## Mocking strategy

The frontend uses an opinionated shared-plus-local MSW model.

- Shared MSW runtime lives in `src/test/msw`.
- Feature-specific handlers live in `src/features/*/mocks/handlers.ts`.
- Shared handler composition happens in `src/test/msw/handlers.ts`.
- Browser mocking starts from `src/main.tsx`.
- Test mocking starts from `src/test/setup.ts`.

This setup keeps infrastructure centralized while leaving payload shape and domain scenarios close to the owning feature.

## Testing strategy

Tests should prefer behavior over implementation details.

- Use Testing Library for user-visible assertions.
- Use MSW for network behavior instead of mocking hooks directly.
- Use `renderWithProviders(...)` to get a fresh React Query client and language-aware render path.
- Override handlers with `server.use(...)` for feature-specific test scenarios.

The current reference example is the events page flow, which covers:

- successful query rendering
- language-driven refetch
- translated error states

## Styling

Styling uses Sass modules and shared global styles.

- feature or component styles should stay close to the owning file
- cross-cutting tokens and mixins belong in `src/styles`
- layout and component classes should remain explicit rather than overly utility-driven

## Validation and CI

The frontend should remain safe for the existing CI shape:

- `npm run lint`
- `npm run typecheck`
- `npm run test:ci`
- `npm run build`

When MSW is upgraded, regenerate the worker file with:

```bash
npm run msw:init
```

## Extension guidelines

- Add new domains as new folders under `src/features`.
- Prefer feature-local handlers and fixtures over one large global mock directory.
- Keep shared abstractions small and earned; do not centralize feature business logic prematurely.
- If a pattern is only used by one feature, keep it inside that feature until reuse is real.
- Extend i18n feature by feature instead of partially translating shared components without end-to-end behavior.
