import { singleton } from "tsyringe";
import { UrlStore } from "../store/url_store";
import { ShortUrl } from "../models/short_url";

@singleton()
export class UrlService {
  constructor(private readonly urlStore: UrlStore) {}

  public async getUrl(slug: string) {
    return this.urlStore.getUrl(slug);
  }

  public async getAllUrls(limit: number, offset: number) {
    console.log("getAllUrls", limit, offset);
    return this.urlStore.getAllUrls(limit, offset);
  }

  public async createUrl(
    target: string,
    slug?: string
  ): Promise<ShortUrl | null> {
    return this.urlStore.createUrl(target, slug);
  }
}
