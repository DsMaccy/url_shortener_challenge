import { autoInjectable } from "tsyringe";
import { UrlStore } from "../store/url_store";

@autoInjectable()
export class UrlService {
  constructor(private readonly urlStore: UrlStore) {}

  async getUrl(slug: string) {
    return this.urlStore.getUrl(slug);
  }
}
