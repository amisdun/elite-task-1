import { AppDataSource } from "./data-source";
import express from "express";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import { itemsRouter } from "./routes/items.route";
import * as cron from "node-cron";
import * as os from "os";
import cluster from "cluster";

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

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Master process ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker process ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  AppDataSource.initialize()
    .then(async () => {
      app.listen(PORT, () => {
        console.log(
          `Worker process ${process.pid} is listening on port ${PORT}`,
        );
        console.log("Server is running on http://localhost:" + PORT);
      });
      console.log("Data Source has been initialized!");
      cron.schedule(
        "0 */2 * * * ",
        new ItemService().periodicallyClearExpiredRecords,
      );
    })
    .catch((error) => console.log(error));
}
