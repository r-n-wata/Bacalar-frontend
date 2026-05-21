# Bacalar frontend

## MVP scope

The active frontend MVP includes:

- home
- events
- restaurants
- tours

Booking is future-only and intentionally not part of the current frontend routes, navigation, mocks, or cache policy.

## MSW setup

The frontend uses an opinionated Mock Service Worker setup with a shared base layer and feature-local handlers.

- Shared MSW runtime lives in `src/test/msw`.
- Feature handlers stay close to their domain in `src/features/*/mocks`.
- Shared request plumbing lives in `src/services/http.ts`.
- App-wide internationalization lives in `src/app/i18n/config.ts`.

### Browser behavior

Development runs start MSW automatically from `src/main.tsx`. The worker is enabled by default in development and can be disabled with `VITE_ENABLE_MSW=false`.

When mock handlers are active:

- unhandled requests fail loudly
- feature APIs use real `fetch` calls to `/api/*`
- locale-aware requests append `?lang=en|es`

### Query and cache behavior

The shared request hook is `useFetchApi` in `src/app/hooks/fetchApi.ts`.

Cache policy is set per MVP feature hook:

- `useHomeContent`: longest freshness window
- `useRestaurants`: long freshness window
- `useTours`: medium freshness window
- `useEvents`: shortest freshness window

This keeps route-level components simple while making React Query behavior explicit near the owning feature.

### Test behavior

Vitest uses the same handler graph through `src/test/msw/server.ts` and `src/test/setup.ts`.

Recommended patterns:

- keep handler composition in `src/test/msw/handlers.ts`
- override only the feature handler needed in a test with `server.use(...)`
- use `renderWithProviders(...)` so each test gets a fresh React Query client and language

### Example flows

- `src/features/home/pages/HomePage.test.tsx` proves localized homepage rendering without booking in the MVP UI.
- `src/features/events/pages/EventsPage.test.tsx` proves locale-specific event refetching and translated error handling.
- `src/app/hooks/fetchApi.test.tsx` proves the shared query hook success, error, and cache reuse behavior.

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
