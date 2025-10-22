import z from "zod";

export const getUrlsRequestSchema = z.object({
  limit: z.number().nullish(),
  offset: z.number().nullish(),
});

export type GetUrlsRequestParams = z.infer<typeof getUrlsRequestSchema>;
