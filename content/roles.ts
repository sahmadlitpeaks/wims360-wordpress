export interface Role {
  name: string;
  scope: string;
}

/**
 * The 14 shipped clinical roles. Each one is a permission set, not a job title:
 * what a person can see and change is decided by their role, and every access is logged.
 */
export const ROLES: Role[] = [
  {
    name: 'Doctor',
    scope:
      'Full clinical record, prescriptions, AI insights and consent review.',
  },
  {
    name: 'Nurse',
    scope: 'Vitals, intake forms, bookings and care notes.',
  },
  {
    name: 'Wellness Companion',
    scope: 'Lifestyle protocols, healing plans and day-to-day client coaching.',
  },
  {
    name: 'Head Wellness Companion',
    scope: 'Team oversight and cross-client review of active plans.',
  },
  {
    name: 'Fitness Companion',
    scope: 'Performance metrics, workout programming and VO₂ trends.',
  },
  {
    name: 'Physiotherapist',
    scope: 'Movement examinations, musculoskeletal findings and rehab plans.',
  },
  {
    name: 'Lab Coordinator',
    scope: 'Sample handling, vendor orders and the results flow.',
  },
  {
    name: 'Customer Care',
    scope: 'Bookings, reminders and client communication.',
  },
  {
    name: 'Clinic Admin',
    scope: 'Staff, rooms, services and clinic reporting.',
  },
  {
    name: 'Compliance Officer',
    scope: 'Audit logs, the consent registry and retention policy.',
  },
  {
    name: 'Medical Board',
    scope: 'Protocol review and population-level analytics.',
  },
  {
    name: 'Collaborator',
    scope: 'Scoped external access for referring providers.',
  },
  {
    name: 'Partner Lab',
    scope: 'Results upload and the barcode sample workflow, nothing else.',
  },
  {
    name: 'Client',
    scope: 'Self-serve portal: shared reports, consent and secure chat.',
  },
];
