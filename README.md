# BuxTax Kazakhstan

Production-grade lead-generation website for an accounting company in Kazakhstan, built with Next.js 14 App Router, TypeScript, Tailwind CSS, shadcn-style UI primitives, Supabase and server actions.

## Features

- SEO landing pages for Kazakhstan accounting queries
- Accounting services, pricing, contacts, FAQ and privacy pages
- Accounting price calculator
- Salary, IP tax, VAT and payroll tax calculators
- Lead capture forms after calculations
- Supabase `leads` CRM with Telegram notifications
- Supabase-authenticated admin panel
- Markdown blog with pagination, dynamic metadata, OpenGraph and ISR
- Supabase Storage upload flow for blog images
- `sitemap.xml`, `robots.txt` and schema.org structured data

## Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- shadcn-style components
- Supabase PostgreSQL, Auth and Storage
- React Hook Form
- Zod
- Vercel deployment ready

## Local development

1. Install dependencies:

```bash
npm install
```

2. Copy env vars:

```bash
cp .env.example .env.local
```

3. Fill in:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

4. Run the app:

```bash
npm run dev
```

## Supabase setup

1. Create a new Supabase project.
2. Open SQL Editor and run [`supabase/schema.sql`](/home/jorzhik/buxtax2026/supabase/schema.sql).
3. In Authentication, create an admin user with email/password for `/admin/login`.
4. Confirm the storage bucket `blog-images` exists and is public.
5. Add the project URL and keys to `.env.local`.

## Telegram bot setup

1. Create a bot with `@BotFather`.
2. Copy the bot token into `TELEGRAM_BOT_TOKEN`.
3. Add the bot to your target chat or group.
4. Get the chat id and place it in `TELEGRAM_CHAT_ID`.
5. Submit any lead form to confirm the notification arrives.

## Tax assumptions

The calculators are coded around Kazakhstan 2026 assumptions and are intentionally labeled as estimates. Two notable date-specific details:

- The standard VAT rate is treated as `16%` from January 1, 2026.
- The patent regime for IP was abolished from January 1, 2026, so the calculator marks it as legacy/unavailable instead of presenting it as a current option.

For production use, review the constants in [`lib/tax.ts`](/home/jorzhik/buxtax2026/lib/tax.ts) with your accountant or tax counsel whenever Kazakhstan tax rules change.

## Deployment

Deploy to Vercel with the same environment variables from `.env.local`.

Recommended Vercel settings:

- Framework preset: `Next.js`
- Node version: current LTS
- Build command: `npm run build`
- Output: default

## Important paths

- App routes: [`app`](/home/jorzhik/buxtax2026/app)
- Shared components: [`components`](/home/jorzhik/buxtax2026/components)
- Server actions: [`actions`](/home/jorzhik/buxtax2026/actions)
- Supabase helpers: [`lib/supabase`](/home/jorzhik/buxtax2026/lib/supabase)
- Tax logic: [`lib/tax.ts`](/home/jorzhik/buxtax2026/lib/tax.ts)
