# Supabase Setup for Linguisless Forum

Follow these steps to persist forum posts permanently.

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and sign up (free)
2. Click **New project**
3. Choose a name (e.g. `linguisless`), set a database password, pick a region close to your users
4. Wait for the project to finish provisioning (~2 minutes)

## 2. Create database tables

1. In Supabase dashboard, open **SQL Editor**
2. Click **New query**
3. Paste the contents of [`schema.sql`](./schema.sql)
4. Click **Run**

You should see `Success. No rows returned`.

## 3. Get API keys

1. In Supabase, go to **Project Settings** (gear icon) → **API**
2. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **service_role** key (under Project API keys) → `SUPABASE_SERVICE_ROLE_KEY`

⚠️ **Never** expose `SUPABASE_SERVICE_ROLE_KEY` in client code or commit it to GitHub. It bypasses all security rules.

## 4. Local development

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...
```

Restart the dev server:

```bash
npm run dev
```

Visit `/forum`, create a thread, and confirm it appears in Supabase **Table Editor** → `forum_posts`.

## 5. Production (Vercel)

1. Open [vercel.com/dashboard](https://vercel.com/dashboard) → your **linguisless** project
2. **Settings** → **Environment Variables**
3. Add both variables for **Production**, **Preview**, and **Development**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. **Redeploy** the project (Deployments → ⋯ → Redeploy)

## 6. Push code changes

```bash
cd ~/Desktop/linguisless
git add .
git commit -m "Add Supabase forum storage"
git push
```

## How it works

- With env vars set → forum reads/writes Supabase tables
- Without env vars → forum uses local `data/forum.json` (fine for local dev only)

## Tables

| Table | Purpose |
|-------|---------|
| `forum_posts` | Threads (title, author, category, views, etc.) |
| `forum_replies` | Replies linked to a post |

## Free tier limits

Supabase free tier includes 500 MB database storage — more than enough for a forum starting out.
