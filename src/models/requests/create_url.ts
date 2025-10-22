import z from "zod";

export const createUrlRequestSchema = z.object({
  target: z.url(),
  slug: z.string().nullish(),
});

export type CreateUrlRequestBody = z.infer<typeof createUrlRequestSchema>;
