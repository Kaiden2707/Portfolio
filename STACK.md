# Stack & Recreate Prompt

## Stack overview

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 |
| **Database** | Neon (serverless PostgreSQL) |
| **ORM** | Drizzle ORM (type-safe) |
| **DB driver** | `@neondatabase/serverless` |
| **Auth** | Better Auth (Drizzle adapter, email/password) |
| **Auth schema** | user, session, account, verification (CLI-generated) |

### Key dependencies

- **better-auth** – auth server + client
- **drizzle-orm** – queries and schema
- **drizzle-kit** – migrations / push
- **@neondatabase/serverless** – Neon HTTP client
- **@better-auth/cli** – generate auth schema for Drizzle
- **dotenv** – load `.env.local` in `drizzle.config.ts`

---

## Project structure (auth & DB)

```
src/
├── app/
│   ├── api/auth/[...all]/route.ts   # Better Auth API handler
│   ├── login/page.tsx                # Sign-in page
│   ├── signup/page.tsx               # Sign-up page
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── SiteNav.tsx                   # Includes Sign in / Sign up links
│   └── ...
├── lib/
│   ├── auth.ts                       # Better Auth server config (Drizzle adapter, pg)
│   ├── auth-client.ts               # createAuthClient (signIn, signUp, signOut, useSession)
│   └── db/
│       ├── index.ts                  # Neon + Drizzle client, schema export
│       └── schema.ts                 # user, session, account, verification + relations
drizzle/
├── 0000_*.sql                        # Generated migration (optional when using push)
drizzle.config.ts                     # schema path, out dir, dialect postgresql, DATABASE_URL
.env.local                            # DATABASE_URL, BETTER_AUTH_SECRET, BETTER_AUTH_URL
```

---

## Environment variables

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Neon Postgres connection string (pooler, `?sslmode=require`) |
| `BETTER_AUTH_SECRET` | Secret for auth (32+ chars) |
| `BETTER_AUTH_URL` | App base URL (e.g. `http://localhost:3000`) |
| `NEXT_PUBLIC_APP_URL` | Optional; public URL for auth redirects |

---

## Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `db:generate` | `drizzle-kit generate` | Generate migration SQL from schema |
| `db:push` | `drizzle-kit push` | Apply schema to Neon (no migration files) |
| `dev` | `next dev --webpack` | Run dev server |

---

## Example prompt: recreate this structure

Copy and adapt this prompt to have an AI set up the same stack in a new (or existing) Next.js project:

```text
Set up authentication and database for my Next.js App Router project with this stack:

- **Database**: Neon (serverless Postgres). I have a Neon project and will provide DATABASE_URL in .env.local.
- **ORM**: Drizzle ORM, type-safe, with the Neon serverless driver (@neondatabase/serverless).
- **Auth**: Better Auth with the Drizzle adapter (provider: "pg"). Use the Better Auth CLI to generate the Drizzle schema (user, session, account, verification with relations), then place the schema in src/lib/db/schema.ts and wire it to the Drizzle client and auth config.
- **Scripts**: Add "db:generate": "drizzle-kit generate" and "db:push": "drizzle-kit push" to package.json. Use a drizzle.config.ts that reads DATABASE_URL from .env.local (e.g. with dotenv).
- **Auth API**: Next.js route at app/api/auth/[...all]/route.ts using toNextJsHandler(auth).
- **Auth client**: createAuthClient from better-auth/react in src/lib/auth-client.ts, exporting signIn, signUp, signOut, useSession. Base URL from NEXT_PUBLIC_APP_URL or fallback to localhost:3000.
- **Pages**: Login page (email + password, signIn.email) and Signup page (name, email, password, signUp.email). Style them to match a dark theme with a purple accent (surface, border, accent CSS variables). Add "Sign in" and "Sign up" links to the main nav.
- **Env**: Document that the app needs DATABASE_URL, BETTER_AUTH_SECRET, and BETTER_AUTH_URL (and optionally NEXT_PUBLIC_APP_URL).

Install: drizzle-orm, @neondatabase/serverless, better-auth; dev: drizzle-kit, @better-auth/cli, dotenv. After setup, run pnpm run db:push to create the auth tables on Neon.
```

---

## Short one-liner prompt

```text
Add Better Auth + Drizzle + Neon to my Next.js app: Drizzle schema (user, session, account, verification) in src/lib/db, auth server in src/lib/auth.ts with drizzleAdapter(db, { provider: "pg" }), API at api/auth/[...all], auth client with signIn/signUp/signOut/useSession, login and signup pages, db:generate and db:push scripts, and .env.local with DATABASE_URL, BETTER_AUTH_SECRET, BETTER_AUTH_URL.
```
