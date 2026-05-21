# Bacalar frontend

## MVP scope

The active frontend MVP includes:

- home
- events
- restaurants
- tours

Booking is future-only and intentionally not part of the current frontend routes, navigation, mocks, or API contract.

## Runtime modes

The frontend supports two valid data modes:

- mock-driven mode with MSW
- real-backend mode against the Express API

Environment variables:

```bash
VITE_ENABLE_MSW=true
VITE_API_BASE_URL=
```

Recommended usage:

- local mock mode: `VITE_ENABLE_MSW=true` and leave `VITE_API_BASE_URL` empty
- local real-backend mode: `VITE_ENABLE_MSW=false` and set `VITE_API_BASE_URL=http://localhost:4000`
- Netlify production: `VITE_ENABLE_MSW=false` and set `VITE_API_BASE_URL` to the Render backend URL

A starter file lives at `/Users/ruth.wata/Projects/bacalar/frontend/.env.example`.

## MSW setup

The frontend uses an opinionated Mock Service Worker setup with a shared base layer and feature-local handlers.

- Shared MSW runtime lives in `src/test/msw`.
- Feature handlers stay close to their domain in `src/features/*/mocks`.
- Shared request plumbing lives in `src/services/http.ts`.
- App-wide internationalization lives in `src/app/i18n/config.ts`.

### Browser behavior

Development runs start MSW automatically from `src/main.tsx` only when mock mode is enabled.

When mock handlers are active:

- unhandled requests fail loudly
- feature APIs use real `fetch` calls to `/api/*`
- locale-aware requests append `?lang=en|es`

### Real backend behavior

All feature requests still go through the shared HTTP layer. When `VITE_API_BASE_URL` is set, requests target that origin instead of the browser origin.

This keeps feature code unchanged while allowing the app to switch cleanly between:

- same-origin mock usage
- local backend usage
- deployed Render backend usage

### Query and cache behavior

The shared request hook is `useFetchApi` in `src/app/hooks/fetchApi.ts`.

Cache policy is set per MVP feature hook:

- `useHomeContent`: longest freshness window
- `useRestaurants`: long freshness window
- `useTours`: medium freshness window
- `useEvents`: shortest freshness window

This keeps route-level components simple while making React Query behavior explicit near the owning feature.

## Netlify deployment

Frontend deployment assumes Netlify.

Configuration lives in `/Users/ruth.wata/Projects/bacalar/frontend/netlify.toml`.

Key expectations:

- build command: `npm run build`
- publish directory: `dist`
- SPA redirect to `index.html`
- `VITE_API_BASE_URL` points at the Render backend
- `VITE_ENABLE_MSW=false` in hosted environments

## Test behavior

Vitest uses the same handler graph through `src/test/msw/server.ts` and `src/test/setup.ts`.

Recommended patterns:

- keep handler composition in `src/test/msw/handlers.ts`
- override only the feature handler needed in a test with `server.use(...)`
- use `renderWithProviders(...)` so each test gets a fresh React Query client and language

### Example flows

- `src/features/home/pages/HomePage.test.tsx` proves localized homepage rendering without booking in the MVP UI.
- `src/features/events/pages/EventsPage.test.tsx` proves locale-specific event refetching and translated error handling.
- `src/app/hooks/fetchApi.test.tsx` proves the shared query hook success, error, and cache reuse behavior.
- `src/services/http.test.ts` proves API base URL behavior.
- `src/test/msw/start.test.ts` proves mock mode switching behavior.

## Validation

Generate or refresh the worker file after upgrading `msw`:

```bash
npm run msw:init
```

CI-safe checks:

```bash
npm run lint
npm run typecheck
npm run test:ci
npm run build
```
