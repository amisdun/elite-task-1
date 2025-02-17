import { AppDataSource } from "./data-source";
import * as express from "express";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import { itemsRouter } from "./routes/items.route";
import * as cron from "node-cron";

import "reflect-metadata";
import { ItemService } from "./services/items.services";
dotenv.config();

const app = express();
app.use(express.json());
const { PORT = 3000 } = process.env;
app.use("", itemsRouter);
app.get("*", (req: Request, res: Response) => {
  res.status(505).json({ message: "Bad Request" });
});

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
    console.log("Data Source has been initialized!");
    cron.schedule(
      "0 */2 * * * ",
      new ItemService().periodicallyClearExpiredRecords,
    );
  })
  .catch((error) => console.log(error));
