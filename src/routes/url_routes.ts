import { Router } from "express";
import { container } from "tsyringe";
import { UrlController } from "../controllers/url_controller";

const router = Router();
const urlController = container.resolve(UrlController);

router.get(
  "/",
  (req: Express.Request, res: Express.Response) => console.log(req)
  //   urlController.getUrls(req, res)
);

export default router;
