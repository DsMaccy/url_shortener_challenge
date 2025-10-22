import { Router } from "express";
import { container } from "tsyringe";
import { RedirectController } from "../controllers/redirect_controller";

const router = Router();
const redirectController = container.resolve(RedirectController);

router.get("/:slug", (req, res) => redirectController.redirectUrl(req, res));

export default router;
