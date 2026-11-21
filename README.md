# WedPlan — Client

**WedPlan** is a wedding planning platform. Customers discover wedding services and send booking requests, vendors publish services and manage requests (with an optional Premium plan), and admins moderate users, services and transactions.

- **Live website:** _add link_
- **Client repository:** https://github.com/almamuncode/wedplan-client
- **Server repository:** https://github.com/almamuncode/wedplan-server

## Important Features

- Better Auth with email/password and Google sign-in. Sign-up offers a Customer or Vendor role and an optional profile photo uploaded to ImgBB. Admin accounts can't be created publicly.
- Password rules: at least 6 characters, with one uppercase and one lowercase letter.
- Role-based dashboards (admin, vendor, customer) with a sidebar layout. Each dashboard is guarded on the server, so changing the URL to another role's dashboard redirects you back to your own.
- Proxy-level redirect to Sign In for private routes (`/dashboard`, `/services/[id]`, `/payment/*`). Sessions survive page reloads.
- Short-lived JWTs from Better Auth's JWT plugin are kept in memory and sent as `Bearer` tokens to the Express API.
- Blocked users can't start sessions and are sent to a blocked notice.
- The navbar updates as soon as you sign in or out. The profile dropdown has Dashboard, Profile Settings and Logout.
- Home page with banner, featured services, categories, Why Choose WedPlan and How It Works, animated with Motion (honours reduced-motion settings).
- Toast notifications, loading skeletons, empty and error states, plus 404 and error pages.

## Technology Stack

Next.js 16 (App Router), TypeScript, Tailwind CSS v4, shadcn/ui (Radix), Better Auth (MongoDB adapter + JWT plugin), React Hook Form + Zod, Motion, Sonner, Lucide.

## Installation

```bash
git clone https://github.com/almamuncode/wedplan-client.git
cd wedplan-client
npm install
cp .env.example .env.local   # then fill in the values
```

## Environment Variables

| Variable | Description |
| --- | --- |
| `BETTER_AUTH_SECRET` | Random secret (`openssl rand -base64 32`) |
| `BETTER_AUTH_URL` | Public URL of this app, e.g. `http://localhost:3000` |
| `MONGODB_URI` | MongoDB connection string (same database as the server) |
| `DB_NAME` | Database name, default `wedplan` |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth credentials. Redirect URI: `{BETTER_AUTH_URL}/api/auth/callback/google` |
| `NEXT_PUBLIC_API_URL` | URL of the Express API |

## Run Locally

```bash
npm run dev     # http://localhost:3000
```

Start the server project as well (see its README). To create an admin, register normally and run `npm run seed:admin -- <email>` in the server project.

## Adding shadcn components

`components.json` is configured, so you can run, for example:

```bash
npx shadcn@latest add dialog table tabs
```
