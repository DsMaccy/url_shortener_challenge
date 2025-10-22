import "reflect-metadata"; // Must be imported once at the top
import express from "express";
import urlRoutes from "./routes/url_routes";
import rootRoutes from "./routes/root_routes";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/", rootRoutes);
app.use("/urls", urlRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
