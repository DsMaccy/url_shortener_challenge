import { singleton } from "tsyringe";
import { RedirectService } from "../services/redirect_service";
import { Request, Response } from "express";
import { ErrorCodes } from "../models/error";
import { createErrorResponse } from "../utils/express_utils";

@singleton()
export class RedirectController {
  constructor(private readonly redirectService: RedirectService) {}

  public async redirectUrl(req: Request<{ slug: string }>, res: Response) {
    const { slug } = req.params;
    const url = await this.redirectService.getRedirectUrl(
      slug,
      req.ip,
      req.get("User-Agent")
    );
    if (!url) {
      return createErrorResponse(res, ErrorCodes.NOT_FOUND, "URL not found");
    }
    return res.redirect(url.target);
  }
}
