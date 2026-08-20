# WIMS 360 Marketing Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the full 8-page WIMS 360 marketing website (Next.js App Router + Tailwind) with packages page, 5-step custom package builder, and email-based lead intake, per `docs/superpowers/specs/2026-08-20-marketing-website-design.md`.

**Architecture:** Statically generated marketing pages composed from a shared design system and typed content modules in `content/`; one dynamic API route (`/api/lead`) for all form submissions; the package builder is a client component whose pure state/dependency logic lives in `lib/builder.ts` (unit-tested), with UI on top.

**Tech Stack:** Next.js 15 (App Router, TypeScript), Tailwind CSS, zod (validation), nodemailer (SMTP fallback) / Resend (if key present), Vitest (unit tests).

## Global Constraints

- Folder: `C:\xampp\htdocs\wims360-website` (own git repo, already initialized; spec committed).
- NEVER mention: Quest, LabCorp, Zenoti, "GPT-4o" or any AI model version.
- AI names: **Dr.T Copilot** (clinician), **Wellness Companion** (client). AI copy must say consent-gated, clinician-approved, enabled per customer after BAA/DPA.
- Brand: "WIMS 360" in prose, "WIMS<span>360</span>" wordmark; "W" SVG logo mark. Phone: 04 581 7100. Email: info@wims360.com. Address: Dubai Science Park, Warehouse Complex B12.
- No prices anywhere. No testimonials rendered (component may exist unused).
- No stock photos; all visuals are built product mocks / diagrams.
- Design tokens (CSS vars in `app/globals.css`): `--bg:#F7F6F1` (warm paper), `--surface:#FFFFFF`, `--ink:#182420`, `--muted:#5A6B62`, `--line:#E2E5DD`, `--green:#0E6B4E`, `--green-deep:#0A3D2E`, `--green-soft:#E4EFE8`, `--amber:#96661D`. Fonts via `next/font/google`: **Bricolage Grotesque** (display, var `--font-display`), **IBM Plex Sans** (body, var `--font-body`), **IBM Plex Mono** (labels, var `--font-mono`). Italic accent words in headlines use `font-serif italic` (Georgia stack) matching the proposed site's flourish.
- Every page: light theme, no horizontal scroll at 390px, working mobile nav, all footer links resolve.
- Motion only: hero dashboard subtle pulse + DSC ladder flow animation; both behind `motion-safe:`.
- Commit after every task with `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.
- Content facts must match the spec §4/§8 (stats, module lists, exam catalog, roles).

---

### Task 1: Project scaffold + design tokens

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `.gitignore`, `app/layout.tsx`, `app/globals.css`, `app/page.tsx` (placeholder), `vitest.config.ts`, `.env.example`

**Interfaces:**
- Produces: root layout exporting fonts as CSS vars `--font-display`, `--font-body`, `--font-mono`; global CSS classes `eyebrow`, `container-site` (max-w-[1200px] mx-auto px-6); token vars listed in Global Constraints.

- [ ] **Step 1: Scaffold manually** (avoids create-next-app interactivity). `package.json`:

```json
{
  "name": "wims360-website",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "typecheck": "tsc --noEmit",
    "test": "vitest run"
  },
  "dependencies": {
    "next": "^15.4.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "zod": "^3.23.0",
    "nodemailer": "^6.9.0"
  },
  "devDependencies": {
    "@types/node": "^22",
    "@types/react": "^19",
    "@types/nodemailer": "^6.4.0",
    "typescript": "^5.6.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "vitest": "^2.1.0"
  }
}
```

Use Tailwind v3 (team-familiar) with `tailwind.config.ts` extending colors from CSS vars (`bg: 'var(--bg)'` etc.) and fontFamily display/body/mono from the font vars. `npm install`.

- [ ] **Step 2: Root layout** — `app/layout.tsx` loads the three Google fonts via `next/font/google`, sets `<html lang="en">`, metadata (`title: { default: 'WIMS 360 — The operating system for integrative wellness clinics', template: '%s · WIMS 360' }`, description, OpenGraph), body classes `bg-bg text-ink font-body`.
- [ ] **Step 3: globals.css** — Tailwind directives + `:root` token block from Global Constraints + `.eyebrow { font-family:var(--font-mono); font-size:.72rem; letter-spacing:.14em; text-transform:uppercase; color:var(--green); }` + `.container-site`.
- [ ] **Step 4: Verify** — `npm run dev` serves placeholder page with tokens applied; `npm run typecheck` passes.
- [ ] **Step 5: Commit** `chore: scaffold Next.js project with WIMS design tokens`

### Task 2: Design system + site chrome

**Files:**
- Create: `components/ui/Section.tsx`, `components/ui/Eyebrow.tsx`, `components/ui/Button.tsx`, `components/ui/Card.tsx`, `components/ui/Chip.tsx`, `components/layout/Logo.tsx`, `components/layout/Header.tsx`, `components/layout/MobileNav.tsx`, `components/layout/Footer.tsx`, `components/ui/CtaBand.tsx`
- Modify: `app/layout.tsx` (mount Header/Footer)

**Interfaces:**
- Produces: `<Section id? eyebrow? title? intro? children>`; `<Button href variant="primary"|"outline"|"ghost" size?>`; `<Card>`; `<Chip tone="green"|"neutral"|"amber">`; `<CtaBand title body primary={{label,href}} secondary?>` (the reusable end-of-page demo band); Header nav items: Platform `/platform`, Dr.T AI `/ai`, Solutions `/solutions/wellness-clinics`, Packages `/packages`, Security `/security`; CTAs: "Request pricing" (outline → `/packages`), "Book a demo" (primary → `/contact`).

- [ ] **Step 1: Logo** — inline SVG "W" mark: rounded-square `fill:var(--green-deep)`, white geometric W path (three strokes), beside wordmark `WIMS<span class="text-green">360</span>` in display font.
- [ ] **Step 2: Header** — sticky, `bg-bg/90 backdrop-blur border-b border-line`; desktop nav center, CTAs right; `MobileNav` client component with hamburger toggling a full-width panel listing nav + both CTAs (visible < md).
- [ ] **Step 3: Footer** — 4 columns: brand blurb; Platform links (Platform, Dr.T AI, Packages, Build a package); Company (Security, Contact, Privacy, Terms); Contact (address, `tel:045817100`, `mailto:info@wims360.com`). Every href must exist by Task 14 — no dead links.
- [ ] **Step 4: CtaBand** — deep-green rounded panel, display headline with italic accent word, used by every page; default copy: title "See WIMS 360 with your *own* workflow.", body "A 20-minute live walkthrough. Bring your lab vendor list, your current booking flow, and one real patient scenario — we'll show it running in WIMS."
- [ ] **Step 5: Verify** in browser at 1440px and 390px (hamburger works). `npm run typecheck`.
- [ ] **Step 6: Commit** `feat: design system primitives and site chrome`

### Task 3: Content data layer

**Files:**
- Create: `content/modules.ts`, `content/packages.ts`, `content/exams.ts`, `content/roles.ts`, `content/integrations.ts`, `content/stats.ts`, `content/solutions.ts`, `content/faq.ts`, `content/compliance.ts`

**Interfaces:**
- Produces (exact types consumed by all page tasks and the builder):

```ts
// content/modules.ts
export type ModuleId = 'assessments' | 'labs' | 'ai' | 'bookings' | 'crm' | 'portal';
export interface Module { id: ModuleId; name: string; half: 'clinical' | 'operations';
  tagline: string; description: string; bullets: string[]; includedIn: PackageId[]; }
