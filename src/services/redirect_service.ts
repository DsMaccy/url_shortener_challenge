import { singleton } from "tsyringe";
import { UrlService } from "./url_service";
import { StatsService } from "./stats_service";
import { ShortUrl } from "../models/short_url";

@singleton()
export class RedirectService {
  constructor(
    private readonly urlService: UrlService,
    private readonly statsService: StatsService
  ) {}

  public async getRedirectUrl(
    slug: string,
    ip?: string,
    userAgent?: string
  ): Promise<ShortUrl | undefined> {
    const url = await this.urlService.getUrl(slug);
    if (!url) {
      return undefined;
    }

    await this.statsService.addClickEvent(slug, {
      slug,
      timestamp: new Date().toISOString(),
      ip,
      userAgent,
    });

    return url;
  }
}
