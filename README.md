# Linguisless

**Linguisless** — A satirical academic linguistics journal.

## Repository layout

| Folder | Contents |
|--------|----------|
| [`网站/`](./网站/) | Next.js website (source code, deploy from here) |
| [`图片/`](./图片/) | Cover and marketing images |
| [`广告/`](./广告/) | Promotional copy and materials |

## Website

All site code lives in **`网站/`**. See **[网站/README.md](./网站/README.md)** for local dev, Vercel deploy, and Supabase forum setup.

```bash
cd 网站
npm install
npm run dev
```

Open http://localhost:3000

### Vercel

In the Vercel project settings, set **Root Directory** to `网站`, then deploy.
