import type { ModuleId } from './modules';

export type PackageId = 'essentials' | 'clinical' | 'precision';

export interface Package {
  id: PackageId;
  name: string;
  audience: string;
  summary: string;
  /** Human-readable bullets, derived from the module catalog. */
  includes: string[];
  moduleIds: ModuleId[];
}

/** The six platform-baseline modules, included in every package. */
const BASELINE: ModuleId[] = [
  'roles-permissions',
  'security-consent-audit',
  'documents',
  'dashboards-reporting',
  'multi-centre',
  'integrations',
];

const ESSENTIALS_MODULES: ModuleId[] = [
  'client-records',
  'assessment-forms',
  'bookings',
  'reminders',
  'chat',
  'client-portal',
  ...BASELINE,
];

const CLINICAL_MODULES: ModuleId[] = [
  'client-records',
  'assessment-forms',
  'clinical-examinations',
  'lab-orders',
  'routine-lab-reports',
  'specialty-reports',
  'compare-over-time',
  'wizards',
  'healing-plans',
  'nutrition',
  'supplementation',
  'medication',
  'therapies',
  'consultations',
  'wearables',
  'health-metrics',
  'lifestyle-tracking',
  'bookings',
  'reminders',
  'chat',
  'messaging',
  'campaigns',
  'events',
  'crm',
  'client-portal',
  'shop-orders',
  ...BASELINE,
];

const PRECISION_MODULES: ModuleId[] = [
  'client-records',
  'assessment-forms',
  'clinical-examinations',
  'lab-orders',
  'routine-lab-reports',
  'specialty-reports',
  'genetics',
  'radiology',
  'dynamic-analysis',
  'compare-over-time',
  'wizards',
  'healing-plans',
  'nutrition',
  'supplementation',
  'medication',
  'therapies',
  'consultations',
  'wearables',
  'health-metrics',
  'lifestyle-tracking',
  'bookings',
  'reminders',
  'chat',
  'messaging',
  'campaigns',
  'events',
  'crm',
  'client-portal',
  'shop-orders',
  'learn',
  'support-desk',
  'drt-ai',
  'wellness-companion',
  ...BASELINE,
];

export const PACKAGES: Package[] = [
  {
    id: 'essentials',
    name: 'Essentials',
    audience: 'Practices starting their digital transformation',
    summary:
      'Build the foundation. The client record, the calendar and the client relationship in one connected platform, with the security, roles and reporting baseline included from day one.',
    includes: [
      'Client records & history',
      'Assessment forms',
      'Bookings & scheduling',
      'Reminders',
      'Secure chat',
      'Client portal & mobile app',
      'Roles & permissions',
      'Security, consent & audit',
      'Documents & records',
      'Dashboards & reporting',
      'Multi-centre support',
      'Integrations & connectivity',
    ],
    moduleIds: ESSENTIALS_MODULES,
  },
  {
    id: 'clinical',
    name: 'Clinical',
    audience: 'Established longevity & wellness practices',
    summary:
      'Go deeper into investigations and client management. Everything in Essentials, plus clinical examinations, laboratory work, personalised healing plans, live health data and the engagement side of the practice.',
    includes: [
      'Everything in Essentials',
      'Clinical examinations',
      'Laboratory orders & results',
      'Routine lab reports & specialty reports',
      'Compare over time & guided wizards',
      'Healing plans, nutrition, supplementation, medication & therapies',
      'Consultations & clinical notes',
      'Wearables, health metrics & lifestyle tracking',
      'Email, SMS & WhatsApp messaging',
      'Campaigns, events & CRM',
      'Shop, orders & credits',
    ],
    moduleIds: CLINICAL_MODULES,
  },
  {
    id: 'precision',
    name: 'Precision',
    audience: 'Longevity programmes & multi-centre organisations',
    summary:
      'Bring intelligence, genomics and advanced care together. Everything in Clinical, plus genetics, radiology, dynamic analysis, Dr.T AI and the Wellness Companion — with training and an internal support desk for a group running several locations.',
    includes: [
      'Everything in Clinical',
      'Genetics & genomics',
      'Radiology & diagnostic records',
      'Dynamic analysis',
      'Dr.T AI across the client record',
      'Wellness Companion in the client portal',
      'Learn — staff and client training',
      'Support desk',
    ],
    moduleIds: PRECISION_MODULES,
  },
];

export interface ComparisonRow {
  group: string;
  feature: string;
  tiers: Record<PackageId, boolean | string>;
}

const IN_ALL = { essentials: true, clinical: true, precision: true } as const;
const FROM_CLINICAL = {
  essentials: false,
  clinical: true,
  precision: true,
} as const;
const PRECISION_ONLY = {
  essentials: false,
  clinical: false,
  precision: true,
} as const;

/**
 * One row per selectable module plus the six platform-baseline rows. Row
 * truthiness always matches `Module.includedIn` in `content/modules.ts`.
 */
