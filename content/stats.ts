export interface Stat {
  value: string;
  label: string;
  detail?: string;
}

/**
 * Four numbers that are countable from the platform itself — the module
 * catalog, the examination catalog, the integration service list and the
 * audit baseline. No projections, no counters, and no role count: the site
 * presents role TYPES rather than a fixed number.
 */
export const STATS: Stat[] = [
  {
    value: '39',
    label: 'modules across four pillars',
    detail:
      'Investigations, healing, live health data and communication, with intelligence and the platform baseline running across all four.',
  },
  {
    value: '17',
    label: 'clinical examination types',
    detail:
      'From RMR and VO₂ Max to cognition, sleep, gut, movement and body composition — each recorded in structured fields.',
  },
  {
    value: '8',
    label: 'connected service categories',
    detail:
      'Wearables and connected health, laboratory systems, SMS, email, WhatsApp, email marketing, single sign-on and payments. More can be integrated.',
  },
  {
    value: '100%',
    label: 'audit-logged access to client records',
    detail:
      'Access to client health information is recorded with the actor and the timestamp, across every module.',
  },
];
