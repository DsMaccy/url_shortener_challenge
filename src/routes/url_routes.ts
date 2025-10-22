import { Router } from "express";
import { container } from "tsyringe";
import { UrlController } from "../controllers/url_controller";
import { Request, Response } from "express";
import { validateBody, validateParams } from "../middleware/validation";
import {
  CreateUrlRequestBody,
  createUrlRequestSchema,
} from "../models/requests/create_url";
import { getUrlsRequestSchema } from "../models/requests/get_urls";

const router = Router();
const urlController = container.resolve<UrlController>(UrlController);

router.get("/", validateParams(getUrlsRequestSchema), (req, res) =>
  urlController.getUrls(req, res)
);

router.get("/:slug", (req, res) => urlController.getUrl(req, res));

router.post(
  "/",
  validateBody(createUrlRequestSchema),
  (req: Request<any, any, CreateUrlRequestBody>, res: Response) =>
    urlController.createUrl(req, res)
);

router.get("/:slug/stats", (req: Request<{ slug: string }>, res: Response) =>
  urlController.getStats(req, res)
);

export default router;
