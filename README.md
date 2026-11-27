# Guruji Date Review

A short, playful date-feedback microsite built with Next.js. Designed to deploy directly to Vercel.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Import the repository at https://vercel.com/new.
3. Keep the detected Next.js settings and deploy. No environment variables are required.

## Feedback storage

Submissions are saved in the visitor's browser using `localStorage` under `guruji-date-review-v1`. Nothing is sent to a server. The final screen offers a JSON download of the saved response. The browser/device used to submit is the only place where that local copy exists.

## Notes

- The NO button playfully moves when hovered or touched. It is intentionally not a reliable answer control.
- The design is responsive and uses CSS illustrations for the McDonald's-inspired food doodle, so no external image assets are required.
- Google Fonts are loaded remotely; system fallbacks remain available.
