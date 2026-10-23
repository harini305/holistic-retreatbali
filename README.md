# Holistic Retreat Bali: frontend rebuild (Phase 2)

Next.js (App Router, JavaScript), React, GSAP + ScrollTrigger, CSS Modules. Frontend only: no backend, tracking or payments.

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run build && npm start
npm run images     # regenerate public/images and app icons (needs Python + Pillow and the local docs/source-audit folder, which is not in this repo)
```

## Routes

`/` (retreat landing page) · `/about` · `/contact` · `/privacy-policy` · custom 404.

## Content rules

- All copy comes from `docs/source-audit/` (mainly the `/retreat/` page). Do not edit the audit folder.
- Not shown until the business confirms them: price (AUD $2,890 vs $3,140), specific dates (April 2027 conflict), the "9+ sessions" figure, the Google review count, unconfirmed years and credentials, and the historical facilitator line-up.
- The enquiry form has no backend. It validates, then opens WhatsApp or the visitor's email app with the message pre-filled. It never claims delivery.
- No analytics, pixels or cookie tools are included. The privacy page reproduces the December 2023 policy and notes that it does not list the third-party services in use.
