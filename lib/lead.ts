import { z } from "zod";

export const leadSchema = z.object({
  source: z.enum(["demo", "pricing", "builder", "security-pack"]),
  contact: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().optional(),
    organization: z.string().optional(),
  }),
  message: z.string().max(4000).optional(),
  configuration: z.unknown().optional(), // builder payload, formatted by mailer
});

export type Lead = z.infer<typeof leadSchema>;
