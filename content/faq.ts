export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ: FaqItem[] = [
  {
    question: 'How is WIMS 360 deployed?',
    answer:
      'WIMS 360 is delivered as a managed cloud tenant per customer, hosted in the region you require. Each tenant has its own database and its own storage bucket; nothing is pooled across customers. Organizations with a data-residency mandate can tell us the region during onboarding and we provision there.',
  },
  {
    question: 'Who owns the clinical data?',
    answer:
      'You do. WIMS 360 acts as a processor of your clinical data, never an owner of it. You can export the full record set — clients, assessments, lab results, documents and audit logs — at any time, in structured formats. If you leave, you take the data and we delete our copies on the schedule set out in the agreement.',
  },
  {
    question: 'Can we migrate from our current system?',
    answer:
      'Usually, yes. We migrate clients, appointment history, documents and lab results from spreadsheets, practice-management exports and most EMR extracts. We start with a sample file, agree the field mapping with you, then run a dry migration you review before anything goes live. Free-text notes come across as documents attached to the client rather than being force-fitted into fields.',
  },
  {
    question: 'How does the BAA and DPA process work?',
    answer:
      'Ask for the security pack and we send the Business Associate Agreement, the Data Processing Agreement and the supporting documentation. Legal review typically runs in parallel with the technical onboarding call. Signature is a prerequisite for anything touching protected health information, and it is also the gate for turning on Dr.T AI.',
  },
  {
    question: 'When is the AI turned on?',
    answer:
      'Never by default. Dr.T Copilot and the Wellness Companion stay off until a BAA or DPA is signed and your organization explicitly enables them. Once enabled, they only work for clients whose AI consent is active, and that consent is versioned and revocable from the client portal. Every AI-drafted output requires clinician approval before it is saved to the record.',
  },
  {
    question: 'Can the platform carry our brand?',
    answer:
      'Yes. The client portal, mobile app, reports and emails carry your name, logo and colours. Intake and assessment wizards can be embedded in your own website as white-label flows, so a prospect never sees a change of brand. The wizards post straight into your WIMS tenant.',
  },
  {
    question: 'Does it work across multiple centers?',
    answer:
      'Yes. Centers are first-class in the data model: clients, bookings, staff and reporting are all scoped per site, with roll-up reporting for head office. Staff who cover two sites hold one account with access to both. Group-wide items — consent versions, retention rules, the support desk and the training LMS — are configured centrally.',
  },
  {
    question: 'How long does it take to go live?',
    answer:
      'A single-site Essentials setup is typically live in two to four weeks, most of which is data migration and staff training rather than software. Clinical and Precision rollouts run six to twelve weeks depending on lab integration, custom Chex forms and the number of centers. We agree a dated plan before the contract, not after.',
  },
];
