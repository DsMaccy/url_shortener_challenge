import { singleton } from "tsyringe";
import { ClickEvent } from "../models/click_event";
import { StatsStore } from "../store/stats_store";
import { Stats } from "../models/stats";

@singleton()
export class StatsService {
  constructor(private readonly statsStore: StatsStore) {}

  public async getClickEvents(slug: string) {
    return this.statsStore.getClickEvents(slug);
  }

  public async addClickEvent(slug: string, clickEvent: ClickEvent) {
    return this.statsStore.addClickEvent(slug, clickEvent);
  }

  public async getStats(slug: string): Promise<Stats> {
    const clickEvents = await this.statsStore.getClickEvents(slug);

    const clicksByIpAddress = new Map<string, number>();
    const clicksByUserAgent = new Map<string, number>();
    for (const clickEvent of clickEvents) {
      clicksByIpAddress.set(
        clickEvent.ip ?? "uknown",
        (clicksByIpAddress.get(clickEvent.ip ?? "") ?? 0) + 1
      );
      clicksByUserAgent.set(
        clickEvent.userAgent ?? "uknown",
        (clicksByUserAgent.get(clickEvent.userAgent ?? "") ?? 0) + 1
      );
    }

    const byDay = clickEvents.reduce((acc, clickEvent) => {
      const date = clickEvent.timestamp.split("T")[0];
      acc[date] = (acc[date] ?? 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      slug,
      totalClicks: clickEvents.length,
      byDay: Object.entries(byDay).map(([date, count]) => ({ date, count })),
      lastClickAt:
        clickEvents.length > 0
          ? clickEvents[clickEvents.length - 1].timestamp
          : null,
    };
  }
}
