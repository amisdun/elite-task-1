import bodyParser from "body-parser";
import { AppDataSource } from "../../data-source";
import { itemsRouter } from "../../routes/items.route";
import express, { Request, Response } from "express";
const app = express();

export const startTestServerOnInMemoryDB = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("", itemsRouter);
  app.get("*", (req: Request, res: Response) => {
    res.status(505).json({ message: "Bad Request" });
  });
  const server = app.listen(8082, () => {});

  return { AppDataSource, server };
};
