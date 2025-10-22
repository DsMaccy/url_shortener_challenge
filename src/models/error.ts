import z from "zod";

export const ErrorCodes = {
  VALIDATION_ERROR: "VALIDATION_ERROR",
  NOT_FOUND: "NOT_FOUND",
  RATE_LIMITED: "RATE_LIMITED",
  INTERNAL: "INTERNAL",
} as const;

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];

export const errorSchema = z.object({
  code: z.enum(Object.values(ErrorCodes)),
  message: z.string(),
});

export type Error = z.infer<typeof errorSchema>;
