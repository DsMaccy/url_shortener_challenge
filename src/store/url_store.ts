import { singleton } from "tsyringe";
import { ShortUrl } from "../models/short_url";

// NOTE: Starting with in-memory, v2 => Postgres
@singleton()
export class UrlStore {
  private shortUrlBySlug: Map<string, ShortUrl> = new Map();

  public async getUrl(slug: string): Promise<ShortUrl | undefined> {
    return this.shortUrlBySlug.get(slug);
  }

  public async getAllUrls(limit: number, offset: number): Promise<ShortUrl[]> {
    return Array.from(this.shortUrlBySlug.values()).slice(
      offset,
      offset + limit
    );
  }

  public async createUrl(
    target: string,
    suggestedSlug?: string
  ): Promise<ShortUrl | null> {
    const slug = suggestedSlug ?? this.generateSlug();
    const shortUrl: ShortUrl = {
      slug,
      target,
      createdAt: new Date().toISOString(),
    };

    if (this.shortUrlBySlug.has(slug)) {
      return null;
    }
    this.shortUrlBySlug.set(slug, shortUrl);
    return shortUrl;
  }

  /**
   * @returns Slug with the following constraint: [a-z0-9]{6}
   */
  private generateSlug(): string {
    // TODO: Improve the randomization of this.
    return Math.random().toString(36).substring(2, 8);
  }
}