export const MODULES: Module[];
export const LAYERS: { name: string; description: string }[]; // Wearables ingestion, Reports & Analytics, Security & Compliance, Integrations

// content/packages.ts
export type PackageId = 'essentials' | 'clinical' | 'precision';
export interface Package { id: PackageId; name: string; audience: string; summary: string;
  includes: string[]; moduleIds: ModuleId[]; }
export const PACKAGES: Package[];
export interface ComparisonRow { group: string; feature: string; tiers: Record<PackageId, boolean | string>; }
export const COMPARISON: ComparisonRow[]; // ~35 rows grouped by the six modules + layers

// content/integrations.ts
export interface Integration { name: string; category: 'wearables'|'labs'|'comms'|'payments'|'auth'|'infra'; note: string; builderSelectable: boolean; }
export const INTEGRATIONS: Integration[]; // Terra, Ultrahuman, OpenAI, Stripe, AWS S3, Azure AD SSO, Firebase, Twilio, Interakt (WhatsApp), Brevo, iCal, LIMS API
```

- [ ] **Step 1: Write all nine content files** with real copy sourced from the spec: package contents from spec §3 packages row + review §11; exam catalog (20 chips, 6 categories: METABOLIC RMR/VO₂ Max; CARDIO ECG/Cardiometabolic; MOVEMENT Physical/Performance; COGNITIVE Brain/Mind/Cognition; RESPIRATORY Breath/Sleep; BODY Body Comp/MSK/Radiology; POC Zinc Taste/Saliva pH; GUT Gut Chex; NUTRITION NutriChex; + "your own"); 14 clinical roles with one-line scopes; stats: `30+ assessment types`, `14 clinical roles`, `15+ live integrations`, `100% audit-logged PHI access`; solutions content for the four buyer slugs; packages FAQ (8 Q&As: deployment, data ownership, migration, BAA/DPA process, AI enablement, white-label, multi-center, timeline); compliance six cards (Audit, Consent, Auth/2FA, Retention, Breach, Infrastructure).
- [ ] **Step 2: Verify** `npm run typecheck` passes.
- [ ] **Step 3: Commit** `feat: typed content layer for modules, packages, and site copy`

### Task 4: Lead schema, mailer, and /api/lead (TDD)

**Files:**
- Create: `lib/lead.ts`, `lib/mailer.ts`, `app/api/lead/route.ts`, `tests/lead.test.ts`

**Interfaces:**
- Produces: `leadSchema` (zod) and `type Lead`; `POST /api/lead` returning `{ ok: true }` or 422 `{ ok: false, errors }`; `sendLeadEmail(lead: Lead): Promise<void>`.

```ts
// lib/lead.ts
import { z } from 'zod';
export const leadSchema = z.object({
  source: z.enum(['demo', 'pricing', 'builder', 'security-pack']),
  contact: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().optional(),
    organization: z.string().optional(),
  }),
  message: z.string().max(4000).optional(),
  configuration: z.unknown().optional(), // builder payload, formatted by mailer
});
export type Lead = z.infer<typeof leadSchema>;
```

- [ ] **Step 1: Write failing tests** in `tests/lead.test.ts`: valid demo lead parses; missing email fails with path `contact.email`; bad source enum fails; builder lead with configuration object parses.
- [ ] **Step 2: Run** `npm test` → FAIL (module not found).
- [ ] **Step 3: Implement** `lib/lead.ts` as above. `npm test` → PASS.
- [ ] **Step 4: Mailer** — `lib/mailer.ts`: if `process.env.RESEND_API_KEY` → POST https://api.resend.com/emails; else if `SMTP_HOST` → nodemailer transport; else `console.log('[lead]', JSON.stringify(lead))`. Recipient `LEAD_TO_EMAIL ?? 'info@wims360.com'`. Renders a plain-text summary incl. pretty-printed configuration. Document all envs in `.env.example`.
- [ ] **Step 5: Route** — `app/api/lead/route.ts`: parse JSON, `leadSchema.safeParse`, 422 with flattened errors on fail, `await sendLeadEmail`, return `{ ok: true }`; wrap mailer errors → 500 `{ ok: false }` and `console.error`.
- [ ] **Step 6: Verify** `npm test`, `npm run typecheck`; curl a valid + invalid POST against `npm run dev`.
- [ ] **Step 7: Commit** `feat: lead intake API with zod validation and email delivery`

### Task 5: Product mock components

**Files:**
- Create: `components/mocks/DashboardMock.tsx` (hero: client dashboard with HRV/Sleep/Glucose stat tiles, 30-day sparkline SVG, AI-insight card, connected-devices toast; `motion-safe:animate-pulse` on the live dot), `components/mocks/ExamCatalog.tsx` (chip grid from `content/exams.ts`), `components/mocks/LadderDiagram.tsx` (DSC: left column of data-source chips [Chex forms, Lab markers, Wearables, Genomics] → 7 stacked layer bars [Diet, Sleep, Stress, Digestion, Metabolism, Toxicity, Individuality] each with a load number + green/amber dot → right output card "Healing plan"; `motion-safe` dash-flow animation on connector lines), `components/mocks/CopilotChat.tsx` (Dr.T thread: clinician question, cited answer, "Consent verified · audit-logged" footer, quick-reply chips), `components/mocks/CompanionPhone.tsx` (phone frame: Wellness Companion chat with meal-photo message "Logged: lunch · ~620 kcal · 42g protein" + confirm buttons), `components/mocks/BookingCalendar.tsx` (week grid with count badges), `components/mocks/CrmFunnel.tsx` (lead pipeline columns New/Contacted/Qualified/Converted with counts + WhatsApp/email campaign chips), `components/mocks/ReportCompare.tsx` (specialty report two-date compare bars)

**Interfaces:**
- Produces: all mocks are self-contained server components, no props required, sized to fill parent card; each has an `aria-label` describing the scene.

- [ ] **Step 1: Build the eight mocks** using tokens only (no hard-coded hex outside tokens); text content invented but product-plausible and consistent with Global Constraints (no vendor names beyond verified integrations; client name "Sarah L."; no model names).
- [ ] **Step 2: Verify** each renders on a scratch route `/dev-mocks` (delete before Task 15) at both widths.
- [ ] **Step 3: Commit** `feat: product mock components`

### Task 6: Homepage

**Files:**
- Create: `app/page.tsx` (replace placeholder), `components/home/Hero.tsx`, `components/home/TrustStrip.tsx`, `components/home/Problem.tsx`, `components/home/ReplaceStack.tsx`, `components/home/Pillars.tsx`, `components/home/Methodology.tsx`, `components/home/ModuleShowcase.tsx` (client component, tabs), `components/home/ClientExperience.tsx`, `components/home/StatsBand.tsx`, `components/home/RolesGrid.tsx`, `components/home/ComplianceGrid.tsx`, `components/home/PackagesTeaser.tsx`, `components/home/HowItWorks.tsx`

**Interfaces:**
- Consumes: all mocks (Task 5), content layer (Task 3), `Section`/`Button`/`CtaBand` (Task 2).

- [ ] **Step 1: Hero** — badge "In production across 14 clinical roles"; H1 "The operating system for *integrative* wellness clinics." (italic accent); sub: "WIMS 360 unifies assessments, bookings, wearables, labs, genomics, and consent-gated AI into one clinical record — so your team spends time on care, not on stitching systems together."; CTAs Book a demo → `/contact`, View packages → `/packages`; compliance chips (HIPAA-aligned audit logging · GDPR-ready · 2FA on PHI access); `DashboardMock` right.
- [ ] **Step 2: TrustStrip** — marquee-less static logo row of verified integrations (text chips styled as logos).
- [ ] **Step 3–4: Problem + ReplaceStack** — Problem: 3 cards (Fragmented schedules / Insights arrive late / Compliance as afterthought), copy per review. ReplaceStack: chips (intake forms · booking tool · lab portal · spreadsheet CRM · report documents · WhatsApp broadcasts · client app) with arrows converging into a single WIMS 360 card.
- [ ] **Step 5: Pillars** — 4 cards: Unified clinical record (timeline strip), Multi-vendor wearables & labs (vendor chips), Consent-gated AI (mini insight card), Role-based workflows (role chips).
- [ ] **Step 6: Methodology** — eyebrow "THE METHOD"; H2 "Software that encodes a clinical method — the Diamond System of Care."; body explaining 7 layers scored from every data source, feeding the healing plan; `LadderDiagram`.
- [ ] **Step 7: ModuleShowcase** — client tabs from `MODULES`: Assessments→`ExamCatalog`, Labs & Genomics→`ReportCompare`, Wearables→reuse `DashboardMock` (only reuse on page), Dr.T AI→`CopilotChat`, Bookings & CRM→`BookingCalendar`+`CrmFunnel`, Client portal→`CompanionPhone`. Each tab: name, 3 bullets, "Learn more" → `/platform` (or `/ai`).
- [ ] **Step 8: ClientExperience** — headline "Your clients get an app worth opening."; bullets: portal + mobile app, Wellness Companion, meal-photo logging, family accounts, online consent signing; `CompanionPhone` + small desktop portal card.
- [ ] **Step 9: Stats + Roles + Compliance + PackagesTeaser + HowItWorks** — stats from `content/stats.ts`; 8 roles + "+6 more roles" chip; compliance 6 cards + link to `/security`; teaser: three `PACKAGES` cards + dashed "Build your own" card → `/build`; HowItWorks 3 steps (Connect the stack / Shape it to your clinic / Deliver better care) + `CtaBand`.
- [ ] **Step 10: Verify** full page at 1440/390, tabs keyboard-operable, no horizontal scroll; `npm run build` passes.
- [ ] **Step 11: Commit** `feat: homepage`

### Task 7: Platform page

**Files:**
- Create: `app/platform/page.tsx`, `components/platform/ModuleDeep.tsx`

**Interfaces:**
- Consumes: `MODULES`, `LAYERS`, mocks. Produces: anchor ids `#assessments #labs #ai #bookings #crm #portal` (linked from ModuleShowcase "Learn more" and solutions pages).

