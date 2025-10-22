import { z } from "zod";

export const statsSchema = z.object({
  slug: z.string(),
  totalClicks: z.number(),
  byDay: z.array(z.object({ date: z.string(), count: z.number() })), // YYYY-MM-DD
  lastClickAt: z.string().nullable(),
});
export type Stats = z.infer<typeof statsSchema>;
