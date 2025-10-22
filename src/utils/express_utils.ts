import { Response } from "express";
import { ErrorCode, ErrorCodes } from "../models/error";

export function createErrorResponse(
  res: Response,
  code: ErrorCode,
  message: string
) {
  let status;
  if (code === ErrorCodes.NOT_FOUND) {
    status = 404;
  } else if (code === ErrorCodes.RATE_LIMITED) {
    status = 429;
  } else if (code === ErrorCodes.INTERNAL) {
    status = 500;
  } else if (code === ErrorCodes.VALIDATION_ERROR) {
    status = 400;
  } else {
    throw new Error(`Unknown error code: ${code}`);
  }

  return res.status(status).json({ code, message });
}
