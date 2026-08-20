import type { ModuleId } from './modules';

export type PackageId = 'essentials' | 'clinical' | 'precision';

export interface Package {
  id: PackageId;
  name: string;
  audience: string;
  summary: string;
  includes: string[];
  moduleIds: ModuleId[];
}

export const PACKAGES: Package[] = [
  {
    id: 'essentials',
    name: 'Essentials',
    audience: 'Single-site clinics starting out',
    summary:
      'The record, the calendar and the client relationship in one system. Enough structure to retire the spreadsheet and the shared inbox, without asking a small team to run a laboratory.',
    includes: [
      'Bookings & scheduling',
      'Client records',
      'Core intake Chex forms',
      'Client portal & mobile app',
      'Document hub',
      'Secure messaging',
      'Dashboards',
      'Compliance layer',
    ],
    moduleIds: ['bookings', 'portal'],
  },
  {
    id: 'clinical',
    name: 'Clinical',
    audience: 'Established integrative & functional practices',
    summary:
      'Everything in Essentials, plus the full assessment catalog, lab work and the growth side of the clinic. This is the package for a practice already ordering panels and tracking clients over months.',
    includes: [
      'Everything in Essentials',
      'Full examination catalog',
      'Specialty reports with compare-over-time',
      'Lab orders & partner-lab workflow',
      'Wearables (Terra + Ultrahuman)',
      'CRM & campaigns',
      'Operational reports',
    ],
    moduleIds: ['bookings', 'portal', 'assessments', 'labs', 'crm'],
  },
  {
    id: 'precision',
    name: 'Precision',
    audience: 'Longevity programs & multi-center organizations',
    summary:
      'Everything in Clinical, plus Dr.T AI, genomics, laboratory integration and the tooling a group needs to run several centers under one governance model.',
    includes: [
      'Everything in Clinical',
      'Dr.T Copilot (all five loops)',
      'Wellness Companion',
      'Healing prescriptions',
      'Genomics (NIMVS, LPG-GX)',
      'Bidirectional LIMS integration',
      'Multi-center management',
      'Support desk',
      'Staff training LMS',
      'Embeddable wizards',
    ],
    moduleIds: ['bookings', 'portal', 'assessments', 'labs', 'crm', 'ai'],
  },
];

export interface ComparisonRow {
  group: string;
  feature: string;
  tiers: Record<PackageId, boolean | string>;
}

