# Portfolio Stats Worker

Cloudflare Worker API for private visit stats and resume requests while the portfolio stays on GitHub Pages.

## Setup

1. Log in to Cloudflare:

```bash
npx wrangler login
```

2. Create the KV namespace:

```bash
npm run worker:kv:create
```

3. Put the returned KV namespace `id` into `worker/wrangler.toml`.

4. Add Worker secrets:

```bash
npx wrangler secret put ADMIN_STATS_TOKEN --config worker/wrangler.toml
npx wrangler secret put RESEND_API_KEY --config worker/wrangler.toml
```

Set these Worker vars in `worker/wrangler.toml`:

```toml
RESUME_NOTIFY_EMAIL = "you@example.com"
RESUME_FILE_URL = "https://example.com/resume.pdf"
RESUME_FROM_EMAIL = "Eswar Portfolio <resume@example.com>"
```

With Resend test mode, the recipient email must be the email address on your Resend account. To email visitors and notify another inbox, verify a domain in Resend and update `RESUME_FROM_EMAIL` to use that domain.

5. Deploy the Worker:

```bash
npm run worker:deploy
```

6. Set the frontend API base URL before building the GitHub Pages site:

```env
VITE_STATS_API_BASE_URL=https://eswar-portfolio-stats.<your-subdomain>.workers.dev
```

## Local Dev

```bash
npm run worker:dev
```

For local frontend testing, keep the Vite origin in the comma-separated `SITE_ORIGIN` allowlist, such as `http://localhost:5174`.
