import { autoInjectable, injectable } from "tsyringe";
import { UrlService } from "../services/url_service";

@autoInjectable()
export class RedirectController {
  constructor(private readonly urlService: UrlService) {}

  public async redirectUrl(req: Express.Request, res: Express.Response) {
    console.log(req);
    console.log(res);
    // const { slug } = req.params as { slug: string };
    // const url = await this.urlService?.getUrl(slug);
    // if (!url) {
    //   return res.status(404).json({ error: "URL not found" });
    // }
    // return res.redirect(url.target);
  }
}
