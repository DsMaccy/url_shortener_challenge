import { singleton } from "tsyringe";
import { UrlService } from "../services/url_service";
import { Request, Response } from "express";
import { StatsService } from "../services/stats_service";
import { ErrorCodes } from "../models/error";
import { createErrorResponse } from "../utils/express_utils";
import { CreateUrlRequestBody } from "../models/requests/create_url";
import { GetUrlsRequestParams } from "../models/requests/get_urls";

@singleton()
export class UrlController {
  constructor(
    private readonly urlService: UrlService,
    private readonly statsService: StatsService
  ) {}

  public async getUrls(
    req: Request<GetUrlsRequestParams, any, any>,
    res: Response
  ) {
    const urls = await this.urlService.getAllUrls(
      req.params.limit ?? 10,
      req.params.offset ?? 0
    );
    return res.json(urls);
  }

  public async getUrl(req: Request<{ slug: string }>, res: Response) {
    const url = await this.urlService.getUrl(req.params.slug);
    if (!url) {
      return createErrorResponse(res, ErrorCodes.NOT_FOUND, "Slug not found");
    }
    return res.json(url);
  }

  public async getStats(req: Request<{ slug: string }>, res: Response) {
    const stats = await this.statsService.getStats(req.params.slug);

    return res.json(stats);
  }

  public async createUrl(
    req: Request<any, any, CreateUrlRequestBody>,
    res: Response
  ) {
    const { target, slug } = req.body;

    const url = await this.urlService.createUrl(target, slug ?? undefined);
    if (!url) {
      return createErrorResponse(
        res,
        ErrorCodes.VALIDATION_ERROR,
        "Slug already exists"
      );
    }
    return res.json(url);
  }
}
