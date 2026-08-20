export interface Integration {
  name: string;
  category: 'wearables' | 'labs' | 'comms' | 'payments' | 'auth' | 'infra';
  note: string;
  builderSelectable: boolean;
}

export const INTEGRATIONS: Integration[] = [
  {
    name: 'Terra',
    category: 'wearables',
    note: 'Aggregator for the wearables and health apps your clients already use. Sleep, HRV, activity and recovery land on the client timeline.',
    builderSelectable: true,
  },
  {
    name: 'Ultrahuman',
    category: 'wearables',
    note: 'Direct ring integration for continuous sleep, recovery and metabolic signals between appointments.',
    builderSelectable: true,
  },
  {
    name: 'LIMS API',
    category: 'labs',
    note: 'Documented bidirectional API for organizations running their own laboratory system: orders out, results back against the same client.',
    builderSelectable: true,
  },
  {
    name: 'Twilio',
    category: 'comms',
    note: 'SMS delivery for appointment reminders, confirmations and one-time passcodes.',
    builderSelectable: true,
  },
  {
    name: 'Interakt (WhatsApp)',
    category: 'comms',
    note: 'WhatsApp Business messaging for reminders, follow-ups and campaign sends with opt-in tracking.',
    builderSelectable: true,
  },
  {
    name: 'Brevo',
    category: 'comms',
    note: 'Transactional and campaign email, wired to CRM segments and consent state.',
    builderSelectable: true,
  },
  {
    name: 'Stripe',
    category: 'payments',
    note: 'Card payments for consultations, packages and programme instalments.',
    builderSelectable: true,
  },
  {
    name: 'Azure AD SSO',
    category: 'auth',
    note: 'Single sign-on for staff accounts, so joiners and leavers are handled in your existing directory.',
    builderSelectable: true,
  },
  {
    name: 'OpenAI',
    category: 'infra',
    note: 'Model provider behind Dr.T Copilot and the Wellness Companion. Enabled per customer after a signed BAA or DPA, and off until then.',
    builderSelectable: false,
  },
  {
    name: 'AWS S3',
    category: 'infra',
    note: 'Encrypted object storage for documents, reports and images, served through short-lived signed URLs.',
    builderSelectable: false,
  },
  {
    name: 'Firebase',
    category: 'infra',
    note: 'Push notifications to the client mobile app for appointments, messages and shared reports.',
    builderSelectable: false,
  },
  {
    name: 'iCal',
    category: 'infra',
    note: 'Read-only calendar feed so practitioners can mirror their WIMS schedule in Outlook or Google Calendar.',
    builderSelectable: false,
  },
];
