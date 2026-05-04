# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite)
npm run build     # Type-check + build for production
npm run lint      # ESLint
npm run preview   # Preview production build
```

No test suite is configured.

## Environment

Requires `.env.local` with:
- `VITE_API_URL` — backend base URL (e.g. `https://localhost:7183/api/v1`)
- `VITE_GOOGLE_CLIENT_ID` — Google OAuth client ID

## Architecture

**Campaign Companion** is a D&D session management tool for DMs and players. React 19 + Vite SPA with a separate backend API.

### Provider hierarchy (App.tsx)
```
QueryClientProvider → LoadingProvider → GoogleOAuthProvider → AuthProvider → BrowserRouter
```
Inside a campaign route, `CampaignProvider` wraps everything under `/campaigns/:campaignId/*` and fetches the current campaign, exposing it via `CampaignContext`.

### Auth
- JWT stored in `localStorage` as `cc_token`
- `AuthContext` (`src/context/auth-context.tsx`) validates the token on mount via `GET /auth/me`
- `ProtectedRoute` redirects unauthenticated users to `/login`
- Google OAuth is supported alongside email/password

### API layer
`src/lib/api.ts` — thin fetch wrapper with `get/post/put/delete`. All calls go to `VITE_API_URL`. Bearer token is passed explicitly by callers (not via interceptor).

### Routing
- `/` — HomePage (campaign list)
- `/campaigns/:campaignId/*` — CampaignsPage shell with nested routes:
  - `sessions` — SessionsPage
  - `sections/:sectionId` — SectionPage
- Auth pages under `/login`, `/register`, `/forgot-password`, `/reset-password`, `/verify-email`

### State management
- **Server state**: TanStack Query (query keys: `['campaign', campaignId]`, etc.)
- **Global UI state**: Zustand (where used)
- **Auth/Campaign**: React Context

### UI
- shadcn/ui components in `src/components/ui/` (Radix UI primitives + Tailwind CSS v4)
- `components.json` configures shadcn — add new components with `npx shadcn add <component>`
- Tailwind v4 (CSS-first config, no `tailwind.config.js`)
- `next-themes` for dark/light mode
- `sonner` for toast notifications

### Role system
`src/hooks/use-campaign-role.tsx` — users have a `role` within each campaign (`dm` or `player`), sourced from `CampaignResponse.role`. Use this to gate DM-only UI.
