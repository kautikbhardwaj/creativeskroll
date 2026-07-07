# Creativeskroll — Portfolio Website

Modern React portfolio for Sanchita Bhatia (Creativeskroll).

## Stack
- React 19 + TypeScript
- Vite 6 + TanStack Router (SPA)
- Tailwind CSS v4
- Playfair Display + Inter fonts

## Run locally

```bash
npm install
npm run dev
```

Opens at http://localhost:5173

## Build for production

```bash
npm run build
npm run preview
```

Output goes to `/dist` — deploy to Vercel, Netlify, or any static host.

## Deploy to Vercel

1. Push this folder to a GitHub repository
2. Connect to Vercel → Import project
3. Framework: Vite
4. Build command: `npm run build`
5. Output directory: `dist`
6. Add rewrites rule in `vercel.json`:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

## Pages
- `/` — Homepage (Hero, Portfolio Gallery, Motion Showcase, Services, Contact)
- `/about` — About Sanchita Bhatia

## Assets
All portfolio images are in `public/assets/` — same structure as the original Creativeskroll website.

## Content
To update portfolio content, edit `src/data/portfolio.ts` — all images, videos, categories, and social links are defined there.
