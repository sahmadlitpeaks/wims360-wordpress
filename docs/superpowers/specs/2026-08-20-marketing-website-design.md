# WIMS 360 Marketing Website — Design Spec

**Date:** 2026-08-20
**Status:** Approved by Shakeel (design presented and accepted in session)
**Source of truth for strategy:** the "WIMS 360 Website Strategy Review" artifact (August 2026), which synthesized: full walkthroughs of wims360.vercel.app and wims360.com, a complete feature inventory of the WIMS 360 platform codebase, and live research of 12 competitor marketing sites.

## 1. Goal

Replace wims360.com with a modern, multi-page marketing website that explains WIMS 360 clearly, demonstrates the platform through product-style visuals, presents predefined packages, lets prospects configure a custom package, and converts visitors into qualified leads with structured context attached.

## 2. Decisions (locked)

| Decision | Choice |
|---|---|
| Foundation | Fresh Next.js (App Router, TypeScript) + Tailwind CSS |
| Scope | Full 8-page site in one pass |
| Lead intake | Next.js API route that emails structured submissions (SMTP/Resend via env), payload shaped for later WIMS CRM forwarding |
| Location | `C:\xampp\htdocs\wims360-website`, its own git repository, Vercel-ready |
| Content storage | Typed data files in `content/` — no CMS, no database |
| Theme | Light theme only for v1 |

## 3. Pages & routes

| Route | Purpose | Primary CTA | Secondary CTA |
|---|---|---|---|
| `/` | 13-section homepage (see §4) | Book a demo | View packages |
| `/platform` | Full platform map: Clinical Intelligence vs Clinic Operations halves, six modules with deep sections, cross-cutting layers, integrations wall | Book a demo | View packages |
| `/ai` | Dr.T Copilot (five loops, tabbed) + Wellness Companion + AI governance (consent-gated, clinician-approved writes, off-by-default until BAA) | See Dr.T in a demo | Read security approach |
| `/solutions/[slug]` | 4 buyer pages: `wellness-clinics`, `functional-medicine`, `labs`, `multi-center`. Per-buyer problem → relevant modules → recommended package | Book a demo | See recommended package |
| `/packages` | Essentials / Clinical / Precision / Custom cards, feature-comparison table (no prices), "How pricing works" section, FAQ | Talk to us (per tier, pre-tagged) | Build a custom package |
| `/build` | 5-step package builder (see §5) | Submit request | Book a demo instead |
| `/security` | Trust Center: HIPAA/GDPR posture, audit logging, consent versioning, 2FA, retention, breach flow, AI-off-by-default | Request the DPA/BAA pack | Book a security call |
| `/contact` | Demo form: name, work email, org type, "what should we show you?" | Submit | — |
| `/privacy`, `/terms` | Real minimal legal pages — zero dead footer links | — | — |
| `POST /api/lead` | Lead intake (see §6) | — | — |

Navigation: **Platform · Dr.T AI · Solutions · Packages · Security** + persistent **Book a demo** (filled) and **Request pricing** (outline → `/packages`). Mobile: hamburger menu with all items + both CTAs.

## 4. Homepage sections (top to bottom)

1. **Hero** — "The operating system for integrative wellness clinics" formula, product dashboard mock, compliance chips, dual CTA.
2. **Trust strip** — verified integration logos only (Terra, Ultrahuman, OpenAI, Stripe, AWS, Azure AD, Twilio, Interakt, Brevo, Firebase…).
3. **Problem** — "Clinics stitch together seven tools" 3-card section.
4. **Replace your stack** — point-tool chips → one platform diagram.
5. **Platform pillars** — 4 cards (unified record / multi-vendor data / AI insights / role-based workflows).
6. **DSC methodology** — the 7-layer Diamond System of Care ladder diagram: Chex + labs + wearables + genomics → layer scores → healing plan. One of the two motion budgets.
7. **Tabbed module showcase** — Assessments · Labs & Genomics · Wearables · Dr.T AI · Bookings & CRM · Client Portal; one strong mock per tab (no repeated vitals mocks).
8. **Client experience** — portal + mobile app + Wellness Companion + meal-photo logging + family accounts; phone + desktop mocks.
9. **Stats band** — real numbers only (e.g. 30+ assessment types; ~30 roles; 15+ integrations; 100% audit-logged PHI access; 115 functional markers + 33 labs + ~170 genomic traits scored).
10. **Roles grid** — ~8 role cards + "more".
11. **Compliance** — 6 cards + link to `/security`.
12. **Packages teaser** — 3 package cards + "Build your own" card → `/build`.
13. **How it works + final CTA** — 3 steps + the "bring your lab vendor list… one real patient scenario" demo framing, pointing at `/contact`.

