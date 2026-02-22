## Kaiden McIntosh — Portfolio

Dark, minimalist, techy portfolio site with a purple accent, built with **Next.js** and **pnpm**.

## Getting started

Install dependencies:

```bash
pnpm install
```

Run the dev server:

```bash
pnpm dev
```

Open `http://localhost:3000`.

## Customize content

- **Profile content**: `src/content/profile.ts`
  - Name, tagline, about text
  - Skills categories
  - Contact links (email / GitHub / LinkedIn)

## Project structure (high level)

- `src/app/page.tsx`: main page (hero + About/Skills/Contact)
- `src/components/SiteShell.tsx`: layout shell (header/footer)
- `src/components/SiteNav.tsx`: navbar with active-section highlight
- `src/app/globals.css`: theme tokens + global styles

## Production

```bash
pnpm build
pnpm start
```

## Notes

This project uses `next/font` to optimize and load **Geist**.