- [ ] **Step 1: Build** — intro splitting the platform into "Clinical Intelligence" and "Clinic Operations" (two-column overview cards listing their three modules each); then one `ModuleDeep` section per module: eyebrow (half name), H2, description, 4–6 bullets, its mock, alternating layout; then cross-cutting layers band (4 `LAYERS` cards); integrations wall grouped by category from `INTEGRATIONS`; `CtaBand`.
- [ ] **Step 2: Verify** both widths + anchors scroll correctly. **Step 3: Commit** `feat: platform page`

### Task 8: Dr.T AI page

**Files:**
- Create: `app/ai/page.tsx`, `components/ai/LoopTabs.tsx` (client)

- [ ] **Step 1: Build** — hero: "Two AIs. One rule: clinicians stay in charge."; LoopTabs with the five loops (Ladder Chex · Health Insight · Analyze · Recommendation Plan · Case Review), each tab = plain-language description + what the clinician approves + `CopilotChat` variant text; Wellness Companion section with `CompanionPhone` and capability-boundary copy ("cannot prescribe, order, or book — by design"); governance band: consent-gated, every write clinician-approved, audit-logged, disabled until your BAA/DPA is signed; knowledge-library note (admin-curated reference library grounds answers); `CtaBand` (primary "See Dr.T in a demo" → `/contact`, secondary "Security approach" → `/security`).
- [ ] **Step 2: Verify.** **Step 3: Commit** `feat: Dr.T AI page`