export const COMPARISON: ComparisonRow[] = [
  // Assessments (Chex)
  {
    group: 'Assessments (Chex)',
    feature: 'Core intake Chex forms (History, Me, Life)',
    tiers: { essentials: true, clinical: true, precision: true },
  },
  {
    group: 'Assessments (Chex)',
    feature: 'Full examination catalog (30+ assessment types)',
    tiers: { essentials: false, clinical: true, precision: true },
  },
  {
    group: 'Assessments (Chex)',
    feature: 'Specialty reports as branded PDFs',
    tiers: { essentials: false, clinical: true, precision: true },
  },
  {
    group: 'Assessments (Chex)',
    feature: 'Compare a report against any earlier date',
    tiers: { essentials: false, clinical: true, precision: true },
  },
  {
    group: 'Assessments (Chex)',
    feature: 'Diamond System of Care ladder scoring (7 layers)',
    tiers: { essentials: false, clinical: true, precision: true },
  },

  // Labs, Genomics & Diagnostics
  {
    group: 'Labs, Genomics & Diagnostics',
    feature: 'Lab orders raised from the client record',
    tiers: { essentials: false, clinical: true, precision: true },
  },
  {
    group: 'Labs, Genomics & Diagnostics',
    feature: 'Partner-lab portal with barcode sample workflow',
    tiers: { essentials: false, clinical: true, precision: true },
  },
  {
    group: 'Labs, Genomics & Diagnostics',
    feature: 'Functional marker library (115 markers, 33 panels)',
    tiers: { essentials: false, clinical: true, precision: true },
  },
  {
    group: 'Labs, Genomics & Diagnostics',
    feature: 'Genomics scoring (NIMVS, LPG-GX)',
    tiers: { essentials: false, clinical: false, precision: true },
  },
  {
    group: 'Labs, Genomics & Diagnostics',
    feature: 'Bidirectional LIMS integration',
    tiers: { essentials: false, clinical: false, precision: true },
  },

  // Dr.T AI
  {
    group: 'Dr.T AI',
    feature: 'Dr.T Copilot — all five clinical loops',
    tiers: { essentials: false, clinical: false, precision: true },
  },
  {
    group: 'Dr.T AI',
    feature: 'Wellness Companion in the client portal',
    tiers: { essentials: false, clinical: false, precision: true },
  },
  {
    group: 'Dr.T AI',
    feature: 'Healing prescriptions drafted for clinician review',
    tiers: { essentials: false, clinical: false, precision: true },
  },
  {
    group: 'Dr.T AI',
    feature: 'AI enablement',
    tiers: {
      essentials: 'Not included',
      clinical: 'Not included',
      precision: 'After BAA / DPA',
    },
  },

  // Bookings & Scheduling
  {
    group: 'Bookings & Scheduling',
    feature: 'Practitioner, room and service calendars',
    tiers: { essentials: true, clinical: true, precision: true },
  },
  {
    group: 'Bookings & Scheduling',
    feature: 'Online booking links and guest booking',
    tiers: { essentials: true, clinical: true, precision: true },
  },
  {
    group: 'Bookings & Scheduling',
    feature: 'Automated appointment reminders',
    tiers: {
      essentials: 'Email',
      clinical: 'Email, SMS, WhatsApp',
      precision: 'Email, SMS, WhatsApp',
    },
  },
  {
    group: 'Bookings & Scheduling',
    feature: 'Booking KPIs (utilization, no-show rate, load)',
    tiers: { essentials: false, clinical: true, precision: true },
  },
  {
    group: 'Bookings & Scheduling',
    feature: 'Scheduling across multiple centers',
    tiers: { essentials: false, clinical: false, precision: true },
  },

  // CRM & Growth
  {
    group: 'CRM & Growth',
    feature: 'Lead pipeline from enquiry to active programme',
    tiers: { essentials: false, clinical: true, precision: true },
  },
  {
    group: 'CRM & Growth',
    feature: 'Email and WhatsApp campaigns with opt-in state',
    tiers: { essentials: false, clinical: true, precision: true },
  },
  {
    group: 'CRM & Growth',
    feature: 'Clinic dashboards',
    tiers: { essentials: true, clinical: true, precision: true },
  },
  {
    group: 'CRM & Growth',
    feature: 'Operational reports (conversion, revenue mix, load)',
    tiers: { essentials: false, clinical: true, precision: true },
  },
  {
    group: 'CRM & Growth',
    feature: 'Support desk for internal help queues',
    tiers: { essentials: false, clinical: false, precision: true },
  },
  {
    group: 'CRM & Growth',
    feature: 'Embeddable wizards and white-label surfaces',
    tiers: { essentials: false, clinical: false, precision: true },
  },

  // Client Portal & Mobile
  {
    group: 'Client Portal & Mobile',
    feature: 'Client portal and mobile app',
    tiers: { essentials: true, clinical: true, precision: true },
  },
  {
    group: 'Client Portal & Mobile',
    feature: 'Document hub with signed, short-lived file access',
    tiers: { essentials: true, clinical: true, precision: true },
  },
  {
    group: 'Client Portal & Mobile',
    feature: 'Secure messaging with the care team',
    tiers: { essentials: true, clinical: true, precision: true },
  },
  {
    group: 'Client Portal & Mobile',
    feature: 'Wearable connections',
    tiers: {
      essentials: false,
      clinical: 'Terra + Ultrahuman',
      precision: 'Terra + Ultrahuman',
    },
  },
  {
    group: 'Client Portal & Mobile',
    feature: 'Meal-photo logging and habit check-ins',
    tiers: { essentials: false, clinical: false, precision: true },
  },

  // Platform & compliance
  {
    group: 'Platform & compliance',
    feature: 'Unified client record and timeline',
    tiers: { essentials: true, clinical: true, precision: true },
  },
  {
    group: 'Platform & compliance',
    feature: 'Family and dependent profiles',
    tiers: { essentials: true, clinical: true, precision: true },
  },
  {
    group: 'Platform & compliance',
    feature: 'Audit-logged PHI access with actor and timestamp',
    tiers: { essentials: true, clinical: true, precision: true },
  },
  {
    group: 'Platform & compliance',
    feature: 'Versioned consent registry with revocation',
    tiers: { essentials: true, clinical: true, precision: true },
  },
  {
    group: 'Platform & compliance',
    feature: 'Enforced two-factor authentication for PHI roles',
    tiers: { essentials: true, clinical: true, precision: true },
  },
  {
    group: 'Platform & compliance',
    feature: 'Single sign-on (Azure AD)',
    tiers: { essentials: false, clinical: true, precision: true },
  },
  {
    group: 'Platform & compliance',
    feature: 'Retention windows and right-to-erasure workflows',
    tiers: { essentials: true, clinical: true, precision: true },
  },
  {
    group: 'Platform & compliance',
    feature: 'Role library',
    tiers: {
      essentials: 'Core roles',
      clinical: '14 clinical roles',
      precision: '14 roles + custom scopes',
    },
  },
  {
    group: 'Platform & compliance',
    feature: 'Multi-center management and HQ reporting',
    tiers: { essentials: false, clinical: false, precision: true },
  },
  {
    group: 'Platform & compliance',
    feature: 'Staff training LMS',
    tiers: { essentials: false, clinical: false, precision: true },
  },
  {
    group: 'Platform & compliance',
    feature: 'Data migration from your current tools',
    tiers: {
      essentials: 'On request',
      clinical: 'On request',
      precision: 'Included in onboarding',
    },
  },
];
