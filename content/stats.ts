export interface Stat {
  value: string;
  label: string;
  detail?: string;
}

/** Numbers that are true of the shipped platform. No projections, no counters. */
export const STATS: Stat[] = [
  {
    value: '30+',
    label: 'assessment types',
    detail:
      'Chex intake and examination forms, from RMR and VO₂ Max to cognition, sleep and musculoskeletal work.',
  },
  {
    value: '14',
    label: 'clinical roles',
    detail:
      'From Doctor and Nurse to Partner Lab and Compliance Officer, each with its own permission set.',
  },
  {
    value: '15+',
    label: 'live integrations',
    detail:
      'Wearables, laboratories, messaging, payments and single sign-on, all in production today.',
  },
  {
    value: '100%',
    label: 'audit-logged PHI access',
    detail:
      'Every read and write against protected health information records the actor and the timestamp.',
  },
];
