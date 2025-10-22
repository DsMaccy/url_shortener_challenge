import { ErrorCodes } from "../models/error";
import { createErrorResponse } from "../utils/express_utils";
import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);

  // Handle Zod validation errors
  //   if (err instanceof Error && "issues" in err) {
  //     return res.status(400).json({ errors: (err as any).issues });
  //   }

  if (
    err instanceof Error &&
    "message" in err &&
    typeof err.message === "string"
  ) {
    createErrorResponse(res, ErrorCodes.INTERNAL, err.message);
  } else {
    createErrorResponse(res, ErrorCodes.INTERNAL, "Internal Server Error");
  }
}
