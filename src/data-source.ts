import "reflect-metadata";
import { DataSource } from "typeorm";

import * as dotenv from "dotenv";
import { Quantity } from "./entity/Quantity";
import { Item } from "./entity/Item";

dotenv.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV } =
  process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: parseInt(DB_PORT || "5432"),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: true,
  //logging logs sql command on the treminal
  logging: NODE_ENV === "dev" ? false : false,
  entities: [Quantity, Item],
  migrations: [__dirname + "/migration/*.ts"],
  subscribers: [],
  migrationsRun: true,
});