### Task 9: Solutions pages

**Files:**
- Create: `app/solutions/[slug]/page.tsx` (uses `generateStaticParams` from `content/solutions.ts`), `app/solutions/page.tsx` (redirect to `/solutions/wellness-clinics`)

**Interfaces:**
- Consumes: `SOLUTIONS: { slug; name; problem; narrative; moduleIds: ModuleId[]; recommendedPackage: PackageId }[]` from Task 3.

- [ ] **Step 1: Build** the template: buyer headline + problem framing, "What you'll run in WIMS" module cards (linked to `/platform#<id>`), recommended package card → `/packages`, cross-links to sibling solutions, `CtaBand`. Four slugs: wellness-clinics, functional-medicine, labs, multi-center.
- [ ] **Step 2: Verify** all four render via static params; `npm run build`. **Step 3: Commit** `feat: solutions pages`

### Task 10: Packages page

**Files:**
- Create: `app/packages/page.tsx`, `components/packages/PackageCards.tsx`, `components/packages/ComparisonTable.tsx`, `components/packages/HowPricingWorks.tsx`, `components/packages/Faq.tsx` (client, accordion)

- [ ] **Step 1: PackageCards** — Essentials / Clinical / Precision from `PACKAGES` + Custom card; per-card CTAs: "Talk to us" → `/contact?package=<id>` and "Customize this package" → `/build?start=<id>`; Custom card CTA → `/build`.
- [ ] **Step 2: ComparisonTable** — `COMPARISON` rows grouped with group header rows; sticky header; ✓ rendered as green check, strings rendered verbatim; wrapped in `overflow-x-auto`.
- [ ] **Step 3: HowPricingWorks** — 5 explainer tiles: platform base + modules + practitioner seats + centers + one-time onboarding/migration; closing line "No public price list — every proposal is scoped to your configuration and comes back within one business day."
- [ ] **Step 4: Faq** — accordion over `content/faq.ts`.
- [ ] **Step 5: Verify** table scrolls horizontally on mobile without page scroll. **Step 6: Commit** `feat: packages page`

