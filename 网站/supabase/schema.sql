-- Run this in Supabase: SQL Editor → New query → paste → Run

create table if not exists forum_posts (
  id text primary key,
  title text not null,
  author text not null,
  content text not null,
  category text not null,
  created_at timestamptz not null default now(),
  views integer not null default 0,
  pinned boolean not null default false
);

create table if not exists forum_replies (
  id text primary key,
  post_id text not null references forum_posts(id) on delete cascade,
  author text not null,
  content text not null,
  created_at timestamptz not null default now()
);

create index if not exists forum_posts_created_at_idx on forum_posts (created_at desc);
create index if not exists forum_replies_post_id_idx on forum_replies (post_id);

alter table forum_posts enable row level security;
alter table forum_replies enable row level security;

-- Server uses SUPABASE_SERVICE_ROLE_KEY (bypasses RLS). No public policies needed.
