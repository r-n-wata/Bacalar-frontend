# PostHog setup report

PostHog browser analytics was installed, initialized through one Vite client singleton, connected to authenticated admin identity, instrumented across ten product actions, and added to a starter dashboard.

## Installed and initialized

- Added and installed `posthog-js` (`^1.300.0`), with the dependency locked in `package-lock.json`.
- Added `src/services/posthog.ts` as the single browser SDK initialization point. It reads `VITE_POSTHOG_PROJECT_TOKEN` and `VITE_POSTHOG_HOST`, trims them, initializes PostHog once, and is imported before application startup from `src/main.tsx`.
- Added the documented environment keys to `.env.example` and configured the real values in `.env` through the wizard environment tooling. Production safely no-ops when configuration is absent; development reports the missing configuration.
- Default capture behavior remains enabled. No CSP changes were required because the run found no shipped CSP configuration.

## Events instrumented

| Event | What it measures | File |
|---|---|---|
| `event_submission_completed` | A visitor successfully submits an event for review. | `src/features/events/pages/EventSubmissionPage.tsx` |
| `restaurant_submission_completed` | A visitor successfully submits a restaurant for review. | `src/features/restaurants/pages/RestaurantSubmissionPage.tsx` |
| `tour_submission_completed` | A visitor successfully submits a tour for review. | `src/features/tours/pages/TourSubmissionPage.tsx` |
| `admin_login_completed` | An administrator completes sign-in and reaches the authenticated session check. | `src/features/admin/pages/AdminLoginPage.tsx` |
| `submission_moderated` | An administrator approves or rejects a pending submission. | `src/features/admin/pages/AdminSubmissionDetailPage.tsx` |
| `published_content_updated` | An administrator saves changes to published content. | `src/features/admin/pages/AdminPublishedContentEditPage.tsx` |
| `published_content_feature_updated` | An administrator adds or removes a published item from featured content. | `src/features/admin/pages/AdminPublishedContentPage.tsx` |
| `published_content_archived` | An administrator archives published content. | `src/features/admin/pages/AdminPublishedContentPage.tsx` |
| `listing_contact_clicked` | A visitor selects a contact method from a listing detail page. | `src/components/organisms/ListingContactSection.tsx` |
| `listing_category_selected` | A visitor filters a listing collection by category. | `src/features/events/components/EventCategoryNav.tsx` |

Captures use the shared PostHog singleton and avoid PII or user-entered content in event properties. Visitor-originated events retain the anonymous browser identity.

## User identification

Identification was wired for authenticated admin users in `src/features/admin/auth/AdminAuthProvider.tsx`. The stable Supabase `session.user.id` is used as the distinct ID; optional email is sent only as a person property. Identity is synchronized during persisted-session restoration, auth changes, and successful login. `posthog.reset()` runs on logout, anonymous transitions, and before an in-memory account switch.

The returning-visitor identification path was reviewed and is included. The run did not observe live events or verify ingestion in PostHog, so attribution and delivery remain unconfirmed in a deployed environment.

## Error tracking

`src/services/posthog.ts` enables PostHog exception autocapture for unhandled errors and unhandled promise rejections. Console-error capture remains disabled. This is configured globally through the existing singleton; no manual component-level error captures were added.

## Dashboard

[Analytics basics (wizard)](https://us.posthog.com/project/517477/dashboard/1892966)

The dashboard contains four successful event-based insights: Submission activity, Moderation decisions, Listing engagement, and Content management activity. The insights were created from the intended event contract, but their charts may be empty until events arrive. The run did not verify that production events were captured or received.

## Verified by this run

- `npm install` completed successfully and installed the declared SDK.
- `npm run build` completed successfully, including TypeScript compilation, Vite production bundling, and sitemap generation.
- `npm run lint` completed successfully with no lint errors.
- Static review confirmed the singleton initialization, identity/reset lifecycle, ten planned event names and corresponding capture calls, non-PII event properties, and exception autocapture configuration.
- The dashboard and four insights were created successfully in PostHog project 517477.

## Not verified by this run

- No browser session, deployed environment, or live PostHog ingestion was exercised. A passing build proves compilation, not event delivery.
- No tests were run; the build task explicitly prohibited test-suite execution.
- The configured deployment environment was not independently verified beyond the wizard reporting the local `.env` keys as written.
- No stable event volume, funnel conversion, or dashboard population was observed.

## Issues and unresolved follow-up

- **Live attribution and ingestion remain unresolved.** The run could not establish that events reach PostHog in a deployed browser, so analytics could be silently absent from production until manually tested. This affects all ten events and the dashboard insights.
- **Dashboard funnel creation was not completed.** An initial funnel creation attempt used malformed JSON and was not created. The dashboard still has four successful event-based insights, but no funnel from that attempt.
- **Existing legacy analytics remains unevaluated.** `src/services/analytics.ts` predates this integration and is unused by the updated contact section; other consumers were not investigated. If other consumers exist, they may not feed the new PostHog contract.
- **Build output included non-blocking warnings.** Vite emitted a large-chunk advisory and sitemap generation used a static-route fallback. These did not block the build, but remain deployment considerations.

## Before you merge

- [ ] Run a production build and confirm any generated-code lint or type errors remain clear; the touched integration was verified with `npm run build` and `npm run lint`, but deployment configuration is still yours to validate (`src/services/posthog.ts`, `src/main.tsx`; exact changed lines were not recorded in the run).
- [ ] Run the test suite and update mocks or fixtures for the instrumented handlers (`src/features/events/pages/EventSubmissionPage.tsx`, `src/features/restaurants/pages/RestaurantSubmissionPage.tsx`, `src/features/tours/pages/TourSubmissionPage.tsx`, `src/features/admin/pages/AdminLoginPage.tsx`, `src/features/admin/pages/AdminSubmissionDetailPage.tsx`, `src/features/admin/pages/AdminPublishedContentEditPage.tsx`, `src/features/admin/pages/AdminPublishedContentPage.tsx`, `src/components/organisms/ListingContactSection.tsx`, `src/features/events/components/EventCategoryNav.tsx`; exact changed lines were not recorded in the run).
- [ ] Set `VITE_POSTHOG_PROJECT_TOKEN` and `VITE_POSTHOG_HOST` in every deploy environment, not only local `.env`, matching `.env.example` and the initialization reads in `src/services/posthog.ts` (exact changed lines were not recorded in the run).
- [ ] Exercise anonymous submissions, listing contact/category interactions, and authenticated admin flows in a real browser, then confirm the ten named events arrive in PostHog and populate the dashboard (`.posthog-wizard-cache/.posthog-events.json`; exact capture lines were not recorded in the run).
- [ ] Confirm the returning authenticated-session path identifies the stable user rather than creating anonymous fragments (`src/features/admin/auth/AdminAuthProvider.tsx`; exact changed lines were not recorded in the run).
