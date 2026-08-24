export interface CompliancePractice {
  title: string;
  summary: string;
  points: string[];
}

/**
 * The seven security practices from the approved content direction. Homepage
 * renders title + summary; /security renders the points too.
 * Language is HIPAA-aligned and GDPR-ready — never "certified".
 */
export const COMPLIANCE: CompliancePractice[] = [
  {
    title: 'Audit Logging',
    summary:
      'Access and activity across client information can be recorded with the actor and the timestamp, so a practice can answer who saw what, and when.',
    points: [
      'Actor, action, subject record and timestamp captured on access to client information',
      'Entries are append-only and cannot be edited or removed from the application',
      'Filterable by staff member, client, date range and record type',
      'Exportable for internal review or an external audit',
    ],
  },
  {
    title: 'Consent Management',
    summary:
      'Consent is held as a versioned record rather than a single checkbox. Clients can see what they agreed to and when, and can withdraw it — including consent for AI-assisted features.',
    points: [
      'Each consent document is versioned; the record stores which version the client accepted',
      'A new version requires fresh acceptance rather than being applied silently',
      'Consent for AI-assisted features is held separately from clinical consent',
      'Withdrawal takes effect immediately, is itself recorded, and does not withdraw the client from care',
    ],
  },
  {
    title: 'Role-Based Access',
    summary:
      'Access follows the role a person holds, not the person. Everyone sees the part of the client journey their work requires, and nothing beyond it.',
    points: [
      'Permission sets are defined per role and applied everywhere, including across centres',
      'Practitioners, reception, laboratory, marketing and management each see a different view of the same client record',
      'External collaborators can be given scoped access to one task rather than to the record',
      'Joiners, movers and leavers are handled by changing a role rather than by editing individual permissions',
    ],
  },
  {
    title: 'Two-Factor Authentication',
    summary:
      'Two-factor authentication is available and can be required for the roles that reach client health information.',
    points: [
      'Enforced by role rather than left to each individual user',
      'Single sign-on through your existing identity provider is supported where your organisation already runs one',
      'Session expiry, device sign-out and re-authentication for sensitive actions',
      'Sign-in activity is recorded alongside the rest of the audit trail',
    ],
  },
  {
    title: 'Data Retention',
    summary:
      'Retention windows can be defined per data category, and erasure runs as a reviewed workflow rather than a manual delete.',
    points: [
      'Retention windows set per data category and per jurisdiction',
      'Erasure workflow with review, execution and a record of what was removed',
      'Records subject to statutory retention are flagged and excluded, with the reason shown',
      'Backups age out on the same schedule as live data',
    ],
  },
  {
    title: 'Secure Data',
    summary:
      'Client information is protected in transit and at rest, and access to documents, reports and files is controlled rather than open to anyone holding a link.',
    points: [
      'Encryption in transit and at rest for the database and for file storage',
      'Documents, reports and images served through short-lived, permission-checked links rather than public URLs',
      'A separate tenant database and file store per customer',
      'Regional hosting selected per customer where data residency is required',
      'A documented breach workflow covering detection, assessment, customer notification within 72 hours and regulator reporting, in line with GDPR Article 33',
    ],
  },
  {
    title: 'AI Governance',
    summary:
      'AI capabilities are governed through explicit consent and the appropriate organisational controls, so intelligence is available on the same terms as everything else in the platform.',
    points: [
      'AI features are gated on the individual client’s AI consent, which is separate and can be withdrawn',
      'Dr.T and the Wellness Companion draft; a practitioner reviews before anything enters the clinical record',
      'What was read, what was drafted and who approved it are recorded in the same audit trail as every other clinical action',
      'AI can be switched off entirely for a practice, a role or a client without affecting the rest of the platform',
    ],
  },
];
