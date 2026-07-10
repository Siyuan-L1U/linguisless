# Linguisless

**Linguisless** — A satirical academic linguistics journal.

## Status

- ✅ Website built and runs locally
- ✅ Inaugural cover (Vol. 1, Issue 1, May 2026)
- ✅ Editor-in-Chief: Dr. Spicy Chicken Wing
- ✅ Associate Editor: Dr. Bazinga Klingon
- ✅ Submit via [Web of Nothing](https://webofnothing.org/journal/Linguisless.html) or **linguisless@gmail.com**
- ⏳ **Permanent public URL** — requires one-time Vercel deploy (see below)

## Run Locally

```bash
cd ~/Desktop/Linguisless/网站
npm install
npm run dev
```

Open http://localhost:3000

## Deploy Publicly (Recommended: Vercel — free, global access)

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) → Import the repo
3. Set **Root Directory** to `网站`
4. Click **Deploy**
5. You get a URL like `https://linguisless.vercel.app` — share this link with anyone

Optional: add a custom domain in Vercel project settings.

### Deploy from terminal (after `vercel login`)

```bash
cd 网站
npm run build
npx vercel --prod
```

## Features

- Journal homepage with ISSN bar, cover image, impact factor 0.000
- Article archive with full academic paper layout
- Issues, About, Submit pages
- Forum with categories, threads, and replies

## Submit

- **Web of Nothing:** https://webofnothing.org/journal/Linguisless.html
- **Email:** linguisless@gmail.com

## Forum (Supabase)

Forum posts are stored in **Supabase** when configured. Without Supabase, the forum falls back to local file storage (not persistent on Vercel).

See **[supabase/SETUP.md](supabase/SETUP.md)** for step-by-step setup.

## Add Articles

Edit `src/lib/articles.ts`.