### Task 11: Builder logic (TDD)

**Files:**
- Create: `lib/builder.ts`, `tests/builder.test.ts`

**Interfaces:**
- Produces (consumed by Task 12):

```ts
export interface BuilderState {
  step: 1 | 2 | 3 | 4 | 5;
  org: { type: OrgType | null; sites: SiteBand | null; practitioners: PractitionerBand | null; currentTools: string[] };
  modules: ModuleId[];
  integrations: string[];      // Integration names where builderSelectable
  customizations: string[];    // ids from CUSTOMIZATIONS
  otherSystems: string;
  notes: string;
}
export type OrgType = 'wellness-clinic' | 'functional-medicine' | 'lab' | 'multi-center' | 'other';
export type SiteBand = '1' | '2-3' | '4-10' | '10+';
export type PractitionerBand = '1-5' | '6-15' | '16-50' | '50+';
export const CUSTOMIZATIONS: { id: string; label: string }[]; // custom-chex, white-label, migration, custom-reports, training, hosting
export function initialState(startPackage?: PackageId): BuilderState;   // pre-checks package moduleIds
export function recommendedPackage(org: BuilderState['org']): PackageId; // lab|multi-center→precision; functional-medicine→clinical; wellness-clinic + '1' site + '1-5'→essentials; else clinical
export function toggleModule(state: BuilderState, id: ModuleId): BuilderState; // enabling 'ai' also adds 'assessments'; removing 'assessments' while 'ai' on also removes 'ai'
export function dependencyNote(id: ModuleId, enabled: boolean): string | null; // "Dr.T reads Chex data — we've added Assessments."
export function encodeState(s: BuilderState): string;  // base64url JSON for shareable URL
export function decodeState(raw: string | null): BuilderState | null; // null on any parse/shape failure
export function toLeadConfiguration(s: BuilderState): object; // human-keyed summary object for the lead email
```

