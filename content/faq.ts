export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ: FaqItem[] = [
  {
    question: 'Why are there no prices on this site?',
    answer:
      'Because a package alone does not tell us what a configuration costs. What you pay follows the modules you switch on, the number of locations and practitioners, the services you connect and the migration involved. We would rather quote against your actual configuration than publish a list price you then have to argue with. Build a configuration or book a demo and we will price what you asked for.',
  },
  {
    question: 'How is WIMS 360 deployed?',
    answer:
      'WIMS 360 is delivered as a managed cloud tenant per customer, hosted in the region you require. Each tenant has its own database and its own file storage; nothing is pooled across customers. If you have a data-residency requirement, tell us the region during onboarding and we provision there.',
  },
  {
    question: 'Who owns the client data?',
    answer:
      'You do. WIMS 360 processes your client data on your behalf and never claims ownership of it. You can export the full record set — clients, assessments, results, documents and audit records — at any time, in structured formats. If you leave, you take the data with you and we delete our copies on the schedule set out in the agreement.',
  },
  {
    question: 'Can we migrate from our current system?',
    answer:
      'Usually, yes. We can migrate clients, appointment history, documents and laboratory results from spreadsheets, practice-management exports and most clinical system extracts. We start with a sample file, agree the field mapping with you, then run a dry migration you review before anything goes live. Free-text notes come across as documents attached to the client rather than being forced into fields they were never written for.',
  },
  {
    question: 'How does Dr.T AI work, and when is it available?',
    answer:
      'Dr.T works across the information available within a client’s record and can analyse reports, compare findings over time, surface patterns and draft recommendations. It is not enabled by default: your organisation switches it on, and it works only for clients whose consent for AI-assisted features is active. Every AI-generated clinical action remains subject to the appropriate permissions, consent and professional review. Dr.T does not replace the practitioner — it helps the practitioner see more of the story, faster.',
  },
  {
    question: 'Can the platform carry our brand?',
    answer:
      'Yes. The client portal, mobile app, reports and emails can carry your name, logo and colours. Assessment and intake wizards can be embedded in your own website, so a prospective client does not see a change of brand partway through — and what they submit lands directly in your WIMS 360 tenant.',
  },
  {
    question: 'Does it work across multiple centres?',
    answer:
      'Yes. Centres are part of the data model rather than an afterthought: clients, bookings, staff and reporting are scoped per site, with roll-up reporting for head office. Staff covering two sites work from one account with access to both. Group-wide items — consent versions, retention rules, the support desk and training modules — are configured centrally.',
  },
  {
    question: 'How long does it take to go live?',
    answer:
      'A single-site Essentials setup is typically live in two to four weeks, most of which is data migration and staff training rather than software. Clinical and Precision rollouts usually run six to twelve weeks depending on laboratory connectivity, custom assessment forms and the number of centres. We agree a dated plan before the contract rather than after it.',
  },
];