export const COMPARISON: ComparisonRow[] = [
  // ── Investigations ────────────────────────────────────────────────────
  {
    group: 'Investigations',
    feature: 'Client records & history',
    tiers: { ...IN_ALL },
  },
  {
    group: 'Investigations',
    feature: 'Assessment forms (self-reported)',
    tiers: { ...IN_ALL },
  },
  {
    group: 'Investigations',
    feature: 'Clinical examinations',
    tiers: { ...FROM_CLINICAL },
  },
  {
    group: 'Investigations',
    feature: 'Laboratory orders & results',
    tiers: { ...FROM_CLINICAL },
  },
  {
    group: 'Investigations',
    feature: 'Routine lab reports',
    tiers: { ...FROM_CLINICAL },
  },
  {
    group: 'Investigations',
    feature: 'Specialty reports',
    tiers: { ...FROM_CLINICAL },
  },
  {
    group: 'Investigations',
    feature: 'Genetics & genomics',
    tiers: { ...PRECISION_ONLY },
  },
  {
    group: 'Investigations',
    feature: 'Radiology & diagnostic records',
    tiers: { ...PRECISION_ONLY },
  },
  {
    group: 'Investigations',
    feature: 'Dynamic analysis',
    tiers: { ...PRECISION_ONLY },
  },
  {
    group: 'Investigations',
    feature: 'Compare over time',
    tiers: {
      essentials: false,
      clinical: 'Assessments & reports',
      precision: 'All investigations',
    },
  },
  {
    group: 'Investigations',
    feature: 'Guided wizards',
    tiers: { ...FROM_CLINICAL },
  },

  // ── Healing ───────────────────────────────────────────────────────────
  { group: 'Healing', feature: 'Healing plans', tiers: { ...FROM_CLINICAL } },
  {
    group: 'Healing',
    feature: 'Nutrition & meal planning',
    tiers: { ...FROM_CLINICAL },
  },
  { group: 'Healing', feature: 'Supplementation', tiers: { ...FROM_CLINICAL } },
  {
    group: 'Healing',
    feature: 'Medication & prescriptions',
    tiers: { ...FROM_CLINICAL },
  },
  { group: 'Healing', feature: 'Therapies', tiers: { ...FROM_CLINICAL } },
  {
    group: 'Healing',
    feature: 'Consultations & clinical notes',
    tiers: { ...FROM_CLINICAL },
  },

  // ── Live ──────────────────────────────────────────────────────────────
  {
    group: 'Live',
    feature: 'Wearables & device connectivity',
    tiers: { ...FROM_CLINICAL },
  },
  {
    group: 'Live',
    feature: 'Health metrics & vitals',
    tiers: { ...FROM_CLINICAL },
  },
  {
    group: 'Live',
    feature: 'Lifestyle tracking',
    tiers: { ...FROM_CLINICAL },
  },

  // ── Communication & Engagement ────────────────────────────────────────
  {
    group: 'Communication & Engagement',
    feature: 'Bookings & scheduling',
    tiers: { ...IN_ALL },
  },
  {
    group: 'Communication & Engagement',
    feature: 'Reminders',
    tiers: {
      essentials: 'Email',
      clinical: 'Email, SMS & WhatsApp',
      precision: 'Email, SMS & WhatsApp',
    },
  },
  {
    group: 'Communication & Engagement',
    feature: 'Secure chat',
    tiers: { ...IN_ALL },
  },
  {
    group: 'Communication & Engagement',
    feature: 'Email, SMS & WhatsApp messaging',
    tiers: { ...FROM_CLINICAL },
  },
  {
    group: 'Communication & Engagement',
    feature: 'Campaigns',
    tiers: { ...FROM_CLINICAL },
  },
  {
    group: 'Communication & Engagement',
    feature: 'Events',
    tiers: { ...FROM_CLINICAL },
  },
  {
    group: 'Communication & Engagement',
    feature: 'CRM & lead management',
    tiers: { ...FROM_CLINICAL },
  },
  {
    group: 'Communication & Engagement',
    feature: 'Client portal & mobile app',
    tiers: {
      essentials: 'Reports, plans & messages',
      clinical: 'Adds live data & tracking',
      precision: 'Adds Wellness Companion',
    },
  },
  {
    group: 'Communication & Engagement',
    feature: 'Shop, orders & credits',
    tiers: { ...FROM_CLINICAL },
  },
  {
    group: 'Communication & Engagement',
    feature: 'Learn — staff & client training',
    tiers: { ...PRECISION_ONLY },
  },
  {
    group: 'Communication & Engagement',
    feature: 'Support desk',
    tiers: { ...PRECISION_ONLY },
  },

  // ── Intelligence ──────────────────────────────────────────────────────
  {
    group: 'Intelligence',
    feature: 'Dr.T AI across the client record',
    tiers: {
      essentials: false,
      clinical: false,
      precision: 'Subject to consent & review',
    },
  },
  {
    group: 'Intelligence',
    feature: 'Wellness Companion',
    tiers: {
      essentials: false,
      clinical: false,
      precision: 'Subject to consent',
    },
  },

  // ── Platform baseline ─────────────────────────────────────────────────
  {
    group: 'Platform',
    feature: 'Roles & permissions',
    tiers: { ...IN_ALL },
  },
  {
    group: 'Platform',
    feature: 'Security, consent & audit',
    tiers: { ...IN_ALL },
  },
  {
    group: 'Platform',
    feature: 'Documents & records',
    tiers: { ...IN_ALL },
  },
  {
    group: 'Platform',
    feature: 'Dashboards & reporting',
    tiers: {
      essentials: 'Core dashboards',
      clinical: 'Clinical & operational',
      precision: 'Group-wide reporting',
    },
  },
  {
    group: 'Platform',
    feature: 'Multi-centre / multi-location',
    tiers: { ...IN_ALL },
  },
  {
    group: 'Platform',
    feature: 'Integrations & connectivity',
    tiers: { ...IN_ALL },
  },
  {
    group: 'Platform',
    feature: 'Data migration from your current tools',
    tiers: {
      essentials: 'On request',
      clinical: 'On request',
      precision: 'Included in onboarding',
    },
  },
];
