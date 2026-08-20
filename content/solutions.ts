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
    name: 'Wellness clinics',
    problem:
      'A booking tool, a spreadsheet of clients, a shared inbox and a folder of scanned PDFs. Reception knows one version of the client, the practitioner knows another, and nobody can answer "what changed since March?" without opening four things. When an auditor asks who opened a record, there is no honest answer.',
    narrative:
      'WIMS 360 puts the calendar, the client record, the intake forms and the client app on one database. A booking creates the visit, the visit creates the assessment, and the assessment stays queryable instead of becoming a PDF. Clients see their own results and message the care team from the portal, so follow-up stops living in personal WhatsApp threads. Access is role-based and every record view is logged.',
    moduleIds: ['bookings', 'portal', 'assessments', 'crm'],
    recommendedPackage: 'clinical',
  },
  {
    slug: 'functional-medicine',
    name: 'Functional & integrative medicine',
    problem:
      'Functional practice runs on volume of evidence: long intakes, multi-panel labs, wearable data, sometimes genomics. The evidence arrives in different formats, weeks apart, and the practitioner does the joining by hand. Insight lands late, and protocol decisions rest on whatever was legible that morning.',
    narrative:
      'WIMS 360 scores the evidence as it arrives. Chex forms, 115 functional markers across 33 lab panels, wearable signals and genomic traits all map onto the same 7-layer Diamond System of Care ladder, so a case can be read in one view. Dr.T Copilot can draft the health insight, the case review or the healing prescription from that record, citing what it used — and a clinician approves before anything is saved. It is consent-gated per client and enabled only after a signed BAA or DPA.',
    moduleIds: ['assessments', 'labs', 'ai', 'portal'],
    recommendedPackage: 'clinical',
  },
  {
    slug: 'labs',
    name: 'Laboratories & diagnostics',
    problem:
      'Orders arrive by email, samples are tracked on a printed sheet, and results go back as attachments that a clinic then retypes. Every handoff is a place to lose a sample identity or a result, and the chain of custody exists mostly in people\'s memory.',
    narrative:
      'WIMS 360 works in both directions with a laboratory. Orders raised in the clinical record flow out with a barcode; samples are scanned through collection; results come back against the same client and score themselves into the ladder. Laboratories running their own LIMS connect through a documented bidirectional API. Partner labs without a LIMS get a scoped Partner Lab account that can upload results and nothing else — no access to the clinical record.',
    moduleIds: ['labs', 'assessments', 'portal'],
    recommendedPackage: 'precision',
  },
  {
    slug: 'multi-center',
    name: 'Multi-center groups',
    problem:
      'Each center picked its own tools, so HQ gets four different definitions of "active client" and reconciles them in a spreadsheet. Staff who cover two sites hold two logins. A policy change — a new consent version, a retention rule, a protocol update — has to be chased site by site, and nobody is certain it landed everywhere.',
    narrative:
      'WIMS 360 runs one platform across centers, with data scoped per site and reporting rolled up to HQ. Roles and permissions are defined once and apply everywhere, and staff sign in through your directory with Azure AD single sign-on. A central support desk handles queries from every site in one queue, and the staff training LMS keeps onboarding consistent across locations. Consent versions, retention windows and audit logs are group-wide by default.',
    moduleIds: ['bookings', 'crm', 'portal', 'ai'],
    recommendedPackage: 'precision',
  },
];
