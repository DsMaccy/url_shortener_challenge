import { z } from "zod";
export const shortUrlSchema = z.object({
  slug: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[a-z0-9-]+$/),
  target: z.url(),
  createdAt: z.iso.datetime(),
});
export type ShortUrl = z.infer<typeof shortUrlSchema>;

// NOTE: FROM DOCS
// interface ShortUrl {
//   slug: string; // unique, [a-z0-9-]{3,30}
//   target: string; // https://...
//   createdAt: string; // ISO
// }
