import type { ModuleId } from './modules';
import type { PackageId } from './packages';

export type SolutionSlug =
  | 'wellness-clinics'
  | 'functional-medicine'
  | 'labs'
  | 'multi-center';

export interface Solution {
  slug: SolutionSlug;
  name: string;
  problem: string;
  narrative: string;
  moduleIds: ModuleId[];
  recommendedPackage: PackageId;
}

export const SOLUTIONS: Solution[] = [
  {
    slug: 'wellness-clinics',
    name: 'Longevity & wellness practices',
    problem:
      'A booking tool, a spreadsheet of clients, a shared inbox and a folder of scanned reports. Reception knows one version of the client, the practitioner knows another, and answering "what has changed since March?" means opening four systems. The client story is bigger than any one of them, and none of them holds it.',
    narrative:
      'WIMS 360 brings the calendar, the client record, the assessment forms and the client app onto one connected journey. A booking creates the visit, the visit records the assessment, and the assessment stays as structured data that can be read again later rather than becoming a document nobody can query. Clients see their shared reports and plans in the portal and message the care team from there, so follow-up stops living in personal message threads. Access follows role, and activity against client records is recorded.',
    moduleIds: [
      'client-records',
      'assessment-forms',
      'bookings',
      'chat',
      'client-portal',
    ],
    recommendedPackage: 'clinical',
  },
  {
    slug: 'functional-medicine',
    name: 'Functional & integrative medicine',
    problem:
      'This is practice built on the weight of evidence: long histories, detailed examinations, multi-panel laboratory work, wearable data, sometimes genomics. The evidence arrives in different formats, weeks apart, and the joining up is done by hand. Insight lands late, and the plan rests on whatever was legible that morning.',
    narrative:
      'WIMS 360 gathers the evidence as it arrives. Assessment forms, clinical examinations, routine and specialty reports, live data from supported devices and — where a practice works with them — genetics and imaging all sit against the same client, so a case can be read in one view. Dynamic analysis maps findings to pathways and contributing factors, and Dr.T can compare results over time, surface patterns across sources and draft recommendations for the practitioner to review. Many practices start on Clinical and add genomics and Dr.T with Precision when they are ready.',
    moduleIds: [
      'assessment-forms',
      'clinical-examinations',
      'lab-orders',
      'dynamic-analysis',
      'healing-plans',
      'drt-ai',
    ],
    recommendedPackage: 'clinical',
  },
  {
    slug: 'labs',
    name: 'Laboratories & diagnostics',
    problem:
      'Orders arrive by email, samples are tracked on a printed sheet, and results go back as attachments that a practice then retypes. Every handoff is somewhere a sample identity or a result can be lost, and the chain of custody exists mostly in people’s memory.',
    narrative:
      'WIMS 360 runs the laboratory workflow in one line: order, sample, processing, result, review, client record. Orders are raised from the record, samples are registered and barcoded through collection, and results come back against the same client — ready to be compared with everything already recorded there. Connected laboratory systems exchange orders and results as a service; where a partner laboratory has no system of its own, scoped access lets it upload results and nothing more.',
    moduleIds: [
      'lab-orders',
      'routine-lab-reports',
      'specialty-reports',
      'genetics',
      'compare-over-time',
    ],
    recommendedPackage: 'precision',
  },
  {
    slug: 'multi-center',
    name: 'Multi-centre groups',
    problem:
      'Each centre chose its own tools, so head office receives four different definitions of "active client" and reconciles them in a spreadsheet. Staff covering two sites hold two logins. A policy change — a new consent version, a retention rule, an updated protocol — has to be chased site by site, and nobody is certain it landed everywhere.',
    narrative:
      'WIMS 360 runs as one platform across every location, with data scoped per centre and reporting rolled up to head office. Roles and permissions are defined once and apply everywhere, and staff can sign in through your existing identity provider with single sign-on. A central support desk takes queries from every site in one queue, and training modules keep onboarding consistent wherever a person is based. Consent versions, retention windows and the audit trail are group-wide by default.',
    moduleIds: [
      'client-records',
      'bookings',
      'crm',
      'dashboards-reporting',
      'multi-centre',
      'support-desk',
    ],
    recommendedPackage: 'precision',
  },
];
