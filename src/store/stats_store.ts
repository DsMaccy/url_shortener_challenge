import { singleton } from "tsyringe";
import { ClickEvent } from "../models/click_event";

// NOTE: Starting with in-memory, v2 => Postgres
@singleton()
export class StatsStore {
  private clickEventsBySlug: Map<string, ClickEvent[]> = new Map();

  public async getClickEvents(slug: string): Promise<ClickEvent[]> {
    return this.clickEventsBySlug.get(slug) ?? [];
  }

  public async addClickEvent(
    slug: string,
    clickEvent: ClickEvent
  ): Promise<void> {
    const clickEvents = this.clickEventsBySlug.get(slug) ?? [];
    clickEvents.push(clickEvent);
    this.clickEventsBySlug.set(slug, clickEvents);
  }
}
