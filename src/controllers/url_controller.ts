import { autoInjectable } from "tsyringe";
import { UrlService } from "../services/url_service";

@autoInjectable()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  public async getUrls(req: Request, res: Response) {
    console.log(req);
    // const urls = await this.urlService.getUrl();
    // return res.json(urls);
  }

  getStats(req: Request, res: Response) {
    console.log(req);
    console.log(res);
  }
}
