export interface Role {
  name: string;
  scope: string;
}

/**
 * The role TYPES available in WIMS 360. Each one is a permission set rather
 * than a job title: what a person can see and change follows their role, and
 * access to client information is recorded. Roles can be configured around
 * how a practice actually works, so this list is illustrative rather than a
 * fixed count.
 */
export const ROLES: Role[] = [
  {
    name: 'Doctor',
    scope:
      'The full client record, prescriptions, plans and AI-assisted insights, with consent review.',
  },
  {
    name: 'Nurse',
    scope: 'Vitals, assessment forms, bookings and care notes.',
  },
  {
    name: 'Wellness Companion',
    scope: 'Healing plans, lifestyle guidance and day-to-day client coaching.',
  },
  {
    name: 'Head Wellness Companion',
    scope: 'Team oversight and review of active plans across clients.',
  },
  {
    name: 'Fitness Companion',
    scope: 'Performance metrics, movement programming and training trends.',
  },
  {
    name: 'Physiotherapist',
    scope: 'Movement examinations, musculoskeletal findings and rehabilitation plans.',
  },
  {
    name: 'Lab Coordinator',
    scope: 'Sample handling, laboratory orders and the results workflow.',
  },
  {
    name: 'Client Care',
    scope: 'Bookings, reminders and client communication.',
  },
  {
    name: 'Practice Admin',
    scope: 'Staff, rooms, services and practice reporting.',
  },
  {
    name: 'Compliance Officer',
    scope: 'The audit trail, the consent registry and retention policy.',
  },
  {
    name: 'Medical Board',
    scope: 'Protocol review and population-level reporting.',
  },
  {
    name: 'Collaborator',
    scope: 'Scoped external access for referring practitioners.',
  },
  {
    name: 'Partner Lab',
    scope: 'Results upload and the sample workflow, and nothing beyond it.',
  },
  {
    name: 'Client',
    scope: 'The portal: shared reports, plans, consent and secure chat.',
  },
];
