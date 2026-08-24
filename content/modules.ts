import type { PackageId } from './packages';

/**
 * The four pillars are the primary organising idea of the platform. Two
 * further groups sit across them: `intelligence` (Dr.T, available across the
 * whole journey) and `platform` (the baseline that ships in every package).
 */
export type PillarId =
  | 'investigations'
  | 'healing'
  | 'live'
  | 'communication';

export type ModulePillar = PillarId | 'intelligence' | 'platform';

/**
 * Every module in the catalog. The first 33 are selectable in the package
 * builder; the final six are the platform baseline and are always included.
 */
export type ModuleId =
  // Investigations
  | 'client-records'
  | 'assessment-forms'
  | 'clinical-examinations'
  | 'lab-orders'
  | 'routine-lab-reports'
  | 'specialty-reports'
  | 'genetics'
  | 'radiology'
  | 'dynamic-analysis'
  | 'compare-over-time'
  | 'wizards'
  // Healing
  | 'healing-plans'
  | 'nutrition'
  | 'supplementation'
  | 'medication'
  | 'therapies'
  | 'consultations'
  // Live
  | 'wearables'
  | 'health-metrics'
  | 'lifestyle-tracking'
  // Communication & Engagement
  | 'bookings'
  | 'reminders'
  | 'chat'
  | 'messaging'
  | 'campaigns'
  | 'events'
  | 'crm'
  | 'client-portal'
  | 'shop-orders'
  | 'learn'
  | 'support-desk'
  // Intelligence
  | 'drt-ai'
  | 'wellness-companion'
  // Platform baseline
  | 'roles-permissions'
  | 'security-consent-audit'
  | 'documents'
  | 'dashboards-reporting'
  | 'multi-centre'
  | 'integrations';

export interface Module {
  id: ModuleId;
  name: string;
  pillar: ModulePillar;
  /** One benefit-led line. */
  tagline: string;
  /** Two to three sentences. */
  description: string;
  /** Three to five capability lines. */
  bullets: string[];
  /** False for the six platform-baseline modules. */
  selectable: boolean;
  includedIn: PackageId[];
}

const ALL: PackageId[] = ['essentials', 'clinical', 'precision'];
const FROM_CLINICAL: PackageId[] = ['clinical', 'precision'];
const PRECISION_ONLY: PackageId[] = ['precision'];