## 5. Package builder (`/build`)

Multi-step wizard with a persistent configuration rail (desktop right rail; mobile collapsible sheet). Client component; state in React + URL-encoded shareable config (base64 query param); optionally mirrored to localStorage.

- **Step 1 — Your organization:** org type, number of sites, practitioner band, current tools (optional chips). Pre-selects a recommended starting package (advisory).
- **Step 2 — Modules:** six module cards toggled on/off; always-included base items shown non-toggleable; dependency logic (e.g. Dr.T auto-includes Assessments with friendly copy).
- **Step 3 — Integrations & add-ons:** wearables, LIMS, WhatsApp, email marketing, payments, SSO, "another system?" free text.
- **Step 4 — Customization:** custom Chex forms, white-label/embedded wizards, data migration, custom reports, training, hosting requirements, free-text.
- **Step 5 — Review & request:** full configuration summary + contact fields; submit posts to `/api/lead`; confirmation screen restates the configuration and next steps ("review within one business day").

Rules: no prices, no fake estimates; escape hatch to `/contact` on every step; every step completion is instrumentable.

## 6. Lead intake (`/api/lead`)

- Accepts JSON: `{ source: 'demo' | 'pricing' | 'builder' | 'security-pack', contact: {...}, payload: {...} }`.
- Validates (zod), rejects malformed input with field errors.
- Emails a formatted summary to a configured address. Transport: Resend if `RESEND_API_KEY` set, else SMTP via nodemailer envs, else logs to console (dev fallback) and still returns success in dev.
- Logs every submission server-side. Payload shape is stable so a later forwarder can post it into the WIMS CRM without frontend changes.

## 7. Design language

Port the proposed vercel.app site's system (review verdict: keep it): warm paper ground, deep clinical green accent, characterful display face with italic serif accent word, product-mock-driven sections, generous whitespace, no stock photography. Motion only in the hero dashboard and the DSC ladder; respect `prefers-reduced-motion`. All mock UI built as reusable components (`components/mocks/`).

## 8. Accuracy rules (hard constraints)

- Never mention: Quest, LabCorp, Zenoti, "GPT-4o" (or any model version).
- AI naming: **Dr.T Copilot** (clinician) and **Wellness Companion** (client) only.
- AI claims phrased as consent-gated, clinician-approved, enabled per customer after BAA/DPA.
- Logo: "W" mark (simple SVG), brand spelled **WIMS 360**.
- Phone: 04 581 7100 (from current site) as placeholder pending confirmation.
- No testimonials until a real, named, permissioned quote exists (component scaffolded but not rendered).
- Stats must be true of the product (source: platform inventory).

## 9. Project structure

```
wims360-website/
  app/                 # App Router pages + /api/lead
  components/          # layout/ (Header, Footer, MobileNav), ui/ (Section, Eyebrow, CTA, Card),
                       # mocks/ (DashboardMock, ExamCatalog, LadderDiagram, ...), builder/
  content/             # modules.ts, packages.ts, roles.ts, exams.ts, integrations.ts,
                       # solutions.ts, faq.ts, stats.ts
  lib/                 # builder state/dependency logic, lead schema, mailer
  docs/superpowers/    # specs + plans
```

## 10. Verification

- `tsc --noEmit` and `next build` pass.
- Vitest unit tests: builder dependency/state logic; lead API schema validation.
- Manual browser walkthrough of every page at 1440px and 390px widths; no horizontal scroll; mobile nav works; every footer link resolves.

## 11. Out of scope (v1)

Interactive product tour, resources hub, calculators, live counters, real screenshots, direct CRM integration, analytics tooling, dark mode, i18n, CMS.
