import { RequestHandler, Request, Response, NextFunction } from "express";
import { createErrorResponse } from "../utils/express_utils";
import z, { ZodObject } from "zod";
import { ErrorCodes } from "../models/error";

export function validateBody<T extends ZodObject<any>>(
  schema: T
): RequestHandler<any, any, z.infer<T>> {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return createErrorResponse(
        res,
        ErrorCodes.VALIDATION_ERROR,
        result.error.message
      );
    }
    req.body = result.data;
    next();
  };
}

export function validateParams<T extends ZodObject<any>, P extends string>(
  schema: T
): RequestHandler<z.infer<T>, any, any> {
  return (
    req: Request<z.infer<T>, any, any>,
    res: Response,
    next: NextFunction
  ) => {
    const result = schema.safeParse(req.params);
    if (!result.success) {
      return createErrorResponse(
        res,
        ErrorCodes.VALIDATION_ERROR,
        result.error.message
      );
    }
    req.params = result.data;
    next();
  };
}
