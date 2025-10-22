import { autoInjectable } from "tsyringe";
import { ShortUrl } from "../models/short_url";

// NOTE: Starting with in-memory, v2 => Postgres
@autoInjectable()
export class UrlStore {
  private shortUrlBySlug: Map<string, ShortUrl> = new Map();

  public async getUrl(slug: string): Promise<ShortUrl | undefined> {
    return this.shortUrlBySlug.get(slug);
  }

  public async createUrl(
    target: string,
    suggestedSlug?: string
  ): Promise<void> {
    const slug = suggestedSlug ?? this.generateSlug();
    const shortUrl: ShortUrl = {
      slug,
      target,
      createdAt: new Date().toISOString(),
    };

    if (this.shortUrlBySlug.has(slug)) {
      throw new Error("Slug already exists");
    }
    this.shortUrlBySlug.set(slug, shortUrl);
  }

  /**
   * @returns Slug with the following constraint: [a-z0-9]{6}
   */
  private generateSlug(): string {
    // TODO: Improve the randomization of this.
    return Math.random().toString(36).substring(2, 8);
  }
}
