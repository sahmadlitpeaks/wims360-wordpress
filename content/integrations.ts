/**
 * Integrations are described by the SERVICE they provide, never by the
 * supplier behind it. Device ecosystems a client owns may be named as
 * supported; nothing else is.
 */
export interface IntegrationService {
  id: string;
  name: string;
  description: string;
  /** Named only where the client owns the ecosystem, e.g. their wearable. */
  examples?: string[];
  builderSelectable: boolean;
}

export const INTEGRATION_SERVICES: IntegrationService[] = [
  {
    id: 'wearables-connected-health',
    name: 'Wearables & Connected Health',
    description:
      'Clients can connect the devices and health apps they already use, so sleep, activity, heart-rate and recovery signals land on the same timeline as clinical findings.',
    examples: [
      'Apple Health',
      'Samsung Health',
      'Fitbit',
      'and other supported devices',
    ],
    builderSelectable: true,
  },
  {
    id: 'laboratory-systems',
    name: 'Laboratory Systems',
    description:
      'Orders can be sent to, and results received from, connected laboratory systems, so an investigation moves from order to result without being retyped along the way.',
    builderSelectable: true,
  },
  {
    id: 'sms',
    name: 'SMS',
    description:
      'Text messaging for appointment reminders, confirmations and time-sensitive notices, sent through the SMS service your practice connects.',
    builderSelectable: true,
  },
  {
    id: 'email',
    name: 'Email',
    description:
      'Transactional email for confirmations, reminders, shared reports and account notices, delivered from your practice’s own sending domain.',
    builderSelectable: true,
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    description:
      'WhatsApp messaging for reminders, follow-ups and client conversations where that is the channel clients prefer, with opt-in state respected per client.',
    builderSelectable: true,
  },
  {
    id: 'email-marketing',
    name: 'Email Marketing',
    description:
      'Campaign email built from live client segments rather than an exported list, with consent applied to every send.',
    builderSelectable: true,
  },
  {
    id: 'single-sign-on',
    name: 'Single Sign-On',
    description:
      'Staff sign in through your organisation’s existing identity provider, so joiners and leavers are handled once, in the directory you already run.',
    builderSelectable: true,
  },
  {
    id: 'payments',
    name: 'Payments',
    description:
      'Payments for consultations, programmes, products and credits, taken through the payment service your practice already uses.',
    builderSelectable: true,
  },
];

/** Closing line after the service list. */
export const INTEGRATIONS_CLOSING = 'and more can be integrated.';
