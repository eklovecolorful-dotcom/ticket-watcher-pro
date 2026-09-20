# Flight Price Notifier v1

## Build
- Replace the placeholder home page with a responsive dark landing page for Flight Price Notifier.
- Add the exact bilingual headline, supporting copy, sign-in action, three feature cards, and 2026 footer requested.
- Use a near-black palette, violet accents, Inter typography, restrained motion, and flight-route visual details.

## Authentication
- Enable Lovable Cloud for authentication only.
- Support email/password sign-up, sign-in, and sign-out, with email confirmation disabled for this v1.
- Do not create profiles, subscriptions, custom tables, RPCs, or application-data queries.
- Add a public authentication page and send signed-in users to `/app`.

## Authenticated App
- Protect `/app` so signed-out visitors return to authentication.
- Show the signed-in user’s email, the exact bilingual dashboard placeholder, and a sign-out action.
- Clear private cached state on sign-out and return users to authentication.

## Verification
- Add unique page metadata for the landing, authentication, and app pages.
- Check desktop and mobile layouts, sign-up/sign-in/sign-out behavior, route protection, and preview errors.

## Technical details
- Keep the existing TanStack Start routing structure and Tailwind v4 design tokens.
- Use only Lovable Cloud’s built-in auth user record; no database migration is needed.