- [ ] **Step 1: Write failing tests**: `initialState('clinical')` pre-checks Clinical's modules; `recommendedPackage` for each org-type rule above; `toggleModule` AI↔assessments dependency both directions; encode→decode round-trips; `decodeState('garbage')` returns null; `toLeadConfiguration` includes org bands and module names.
- [ ] **Step 2: Run** `npm test` → FAIL. **Step 3: Implement** pure functions (no React imports). **Step 4:** `npm test` → PASS. **Step 5: Commit** `feat: package builder state logic`

### Task 12: Builder UI

**Files:**
- Create: `app/build/page.tsx` (server shell reading `?start=`/`?c=` searchParams), `components/builder/BuilderWizard.tsx` (client), `components/builder/StepOrg.tsx`, `components/builder/StepModules.tsx`, `components/builder/StepIntegrations.tsx`, `components/builder/StepCustomize.tsx`, `components/builder/StepReview.tsx`, `components/builder/SummaryRail.tsx`, `components/builder/Stepper.tsx`

**Interfaces:**
- Consumes: everything from `lib/builder.ts`, `MODULES`, `INTEGRATIONS`, `PACKAGES`; posts `{ source:'builder', contact, configuration: toLeadConfiguration(state) }` to `/api/lead`.

- [ ] **Step 1: BuilderWizard** — owns `BuilderState`; initial from `decodeState(searchParams.c) ?? initialState(searchParams.start)`; every change updates `history.replaceState` with `?c=<encodeState>`; renders `Stepper` (5 labeled steps, clickable backwards only), current step component, `SummaryRail` (desktop sticky right; mobile bottom sheet toggle) listing chosen package basis, modules, integrations, customizations, org bands, plus "Copy shareable link" button; every step shows escape hatch "Not sure? **Book a demo** and we'll configure it together" → `/contact`.
- [ ] **Step 2: Steps 1–4** — StepOrg: radio card groups for type/sites/practitioners + optional current-tool chips; shows advisory banner "Based on this, most teams start from **{recommendedPackage}**" with an Apply button (re-seeds modules). StepModules: module cards with toggle + `dependencyNote` toast inline; base-platform strip (records, portal, compliance) marked "Always included". StepIntegrations: checkbox cards from `INTEGRATIONS.filter(builderSelectable)` + "another system?" text input. StepCustomize: `CUSTOMIZATIONS` checkboxes + notes textarea.
- [ ] **Step 3: StepReview** — headline "Your WIMS 360"; configuration summary blocks; contact form (name, work email, phone optional, organization); submit → POST `/api/lead`; success screen restates config, "Our team reviews your configuration and comes back within one business day.", buttons "Book a demo now" → `/contact` and "Back to packages"; failure shows inline error and preserves state.
- [ ] **Step 4: Verify** — full flow in browser: start from `/build?start=clinical`, toggle AI (assessments auto-adds), share-link round-trip in a new tab, submit with dev mailer logging; mobile sheet works at 390px.
- [ ] **Step 5: Commit** `feat: five-step custom package builder`

