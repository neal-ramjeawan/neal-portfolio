# Neal Ramjeawan — Portfolio

This is my personal portfolio, built to actually show the kind of infrastructure
work I do rather than just list it. I wanted something that felt like the tools
I use every day — a status page, a deployment log, a monitoring dashboard —
instead of a generic personal site template.

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19, Tailwind CSS v4 — CSS-first config via `@theme`, no `tailwind.config.js`
- JetBrains Mono + Inter, loaded through `next/font/google`
- `@vercel/analytics`
- OG image generated at build time with `next/og` — didn't want a static image
  asset that'd quietly go stale every time I updated the copy
- Icons are hand-rolled inline SVGs in `components/icons.js` — didn't want a
  whole icon library dependency for a dozen shapes
- Deployed on Vercel

## How it's organized

I split this into `data/` and `components/` on purpose — I don't want to be
hunting through JSX every time I add a project or tweak a bio line.