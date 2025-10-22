import { container } from "tsyringe";
import { UrlStore } from "./store/url_store";
import { RedirectController } from "./controllers/redirect_controller";
import { UrlController } from "./controllers/url_controller";
import { RedirectService } from "./services/redirect_service";
import { StatsService } from "./services/stats_service";
import { UrlService } from "./services/url_service";
import { StatsStore } from "./store/stats_store";
import { StoreTypes } from "./models/registration_types";
import { ServiceTypes } from "./models/registration_types";
import { ControllerTypes } from "./models/registration_types";

export function registerContainer() {
  // Stores
  container.registerSingleton(StoreTypes.UrlStore, UrlStore);
  container.registerSingleton(StoreTypes.StatsStore, StatsStore);

  // Services
  container.registerSingleton(ServiceTypes.UrlService, UrlService);
  container.registerSingleton(ServiceTypes.StatsService, StatsService);
  container.registerSingleton(ServiceTypes.RedirectService, RedirectService);

  // Controllers
  container.registerSingleton(ControllerTypes.UrlController, UrlController);
  container.registerSingleton(
    ControllerTypes.RedirectController,
    RedirectController
  );
}
