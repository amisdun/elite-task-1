// import { DataSource } from "typeorm";
// import { Item } from "../entity/Item";
// import { Quantity } from "../entity/Quantity";

// const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

// export class TestHelper {
//   private static _instance: TestHelper;

//   private constructor() {}

//   public static get instance(): TestHelper {
//     if (!this._instance) this._instance = new TestHelper();

//     return this._instance;
//   }

//   private dbConnect!: DataSource;

//   getRepo(entity: string) {
//     return this.dbConnect.getRepository(entity);
//   }

//   async setupTestDB() {
//     this.dbConnect = new DataSource({
//       name: "unit-tests",
//       type: "postgres",
//       host: DB_HOST,
//       port: parseInt(DB_PORT),
//       username: DB_USER,
//       password: DB_PASS,
//       database: DB_NAME,
//       entities: [Item, Quantity],
//       synchronize: false,
//     });

//     await this.dbConnect.initialize();
//   }

//   teardownTestDB() {
//     if (this.dbConnect.isInitialized) this.dbConnect.destroy();
//   }
// }
