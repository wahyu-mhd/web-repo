# Wahyu Mahendra — portfolio

A Systems Editorial portfolio built with the existing Next.js App Router, React, TypeScript, Tailwind and npm setup.

- Engineering at `/`, photography at `/photography`.
- CV-supported project summaries and Markdown articles at `/projects/<slug>`.
- Native cross-document View Transitions for mode switching, with ordinary navigation as the fallback.
- Responsive article contents, optimised local media, keyboard-accessible photo viewer.
- Existing Resend integration, social URLs, verification asset and résumé route retained.

## Development

Use Node.js 22.6 or newer (the content tests use native TypeScript stripping).

```sh
npm ci
npm run dev
npm run check
npm run build
npm start
```

Read the installed Next.js guides under `node_modules/next/dist/docs/` before modifying framework behaviour.

## Editing

See [CONTENT_GUIDE.md](CONTENT_GUIDE.md) for projects, articles, images, videos, photographs, and factual questions. Start with [the article template](content/projects/_template.md).

The gallery is intentionally empty until actual photographs are supplied. Project drafts are hidden from visitors.

## Contact service

Keep `RESEND_API_KEY` and optional `CONTACT_EMAIL` in your environment. The sender remains `hello@wahyumhd.com`. Do not commit credentials. UI verification does not send real mail.

See [VERIFICATION.md](VERIFICATION.md) for checks and remaining limitations.
