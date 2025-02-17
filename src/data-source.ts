import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";

import * as dotenv from "dotenv";
import { Quantity } from "./entity/Quantity";
import { Item } from "./entity/Item";
import { PGliteDriver } from "typeorm-pglite";

dotenv.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV } =
  process.env;
const dataBaseOptions: DataSourceOptions = {
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
  entities: [Quantity, Item],
  migrations: [__dirname + "/migration/*.ts"],
  subscribers: [],
  migrationsRun: true,
};

// in-memory database for integration tests
const testDataBaseOptions: DataSourceOptions = {
  type: "postgres",
  driver: new PGliteDriver().driver,
  synchronize: true,
  logging: false,
  entities: [Item, Quantity],
  logNotifications: false,
  database: "elite-test",
};

const options: DataSourceOptions =
  NODE_ENV === "test" ? testDataBaseOptions : dataBaseOptions;

export const AppDataSource = new DataSource(options);
