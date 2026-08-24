import type { ModuleId, PillarId } from './modules';

export type { PillarId };

export interface Pillar {
  id: PillarId;
  /** '01'..'04' — the pillar's number in the running order. */
  number: string;
  name: string;
  headline: string;
  /** The short promise line that sits under the headline. */
  promise: string;
  /** Two to three paragraphs. */
  body: string[];
  /** The capability chip row, e.g. History · Assessments · … */
  capabilities: string[];
  moduleIds: ModuleId[];
}

/**
 * The four pillars are the primary organising idea of the site: every module
 * in the catalog belongs to one of them, or to the intelligence and platform
 * groups that run across all four.
 */
export const PILLARS: Pillar[] = [
  {
    id: 'investigations',
    number: '01',
    name: 'Investigations',
    headline: 'Understand the complete biological story.',
    promise: 'A deeper picture of every client.',
    body: [
      'A client arrives with more information than any single report can hold: their history, how they feel, what an examination shows, what the laboratory returns, what their genes contribute, what imaging reveals. WIMS 360 brings those pieces into one place for the information that builds the client’s story.',
      'Everything is captured as structured data rather than as a file somebody has to open and read. That means a finding recorded today can be read against a finding from last year, markers can be mapped to pathways and contributing factors, and a practitioner can move from investigation to insight without a fragmented workflow.',
      'The objective is not simply to collect more information. It is to help the care team understand which findings matter, how they relate to each other and what may need attention next.',
    ],
    capabilities: [
      'History',
      'Assessments',
      'Examinations',
      'Laboratory',
      'Genetics',
      'Radiology',
      'Dynamic analysis',
      'Compare over time',
    ],
    moduleIds: [
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
    ],
  },
  {
    id: 'healing',
    number: '02',
    name: 'Healing',
    headline: 'Turn insights into personalised action.',
    promise: 'From investigation to action.',
    body: [
      'Investigation is only useful if it changes what happens next. A healing plan in WIMS 360 is built from what the record already holds, bringing nutrition, supplementation, medication, therapies and consultation guidance together in one place the client can follow.',
      'Because the plan and the evidence live in the same system, a practitioner can see why a recommendation was made and revise it when new findings arrive. A plan that evolves with the client is easier to keep honest than one that was printed at the end of an appointment.',
      'Consultation notes, prescriptions and therapy sessions stay attached to the client and the visit, so the next practitioner to see them inherits the reasoning rather than only the outcome.',
    ],
    capabilities: [
      'Healing plans',
      'Nutrition',
      'Supplementation',
      'Medication',
      'Therapies',
      'Consultations',
    ],
    moduleIds: [
      'healing-plans',
      'nutrition',
      'supplementation',
      'medication',
      'therapies',
      'consultations',
    ],
  },
  {
    id: 'live',
    number: '03',
    name: 'Live',
    headline: 'Health continues between appointments.',
    promise: 'From snapshots to an evolving health story.',
    body: [
      'Most of a client’s year happens away from the practice. Supported wearables and connected health apps — Apple Health, Samsung Health, Fitbit and other supported devices — can feed sleep, activity, heart-rate and recovery signals into the same timeline as clinical findings.',
      'Vitals recorded at home, meals and exercise logged during the week, symptoms noted when they occur: each one adds context that a questionnaire on the day of the appointment cannot recover. Trends matter more than single readings, and a trend is only visible when the data has somewhere consistent to land.',
      'Live data does not replace clinical judgement. It gives the care team a fuller view of what happened between one appointment and the next, and gives the client something to see for the effort they are putting in.',
    ],
    capabilities: [
      'Wearables',
      'Vitals',
      'Sleep',
      'Activity',
      'Meals',
      'Habits',
      'Symptoms',
      'Trends',
    ],
    moduleIds: ['wearables', 'health-metrics', 'lifestyle-tracking'],
  },
  {
    id: 'communication',
    number: '04',
    name: 'Communication',
    headline: 'Keep the client and care team connected.',
    promise: 'The right message. The right client. The right time.',
    body: [
      'Engagement is not a separate discipline from care; it is the part of care that happens in between. WIMS 360 keeps bookings, reminders, secure chat, messaging, campaigns and events in the same system as the clinical record, so the practice can stay connected before, during and after every appointment.',
      'The client portal and mobile app give clients a reason to stay engaged: shared reports, their plan, their appointments and a way to reach the care team without a personal phone number. The CRM carries the other side of the relationship, from lead and enquiry through follow-up, booking, consultation and programme to renewal.',
      'Because communication reads the same client data as everything else, targeting follows the real journey rather than an exported list, and every message respects the consent the client has given.',
    ],
    capabilities: [
      'Bookings',
      'Reminders',
      'Secure chat',
      'Messaging',
      'Campaigns',
      'Events',
      'CRM',
      'Client portal',
      'Shop & credits',
    ],
    moduleIds: [
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
    ],
  },
];