### Task 13: Contact page + form wiring

**Files:**
- Create: `app/contact/page.tsx`, `components/forms/DemoForm.tsx` (client), `lib/useLeadSubmit.ts`

**Interfaces:**
- Produces: `useLeadSubmit(): { submit(lead: Lead): Promise<'ok'|'error'>, status: 'idle'|'sending'|'ok'|'error' }` (also used by StepReview — refactor StepReview to use it if Task 12 inlined fetch).

- [ ] **Step 1: DemoForm** — fields: name, work email, phone (optional), organization, org type select, "What should we show you?" textarea; reads `?package=` to pre-fill message ("Interested in the {Package} package"); source `'demo'` (or `'pricing'` when `?package=` present); client-side required checks mirroring zod; SLA line under submit: "We reply within one business day."; success panel with the demo-prep framing (bring lab vendor list, booking flow, one real patient scenario).
- [ ] **Step 2: Page** — two-column: form left; right column with contact details (phone, email, address) and "Prefer email?" mailto.
- [ ] **Step 3: Verify** submit against dev mailer (console log), invalid email shows field error. **Step 4: Commit** `feat: contact page and shared lead submission hook`

### Task 14: Security, privacy, terms

**Files:**
- Create: `app/security/page.tsx`, `app/privacy/page.tsx`, `app/terms/page.tsx`

- [ ] **Step 1: Security (Trust Center)** — sections: posture summary (HIPAA Business Associate / GDPR Processor stance); six practice cards from `content/compliance.ts` (immutable audit logs; versioned consent incl. AI consent; enforced 2FA for PHI roles + Azure AD SSO; retention & right-to-erasure workflows; 72-hour breach workflow; encrypted storage + short-TTL signed URLs); AI governance recap; "Request the DPA/BAA pack" CTA → `/contact?package=security` posting source `'security-pack'` (DemoForm maps `?package=security` → source `'security-pack'`, message pre-filled "Requesting the DPA/BAA pack"); note that detailed documentation is available under NDA.
- [ ] **Step 2: Privacy + Terms** — real minimal legal pages for the *website* (not the product): data collected (form submissions only), purpose, no ad tracking, contact for requests; terms: informational site, no warranties, IP notice, governing law UAE. Clearly dated.
- [ ] **Step 3: Verify** footer now has zero dead links (click every one). **Step 4: Commit** `feat: trust center and legal pages`

### Task 15: Final QA pass

**Files:**
- Modify: anything QA surfaces; Delete: `app/dev-mocks` scratch route.

- [ ] **Step 1:** `npm run typecheck && npm test && npm run build` — all green.
- [ ] **Step 2: Browser walkthrough** of all routes (`/`, `/platform`, `/ai`, 4 solution slugs, `/packages`, `/build`, `/contact`, `/security`, `/privacy`, `/terms`) at 1440px and 390px: no horizontal scroll, mobile nav on every page, tabs/accordion/builder keyboard-accessible, images/mocks have aria-labels.
- [ ] **Step 3: Constraint grep** — search the repo for forbidden strings (`Quest`, `LabCorp`, `Zenoti`, `GPT-4o`, `GPT-`, `testimonial` renders, `$`, price-like patterns) and fix any hit.
- [ ] **Step 4: Metadata** — per-page `export const metadata` titles/descriptions; `app/opengraph-image.png` optional skip; `robots.ts` + `sitemap.ts` listing the static routes.
- [ ] **Step 5: Commit** `chore: QA pass, sitemap, metadata` — then report readiness for Vercel deploy (envs: `LEAD_TO_EMAIL`, `RESEND_API_KEY` or SMTP vars).

---

## Self-review notes

- Spec coverage: pages §3 → Tasks 6–14; builder §5 → Tasks 11–12; lead intake §6 → Task 4 (+13); design language §7 → Tasks 1–2, 5; accuracy §8 → Global Constraints + Task 15 grep; verification §10 → Tasks 4, 11, 15. Roles grid on homepage uses 14 clinical roles (matches proposed site's credible framing) while stats cite "14 clinical roles" — consistent.
- Type consistency: `ModuleId`/`PackageId` defined once in Task 3, consumed in 10–12; `Lead` defined Task 4, consumed 12–13; `useLeadSubmit` produced in Task 13 — Task 12 may inline fetch first, refactored in Task 13 Step 1 (noted there).
