# Tushar Sharma

Personal newspaper-style website built with Next.js App Router, React, TypeScript, Tailwind CSS, Framer Motion, and Firestore-backed articles.

## Getting started

Requires Node.js 22 or newer and pnpm 10.

```bash
pnpm install
cp .env.example .env
pnpm dev
```

Open http://localhost:3000. The site can run before Firebase is configured; the public blog will show an empty state and the admin editor cannot save until credentials are present.

Seed the six blog categories with the prepared long-form articles using `pnpm seed:blogs`. The command is idempotent and updates documents by slug.

## Firebase and admin setup

1. Create a Firebase project and the default Cloud Firestore database in Native mode. For this project, choose Mumbai (`asia-south1`) in the Firebase Console. The database must exist before articles can be saved.
2. Create a service account in Firebase project settings and put its project ID, client email, and private key in `.env`. Keep this file private. On Google-hosted environments you can use Application Default Credentials via `GOOGLE_APPLICATION_CREDENTIALS` instead.
3. Set `ADMIN_PASSWORD` to a unique password and `ADMIN_SESSION_SECRET` to a separate random value of at least 32 characters in `.env`. `.env.example` is only a template and is not loaded by Next.js. Restart the development server after changing environment values.
4. Start the app and open `/admin` to sign in, write Markdown articles, save drafts, publish them, choose featured/trending placement, and edit the blog landing-page copy. Published articles appear at `/blog` and `/blog/[slug]`.

Only the server uses the Firebase Admin SDK. The Firebase web app config and Analytics SDK are not needed for this blog. Do not expose the service account or admin password with `NEXT_PUBLIC_` variables. The app uses the `posts` collection, `settings/blog` document, and `subscribers` collection; no client-side Firestore access is needed. Deploy to a Node.js runtime that can run Next.js server actions and access Firestore. Do not use a static export.

## SEO

Published articles are rendered on the server with their own title, description, canonical URL, Open Graph and Twitter metadata, and `BlogPosting` structured data. `/sitemap.xml` includes published articles and `/robots.txt` excludes the admin area. Drafts have no public article page.

## Checks and production

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm start
```

The home page lives in `src/app/page.tsx`. Its components and content remain in `src/components` and `src/data/content.ts`. Global styles are in `src/index.css`, and the portrait is served from `public/pfp.png`.