export const MODULES: Module[] = [
  // ── Investigations ────────────────────────────────────────────────────
  {
    id: 'client-records',
    name: 'Client Records & History',
    pillar: 'investigations',
    tagline: 'Everything you know about a client, in one record.',
    description:
      'The client record holds the profile, the history and the care team, and gathers everything recorded across the journey into a single timeline. Discovery notes, previous care and referrals sit alongside assessments, results, plans and messages. Information is captured once and stays available to whoever is permitted to see it.',
    bullets: [
      'Client profile with contact details, identifiers and programme status',
      'Medical, family and lifestyle history captured once and updated over time',
      'Care team assignment so each client has named practitioners',
      'A chronological timeline of assessments, results, plans and conversations',
      'Family and dependent profiles for practices caring for a household',
    ],
    selectable: true,
    includedIn: ALL,
  },
  {
    id: 'assessment-forms',
    name: 'Assessment Forms',
    pillar: 'investigations',
    tagline: "The client's own account, captured as structured data.",
    description:
      'Self-reported forms cover history, lifestyle, symptoms and perceived stress. Because answers land in typed fields rather than a scanned document, they can be reviewed alongside clinical findings and compared when the same form is issued again.',
    bullets: [
      'History, lifestyle, symptom and perceived-stress questionnaires',
      'Sent ahead of an appointment or completed in the practice',
      'Answers stored as structured data, not as a flat document',
      'The same form can be re-issued later and read side by side',
      'Forms can be configured around the protocols a practice already runs',
    ],
    selectable: true,
    includedIn: ALL,
  },
  {
    id: 'clinical-examinations',
    name: 'Clinical Examinations',
    pillar: 'investigations',
    tagline: 'What you measure, recorded the same way every time.',
    description:
      'A catalogue of structured examinations covering metabolic, cardiometabolic, cognitive, sleep, gut, movement, respiratory and body composition work. Each examination records findings in defined fields, so a result from today can be read against a result from last year.',
    bullets: [
      'Metabolic, Cardiometabolic, RMR and VO₂ Max examinations',
      'Cognition, Brain, Mind, Mood and Sleep assessments',
      'Movement, Muscle, Spine and Performance examinations',
      'Gut, Breath, ECG and Body composition records',
      'Findings stored as fields, so every examination can be compared later',
    ],
    selectable: true,
    includedIn: FROM_CLINICAL,
  },
  {
    id: 'lab-orders',
    name: 'Laboratory Orders & Results',
    pillar: 'investigations',
    tagline: 'From investigation to insight without the fragmented workflow.',
    description:
      'Laboratory work can run end to end inside the record: order, sample, processing, result, review, client record. Each step is visible, so the care team can see where an investigation has reached without chasing it by email.',
    bullets: [
      'Orders raised directly from the client record',
      'Sample registration with barcode support for collection and handling',
      'Result handling and practitioner review before the client sees anything',
      'Order status visible across the care team at every stage',
      'Results filed against the same client, ready to compare over time',
    ],
    selectable: true,
    includedIn: FROM_CLINICAL,
  },
  {
    id: 'routine-lab-reports',
    name: 'Routine Lab Reports',
    pillar: 'investigations',
    tagline: 'Standard panels, read in the context of the whole record.',
    description:
      'Routine panels such as complete blood count and core bloods are recorded marker by marker rather than stored as an attachment. Values carry their reference ranges, so anything outside range is visible at a glance and can be followed across repeat tests.',
    bullets: [
      'Common panels including CBC and core blood chemistry',
      'Reference ranges held against each marker',
      'Out-of-range values surfaced for practitioner attention',
      'A history for every marker, not just the latest result',
    ],
    selectable: true,
    includedIn: FROM_CLINICAL,
  },
  {
    id: 'specialty-reports',
    name: 'Specialty Reports',
    pillar: 'investigations',
    tagline: 'Advanced panels presented in a form the client can follow.',
    description:
      'Advanced diagnostic panels are rendered as structured reports that carry the practice brand. A report is a view of the record rather than a re-typed copy of it, so what a practitioner reviews and what a client receives stay in step.',
    bullets: [
      'Advanced diagnostic report panels held against the client record',
      'Reports generated from the stored data, not re-entered',
      'Practice branding on the reports clients receive',
      'Shared to the client portal when the practitioner chooses to share it',
    ],
    selectable: true,
    includedIn: FROM_CLINICAL,
  },
  {
    id: 'genetics',
    name: 'Genetics & Genomics',
    pillar: 'investigations',
    tagline: 'Genomic findings alongside the rest of the story.',
    description:
      'Genes, variants and RSIDs are stored against the client and can be scored into the same picture as laboratory and examination findings. Genomic information is treated as one contributing source among several, not as a verdict on its own.',
    bullets: [
      'Gene, variant and RSID records held against the client',
      'Genomic scoring available for supported panels',
      'Findings readable alongside laboratory and examination results',
      'Access governed by the same roles, consent and audit rules as any record',
    ],
    selectable: true,
    includedIn: PRECISION_ONLY,
  },
  {
    id: 'radiology',
    name: 'Radiology & Diagnostic Records',
    pillar: 'investigations',
    tagline: 'Imaging kept with the record it belongs to.',
    description:
      'Ultrasound, X-ray, CT and MRI records are stored against the client with their reports and findings. Imaging stops living in a separate folder and becomes part of the same timeline as everything else.',
    bullets: [
      'Ultrasound, X-ray, CT and MRI records with their reports',
      'Imaging held on the client timeline alongside other investigations',
      'Findings recorded so they can be referenced in plans and reviews',
      'Files served through controlled, permission-checked access',
    ],
    selectable: true,
    includedIn: PRECISION_ONLY,
  },
  {
    id: 'dynamic-analysis',
    name: 'Dynamic Analysis',
    pillar: 'investigations',
    tagline: 'See how findings relate, not just what they say.',
    description:
      'Dynamic analysis maps recorded markers to pathways and contributing factors, giving the care team a structured way to look across dimensions such as diet, sleep, stress, digestion, metabolism, toxicity and individuality. The objective is not to collect more information but to help the team see which findings matter and how they relate.',
    bullets: [
      'Markers mapped to pathways and contributing factors',
      'A structured way to look across the Diamond System of Care dimensions',
      'Relationships between findings made visible to the practitioner',
      'Supports interpretation; clinical judgement stays with the care team',
    ],
    selectable: true,
    includedIn: PRECISION_ONLY,
  },
  {
    id: 'compare-over-time',
    name: 'Compare Over Time',
    pillar: 'investigations',
    tagline: 'From snapshots to a story that moves.',
    description:
      'Assessments, examinations and reports can be read against any earlier point in the journey. Progress becomes something the care team and the client can see rather than something they have to remember.',
    bullets: [
      'Compare an assessment or report against any earlier date',
      'Marker-level trends across repeated investigations',
      'Side-by-side views for review appointments',
      'Comparisons available to share with the client where appropriate',
    ],
    selectable: true,
    includedIn: FROM_CLINICAL,
  },
  {
    id: 'wizards',
    name: 'Guided Wizards',
    pillar: 'investigations',
    tagline: 'A consistent path through interpretation and planning.',
    description:
      'Guided flows walk a practitioner through interpreting findings and building a plan, step by step. They help a growing team work to the same standard without turning clinical judgement into a checkbox.',
    bullets: [
      'Structured interpretation flows over the recorded findings',
      'Plan-building steps that carry the findings through to actions',
      'Consistent process across practitioners and locations',
      'Wizards can be configured to reflect a practice’s own protocol',
    ],
    selectable: true,
    includedIn: FROM_CLINICAL,
  },

  // ── Healing ───────────────────────────────────────────────────────────
  {
    id: 'healing-plans',
    name: 'Healing Plans',
    pillar: 'healing',
    tagline: 'From findings to a personalised healing journey.',
    description:
      'A healing plan brings nutrition, supplementation, medication, therapies and lifestyle actions together in one place the client can actually follow. Plans are built from what the record already holds and can be revised as new findings arrive.',
    bullets: [
      'Structured, personalised plans built from the client’s own findings',
      'Nutrition, supplementation, medication and therapy actions in one plan',
      'Plans revised as new results and observations come in',
      'Shared to the client portal so the plan travels with the client',
      'Every version retained, so the team can see how the plan evolved',
    ],
    selectable: true,
    includedIn: FROM_CLINICAL,
  },
  {
    id: 'nutrition',
    name: 'Nutrition & Meal Planning',
    pillar: 'healing',
    tagline: 'Dietary guidance the client can act on.',
    description:
      'Nutrition guidance is written into the plan as meals, targets and practical recommendations rather than a leaflet handed over at the door. Preferences, intolerances and cultural considerations can be recorded and respected.',
    bullets: [
      'Meal plans and dietary recommendations attached to the healing plan',
      'Preferences, intolerances and restrictions held on the record',
      'Targets that can be reviewed against lifestyle tracking',
      'Guidance visible to the client between appointments',
    ],
    selectable: true,
    includedIn: FROM_CLINICAL,
  },
  {
    id: 'supplementation',
    name: 'Supplementation',
    pillar: 'healing',
    tagline: 'A clear record of what was recommended and why.',
    description:
      'Supplement recommendations are recorded with dose, timing and duration, and stay attached to the plan they belong to. The care team can see what a client is currently taking without reconstructing it from notes.',
    bullets: [
      'Recommendations recorded with dose, timing and duration',
      'A current list of what the client is taking, visible to the care team',
      'Changes tracked as the plan is reviewed',
      'Recommendations shared to the client portal',
    ],
    selectable: true,
    includedIn: FROM_CLINICAL,
  },
  {
    id: 'medication',
    name: 'Medication & Prescriptions',
    pillar: 'healing',
    tagline: 'Prescribing recorded in the same place as everything else.',
    description:
      'Medication and prescriptions are held against the client with the practitioner who issued them. Current and historic medication is available where it is needed, under the same permissions and audit rules as the rest of the record.',
    bullets: [
      'Prescriptions issued and recorded against the client record',
      'Current and historic medication lists maintained over time',
      'Issuing practitioner and date captured on every entry',
      'Access governed by role and logged like any other clinical action',
    ],
    selectable: true,
    includedIn: FROM_CLINICAL,
  },
  {
    id: 'therapies',
    name: 'Therapies',
    pillar: 'healing',
    tagline: 'Every session, prescribed and tracked to completion.',
    description:
      'Therapy programmes are prescribed as part of the plan, scheduled through the calendar and recorded session by session. Attendance and progress stay with the client record rather than in a separate register.',
    bullets: [
      'Therapy programmes prescribed as part of a healing plan',
      'Sessions scheduled through the practice calendar',
      'Session-by-session records of what was delivered',
      'Progress readable alongside examinations and results',
    ],
    selectable: true,
    includedIn: FROM_CLINICAL,
  },
  {
    id: 'consultations',
    name: 'Consultations & Clinical Notes',
    pillar: 'healing',
    tagline: 'The conversation, kept with the evidence.',
    description:
      'Consultation notes are written against the client with the findings, results and plans already in view. What was discussed, decided and recommended stays in the same record as the evidence it was based on.',
    bullets: [
      'Structured consultation notes attached to the visit and the client',
      'Findings, results and plans available while the note is written',
      'Follow-up actions carried into the plan or the calendar',
      'Notes attributed to a practitioner and retained with full history',
    ],
    selectable: true,
    includedIn: FROM_CLINICAL,
  },

  // ── Live ──────────────────────────────────────────────────────────────
  {
    id: 'wearables',
    name: 'Wearables & Device Connectivity',
    pillar: 'live',
    tagline: 'Health continues between appointments.',
    description:
      'Supported devices and health apps — including Apple Health, Samsung Health, Fitbit and other supported devices — can feed sleep, activity, heart-rate and recovery signals into the same client timeline as clinical data. Clients connect their own devices, and more can be integrated.',
    bullets: [
      'Apple Health, Samsung Health, Fitbit and other supported devices',
      'Sleep, activity, heart rate and recovery signals on the client timeline',
      'Clients connect and disconnect their own devices from the portal',
      'Device data read alongside examinations and laboratory findings',
    ],
    selectable: true,
    includedIn: FROM_CLINICAL,
  },
  {
    id: 'health-metrics',
    name: 'Health Metrics & Vitals',
    pillar: 'live',
    tagline: 'Trends matter more than single readings.',
    description:
      'Vitals and health metrics can be recorded in the practice or entered by the client at home. Because every reading lands on the same timeline, the care team sees the direction of travel rather than one number in isolation.',
    bullets: [
      'Blood pressure, weight, glucose and other core metrics',
      'Recorded in the practice or entered by the client at home',
      'Trends charted across the whole journey',
      'Readings available to the care team and to the client',
    ],
    selectable: true,
    includedIn: FROM_CLINICAL,
  },
  {
    id: 'lifestyle-tracking',
    name: 'Lifestyle Tracking',
    pillar: 'live',
    tagline: 'See what happens between appointments.',
    description:
      'Clients can log meals, exercise, habits, symptoms and therapies as they go. It gives the care team context for a review appointment that a questionnaire on the day cannot recover.',
    bullets: [
      'Meal, exercise, habit, symptom and therapy logging',
      'Logged from the client portal or mobile app',
      'Entries sit on the same timeline as clinical findings',
      'Adherence to the healing plan visible to the care team',
    ],
    selectable: true,
    includedIn: FROM_CLINICAL,
  },

  // ── Communication & Engagement ────────────────────────────────────────
  {
    id: 'bookings',
    name: 'Bookings & Scheduling',
    pillar: 'communication',
    tagline: 'The calendar knows what the appointment is for.',
    description:
      'Scheduling covers practitioners, rooms, services and availability, including online booking for clients. Because the calendar sits on the same record, a booked examination arrives ready to be recorded rather than needing to be set up again.',
    bullets: [
      'Practitioner, room and service calendars with availability rules',
      'Online booking for new and returning clients',
      'Blocked time, leave and recurring availability per practitioner',
      'Appointments linked to the client record and the visit that follows',
    ],
    selectable: true,
    includedIn: ALL,
  },
  {
    id: 'reminders',
    name: 'Reminders',
    pillar: 'communication',
    tagline: 'Fewer missed appointments, fewer forgotten follow-ups.',
    description:
      'Appointment and follow-up reminders can be sent automatically on the channels a practice has enabled. Confirmations and cancellations come back to the same calendar the team is working from.',
    bullets: [
      'Automated appointment and follow-up reminders',
      'Sent by email, and by SMS or WhatsApp where those services are enabled',
      'Confirmation and cancellation handled against the booking',
      'Reminder history visible on the client record',
    ],
    selectable: true,
    includedIn: ALL,
  },
  {
    id: 'chat',
    name: 'Secure Chat',
    pillar: 'communication',
    tagline: 'Client conversations that stay with the record.',
    description:
      'Clients and the care team can message each other inside the platform rather than through personal phone numbers. Conversations are threaded against the client, so a colleague picking up the case can see what has already been said.',
    bullets: [
      'Threaded messaging between clients and the care team',
      'Internal care-team conversations about a client',
      'Conversations attached to the client record',
      'Access governed by role, with activity recorded',
    ],
    selectable: true,
    includedIn: ALL,
  },
  {
    id: 'messaging',
    name: 'Email, SMS & WhatsApp Messaging',
    pillar: 'communication',
    tagline: 'Reach clients on the channel they actually read.',
    description:
      'Outbound messaging is available by email, SMS and WhatsApp, using the messaging services a practice connects. Message history is kept against the client so the team can see what was sent and when.',
    bullets: [
      'Email, SMS and WhatsApp messaging from within the platform',
      'Templates for the messages a practice sends repeatedly',
      'Opt-in state respected per client and per channel',
      'Sent-message history retained on the client record',
    ],
    selectable: true,
    includedIn: FROM_CLINICAL,
  },
  {
    id: 'campaigns',
    name: 'Campaigns',
    pillar: 'communication',
    tagline: 'The right message. The right client. The right time.',
    description:
      'Campaigns are built from segments of real client data rather than an exported list that is out of date the moment it is downloaded. Targeting can follow programme, stage of journey or clinical context, within the consent each client has given.',
    bullets: [
      'Segment-based targeting drawn from live client data',
      'Campaigns by email, SMS or WhatsApp where those services are enabled',
      'Consent and opt-in state applied to every send',
      'Results reported back against the segment that received it',
    ],
    selectable: true,
    includedIn: FROM_CLINICAL,
  },
  {
    id: 'events',
    name: 'Events',
    pillar: 'communication',
    tagline: 'Bring clients together, and keep the record of who came.',
    description:
      'Client-facing events, workshops and group activities can be published, booked and tracked. Attendance is recorded against the client, so engagement outside the consulting room is visible too.',
    bullets: [
      'Client-facing events, workshops and group activities',
      'Registration and capacity handled with the rest of the calendar',
      'Attendance recorded against the client record',
      'Event invitations sent through the practice’s messaging channels',
    ],
    selectable: true,
    includedIn: FROM_CLINICAL,
  },
  {
    id: 'crm',
    name: 'CRM & Lead Management',
    pillar: 'communication',
    tagline: 'Turn client engagement into a connected growth engine.',
    description:
      'The pipeline runs from lead and enquiry through follow-up, booking, consultation and programme to renewal, in the same system as the clinical record. Follow-up becomes a task somebody owns rather than something somebody remembers.',
    bullets: [
      'Lead and enquiry capture with owner and stage',
      'Follow-up tasks and reminders for the client care team',
      'Programme and renewal tracking across the client relationship',
      'Reporting on conversion, programme uptake and practitioner load',
    ],
    selectable: true,
    includedIn: FROM_CLINICAL,
  },
  {
    id: 'client-portal',
    name: 'Client Portal & Mobile App',
    pillar: 'communication',
    tagline: 'Give clients a reason to stay engaged.',
    description:
      'Clients get their own view of shared reports, plans, appointments and messages, on web and mobile. Sharing is deliberate: a report appears when a practitioner chooses to share it, not automatically.',
    bullets: [
      'Web portal and mobile app on the same client account',
      'Shared reports, healing plans and appointment history',
      'Secure messaging with the care team',
      'Family and dependent profiles under one login',
      'A consent centre where a client can review and withdraw consent',
    ],
    selectable: true,
    includedIn: ALL,
  },
  {
    id: 'shop-orders',
    name: 'Shop, Orders & Credits',
    pillar: 'communication',
    tagline: 'Sell what you recommend, without a second system.',
    description:
      'Products, packages and session credits can be sold and tracked against the client. Purchases, balances and redemptions sit beside the plan they support, so the front desk and the practitioner see the same position.',
    bullets: [
      'Products, packages and programmes available to clients',
      'Order history held against the client record',
      'Session credits tracked from purchase through to redemption',
      'Payments taken through the payment service a practice connects',
    ],
    selectable: true,
    includedIn: FROM_CLINICAL,
  },
  {
    id: 'learn',
    name: 'Learn',
    pillar: 'communication',
    tagline: 'Keep the team, and the client, learning.',
    description:
      'Training modules can be published for staff onboarding and for client education. New joiners work through the same material wherever they are based, and clients get guidance that supports the plan they are on.',
    bullets: [
      'Training modules for staff onboarding and continuing education',
      'Client-facing education published to the portal',
      'Progress and completion tracked per person',
      'Consistent material across every location',
    ],
    selectable: true,
    includedIn: PRECISION_ONLY,
  },
  {
    id: 'support-desk',
    name: 'Support Desk',
    pillar: 'communication',
    tagline: 'One queue instead of a dozen inboxes.',
    description:
      'An internal help queue lets staff raise, assign and resolve requests in one place. For a group running several locations, it replaces the chain of forwarded email that usually carries this work.',
    bullets: [
      'Internal help queue for staff requests and issues',
      'Assignment, status and resolution tracked per ticket',
      'One queue across every location in the group',
      'History retained for review and reporting',
    ],
    selectable: true,
    includedIn: PRECISION_ONLY,
  },

  // ── Intelligence ──────────────────────────────────────────────────────
  {
    id: 'drt-ai',
    name: 'Dr.T AI',
    pillar: 'intelligence',
    tagline: 'AI that sees the whole story — not just one report.',
    description:
      'Dr.T works across the information available within a client’s record: assessments, examinations, laboratory results, genomics, imaging and live data. It can analyse a report in seconds, compare findings across the history and surface relationships a single document would not show. Dr.T does not replace the practitioner; it helps the practitioner see more of the story, faster.',
    bullets: [
      'Analyse individual reports and compare results over time',
      'Identify patterns across multiple sources within the client record',
      'Assist with case review and generate health insights for review',
      'Draft recommendations and support personalised healing plans',
      'Every AI-assisted action stays subject to permissions, consent and professional review',
    ],
    selectable: true,
    includedIn: PRECISION_ONLY,
  },
  {
    id: 'wellness-companion',
    name: 'Wellness Companion',
    pillar: 'intelligence',
    tagline: 'A calm, client-facing guide to the plan.',
    description:
      'The Wellness Companion is the client-facing assistant in the portal, deliberately narrower than Dr.T. It can help a client understand their plan, answer everyday questions about it and encourage the habits the care team has recommended.',
    bullets: [
      'Client-facing assistant available in the portal and mobile app',
      'Explains the healing plan in plain language',
      'Encourages logging, habits and plan adherence',
      'Clinical questions are directed back to the care team',
    ],
    selectable: true,
    includedIn: PRECISION_ONLY,
  },

  // ── Platform baseline ─────────────────────────────────────────────────
  {
    id: 'roles-permissions',
    name: 'Roles & Permissions',
    pillar: 'platform',
    tagline: 'Everyone sees the part of the journey they need.',
    description:
      'Access is granted by role, not by exception. Each role is a permission set describing what a person can see and change, so one client story can be viewed appropriately by very different members of the team.',
    bullets: [
      'Role-based access across every module',
      'Permission sets defined once and applied everywhere',
      'Scoped access for external collaborators and partner laboratories',
      'Included in every package',
    ],
    selectable: false,
    includedIn: ALL,
  },
  {
    id: 'security-consent-audit',
    name: 'Security, Consent & Audit',
    pillar: 'platform',
    tagline: 'Built into the platform.',
    description:
      'Consent is versioned rather than a single checkbox, access to client information is recorded, and data is encrypted in transit and at rest. The platform is built to support HIPAA-aligned and GDPR-ready operation for the practices that run on it.',
    bullets: [
      'Versioned consent, including separate consent for AI-assisted features',
      'Audit trail of access to client information, with actor and timestamp',
      'Encryption in transit and at rest, with controlled document access',
      'Retention and erasure handled as defined workflows',
      'Included in every package',
    ],
    selectable: false,
    includedIn: ALL,
  },
  {
    id: 'documents',
    name: 'Documents & Records',
    pillar: 'platform',
    tagline: 'Every file where the client story can find it.',
    description:
      'Reports, letters, images and uploaded files are held against the client rather than in a shared drive. Documents are served through controlled access and can be shared with the client when a practitioner chooses.',
    bullets: [
      'Documents, reports and images held against the client record',
      'Uploads from staff, clients and supported external sources',
      'Controlled, permission-checked access to every file',
      'Included in every package',
    ],
    selectable: false,
    includedIn: ALL,
  },
  {
    id: 'dashboards-reporting',
    name: 'Dashboards & Reporting',
    pillar: 'platform',
    tagline: 'See the practice as clearly as you see the client.',
    description:
      'Dashboards report on clinical activity, bookings, programmes and engagement from the live record. Because reporting reads the same data the team works in, the numbers do not need reconciling against a spreadsheet.',
    bullets: [
      'Clinical, operational and engagement dashboards',
      'Reporting drawn from live data rather than exports',
      'Views scoped by role and by location',
      'Included in every package',
    ],
    selectable: false,
    includedIn: ALL,
  },
  {
    id: 'multi-centre',
    name: 'Multi-Centre / Multi-Location',
    pillar: 'platform',
    tagline: 'One platform across every location you run.',
    description:
      'Clients, staff, calendars and reporting can be scoped per centre, with roll-up reporting for head office. Policy set centrally — roles, consent versions, retention — applies across the group rather than being chased site by site.',
    bullets: [
      'Data scoped per centre with group-level roll-up reporting',
      'Staff covering several sites work from one account',
      'Central policy applied consistently across locations',
      'Included in every package',
    ],
    selectable: false,
    includedIn: ALL,
  },
  {
    id: 'integrations',
    name: 'Integrations & Connectivity',
    pillar: 'platform',
    tagline: 'One platform. Your ecosystem.',
    description:
      'WIMS 360 connects to the services a practice already uses: wearables and connected health, laboratory systems, SMS, email, WhatsApp, email marketing, single sign-on and payments. Connections are described by the service they provide, and more can be integrated.',
    bullets: [
      'Wearables and connected health, and laboratory systems',
      'SMS, email, WhatsApp and email marketing services',
      'Single sign-on for staff accounts, and payment services',
      'Further services can be integrated on request',
      'Included in every package',
    ],
    selectable: false,
    includedIn: ALL,
  },
];

export const SELECTABLE_MODULES: Module[] = MODULES.filter(
  (module) => module.selectable,
);

export const BASELINE_MODULES: Module[] = MODULES.filter(
  (module) => !module.selectable,
);

/** Every module belonging to a pillar, in catalog order. */
export function modulesByPillar(pillar: ModulePillar): Module[] {
  return MODULES.filter((module) => module.pillar === pillar);
}
