# Bacalar frontend

## MSW setup

The frontend now uses an opinionated Mock Service Worker setup with a shared base layer and feature-local handlers.

- Shared MSW runtime lives in `src/test/msw`.
- Feature handlers stay close to their domain in `src/features/*/mocks`.
- Shared request plumbing lives in `src/services/http.ts`.
- App-wide internationalization lives in `src/app/i18n/config.ts`.

### Browser behavior

Development runs start MSW automatically from `src/main.tsx`. The worker is enabled by default in dev and can be disabled with `VITE_ENABLE_MSW=false`.

When mock handlers are active:

- unhandled requests fail loudly
- feature APIs use real `fetch` calls to `/api/*`
- locale-aware requests append `?lang=en|es`

### Test behavior

Vitest uses the same handler graph through `src/test/msw/server.ts` and `src/test/setup.ts`.

Recommended patterns:

- keep handler composition in `src/test/msw/handlers.ts`
- override only the feature handler needed in a test with `server.use(...)`
- use `renderWithProviders(...)` so each test gets a fresh React Query client and language

### Example flow

`src/features/events/pages/EventsPage.test.tsx` proves the intended path:

- app boots on the `/events` route
- events load through React Query + MSW
- switching from `EN` to `ES` triggers a locale-specific refetch
- handler overrides can force an error state without changing production code

### Validation

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
