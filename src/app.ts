import "reflect-metadata"; // Must be imported once at the top

import express from "express";
import urlRoutes from "./routes/url_routes";
import rootRoutes from "./routes/root_routes";
import { registerContainer } from "./container_registration";
import rateLimit from "express-rate-limit";
import { MAX_REQUESTS, MAX_TIME_WINDOW_IN_MS } from "./utils/constants";
import { errorHandler } from "./middleware/error_handler";
import morgan from "morgan";
import { createErrorResponse } from "./utils/express_utils";
import { ErrorCodes } from "./models/error";

const app = express();
const port = 3000;

registerContainer();

app.use(express.json());

app.use(morgan("dev"));

app.use(
  rateLimit({
    windowMs: MAX_TIME_WINDOW_IN_MS,
    max: MAX_REQUESTS,
    message: "Rate limit exceeded",
    handler: (req, res) => {
      return createErrorResponse(
        res,
        ErrorCodes.RATE_LIMITED,
        "Rate limit exceeded"
      );
    },
  })
);

app.use("/urls", urlRoutes);
app.use("/", rootRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
