import { z } from "zod";

export const clickEventSchema = z.object({
  slug: z.string().min(3).max(30),
  timestamp: z.iso.datetime(),
  userAgent: z.string().optional(),
  ip: z.string().optional(),
});

export type ClickEvent = z.infer<typeof clickEventSchema>;

// NOTE: FROM DOCS
// interface ClickEvent {
//   slug: string;
//   timestamp: string; // ISO
//   userAgent?: string;
//   ip?: string;
// }
