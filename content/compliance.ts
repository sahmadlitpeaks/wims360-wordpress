export interface CompliancePractice {
  title: string;
  summary: string;
  points: string[];
}

/** Six practice cards. Homepage renders title + summary; /security renders the points too. */
export const COMPLIANCE: CompliancePractice[] = [
  {
    title: 'Audit logging',
    summary:
      'Every read and write against protected health information is logged with the actor and the timestamp. The log is append-only.',
    points: [
      'Actor, action, subject record and timestamp captured on every PHI access',
      'Append-only: entries cannot be edited or deleted from the application',
      'Filterable by staff member, client, date range and record type',
      'Exportable for internal review or an external audit',
    ],
  },
  {
    title: 'Consent registry',
    summary:
      'Consent is versioned, not a checkbox. Clients see what they agreed to, when, and can withdraw it — including AI consent.',
    points: [
      'Each consent document is versioned; the record stores which version the client accepted',
      'A new version requires fresh acceptance rather than silently applying',
      'AI consent is separate from clinical consent and is revocable at any time',
      'Withdrawal takes effect immediately and is itself recorded',
    ],
  },
  {
    title: 'Authentication',
    summary:
      'Two-factor authentication is enforced for every role that can reach protected health information. Staff directories connect through Azure AD single sign-on.',
    points: [
      'Enforced 2FA for all PHI-facing roles — not optional per user',
      'Azure AD single sign-on so joiners and leavers are handled in your directory',
      'Session expiry, device sign-out and forced re-authentication for sensitive actions',
      'Permission sets are role-based; access is granted by role, never ad hoc',
    ],
  },
  {
    title: 'Retention & erasure',
    summary:
      'Retention windows are configured per data category, and right-to-erasure requests run as a defined workflow rather than a manual delete.',
    points: [
      'Retention windows set per data category and per jurisdiction',
      'Right-to-erasure workflow with review, execution and a record of what was removed',
      'Clinical records subject to statutory retention are flagged and excluded, with the reason shown',
      'Backups age out on the same schedule as live data',
    ],
  },
  {
    title: 'Breach response',
    summary:
      'A documented 72-hour breach workflow covers detection, assessment, customer notification and regulator reporting.',
    points: [
      'Defined severity assessment and escalation path from first detection',
      'Customer notification within 72 hours of becoming aware, per GDPR Article 33',
      'Scope reconstruction from the audit log: which records, which actors, which window',
      'Post-incident review with remediation tracked to closure',
    ],
  },
  {
    title: 'Infrastructure',
    summary:
      'Data is encrypted in transit and at rest. Documents and images are served through short-lived signed URLs, never public links.',
    points: [
      'Encryption in transit (TLS) and at rest for database and object storage',
      'Documents, reports and images served through short-TTL signed URLs',
      'Separate tenant database and storage bucket per customer',
      'Regional hosting selected per customer for data-residency requirements',
    ],
  },
];
