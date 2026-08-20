import type { PackageId } from './packages';

export type ModuleId =
  | 'assessments'
  | 'labs'
  | 'ai'
  | 'bookings'
  | 'crm'
  | 'portal';

export interface Module {
  id: ModuleId;
  name: string;
  half: 'clinical' | 'operations';
  tagline: string;
  description: string;
  bullets: string[];
  includedIn: PackageId[];
}

export const MODULES: Module[] = [
  {
    id: 'assessments',
    name: 'Assessments (Chex)',
    half: 'clinical',
    tagline: 'One structured record instead of thirty paper forms',
    description:
      'Chex forms are the intake and examination layer of WIMS 360. Every question a practitioner asks lands in a typed field, scores itself, and feeds the same client record. Nothing is retyped, and nothing lives in a PDF nobody can query.',
    bullets: [
      'Core intake set: HistoryChex, MeChex and LifeChex capture history, lifestyle and self-reported symptoms',
      'Examination catalog of 30+ assessment types across metabolic, cardio, movement, cognitive, respiratory and body composition work',
      'Specialty reports render as branded PDFs and compare against any earlier date',
      'The 7-layer Diamond System of Care ladder scores Diet, Sleep, Stress, Digestion, Metabolism, Toxicity and Individuality from the forms',
      'Custom Chex forms for protocols a clinic already runs on paper',
      'Every field write is audit-logged with actor and timestamp',
    ],
    includedIn: ['clinical', 'precision'],
  },
  {
    id: 'labs',
    name: 'Labs, Genomics & Diagnostics',
    half: 'clinical',
    tagline: 'Order, receive and score results without leaving the record',
    description:
      'Lab work moves through WIMS 360 end to end: the practitioner orders, the partner lab collects, results return against the same client, and markers are scored into the ladder. Genomic panels are handled the same way.',
    bullets: [
      'Lab orders raised from the client record, with a barcode workflow for sample collection',
      'Partner-lab portal for results upload, so external labs never need staff accounts',
      'Bidirectional LIMS integration for organizations running their own laboratory',
      '115 functional markers across 33 lab panels, mapped to the ladder layers',
      'Genomics scoring through NIMVS and LPG-GX, covering roughly 170 traits',
      'Every document lands in the client document hub with short-TTL signed access',
    ],
    includedIn: ['clinical', 'precision'],
  },
  {
    id: 'ai',
    name: 'Dr.T AI',
    half: 'clinical',
    tagline: 'A clinical copilot that reads the record and drafts, never decides',
    description:
      'Dr.T Copilot works inside the record a clinician already trusts. It reads assessments, labs, wearables and genomics, cites what it used, and drafts an output for review. Nothing is saved until a clinician confirms it. Dr.T is enabled per customer after a signed BAA or DPA, and only for clients whose AI consent is active.',
    bullets: [
      'Five loops: Ladder Chex, Health Insight, Analyze with Dr.T, Recommendation Plan and Case Review',
      'Every write is clinician-approved: the Copilot proposes, a person confirms, the record stores who confirmed it',
      'Consent-gated by client, with AI consent versioned and revocable at any time',
      'Wellness Companion is the separate, deliberately narrower client-facing agent in the portal',
      'Healing prescriptions drafted as editable plans across supplements, therapies, nutrition and movement',
      'Off by default. Enabled per customer after BAA or DPA, and switchable off again from settings',
    ],
    includedIn: ['precision'],
  },
  {
    id: 'bookings',
    name: 'Bookings & Scheduling',
    half: 'operations',
    tagline: 'The front desk, the calendar and the reminders in one place',
    description:
      'Scheduling in WIMS 360 knows what the appointment is for. Booking a VO₂ Max slot books the room, the equipment and the practitioner qualified to run it, then puts the resulting exam in the client record.',
    bullets: [
      'Practitioner, room and service calendars with day, week and month views',
      'Online booking links and guest booking for first-time clients',
      'Automated reminders by email, SMS and WhatsApp, with confirmation and cancellation handling',
      'Blocked time, leave and recurring availability per practitioner',
      'Booking KPIs: utilization, no-show rate and load by practitioner or center',
      'iCal feed so staff can mirror their WIMS calendar in Outlook or Google Calendar',
    ],
    includedIn: ['essentials', 'clinical', 'precision'],
  },
  {
    id: 'crm',
    name: 'CRM & Growth',
    half: 'operations',
    tagline: 'Track the enquiry, the follow-up and the programme renewal',
    description:
      'Most clinics lose revenue between the enquiry and the first appointment. The CRM keeps leads, campaigns and client communication in the same system as the clinical record, so follow-up is a task rather than a memory.',
    bullets: [
      'Lead pipeline from first enquiry through consultation to active programme',
      'Email and WhatsApp campaigns with per-client opt-in state',
      'Task assignment and follow-up reminders for the customer care team',
      'Operational reports on conversion, revenue mix, package uptake and practitioner load',
      'Client tags and segments driven by real clinical data, not a separate list',
      'Support desk for organizations running an internal help queue across centers',
    ],
    includedIn: ['clinical', 'precision'],
  },
  {
    id: 'portal',
    name: 'Client Portal & Mobile',
    half: 'operations',
    tagline: 'What the client sees between appointments',
    description:
      'The portal and mobile app give clients their own results, plans and messages, plus the wearable data they already generate. Sharing is explicit: a specialty report appears only when a clinician shares it.',
    bullets: [
      'Web portal and mobile app on the same account, with family and dependent profiles',
      'Shared reports, healing plans and appointment history in plain language',
      'Secure messaging with the care team, threaded and audit-logged',
      'Wearable connection through Terra and Ultrahuman for sleep, HRV, activity and recovery',
      'Meal-photo logging and habit check-ins through the Wellness Companion',
      'Consent centre where a client can review, grant or revoke each consent, including AI consent',
    ],
    includedIn: ['essentials', 'clinical', 'precision'],
  },
];

export const LAYERS: { name: string; description: string }[] = [
  {
    name: 'Wearables ingestion',
    description:
      'Terra and Ultrahuman feed sleep, HRV, activity, recovery and glucose signals into the same client timeline as clinical data. Gaps and device disconnects are surfaced, not hidden.',
  },
  {
    name: 'Reports & Analytics',
    description:
      'Specialty reports, ladder scores, operational dashboards and compare-over-time views are generated from the live record. A report is a view of the data, never a re-entered copy of it.',
  },
  {
    name: 'Security & Compliance',
    description:
      'Immutable audit logs, versioned consent, enforced two-factor authentication for PHI roles, retention windows and right-to-erasure workflows apply across every module.',
  },
  {
    name: 'Integrations',
    description:
      'Wearables, laboratories, messaging, payments and single sign-on connect through supported integrations. A documented LIMS API covers organizations running their own laboratory system.',
  },
];
