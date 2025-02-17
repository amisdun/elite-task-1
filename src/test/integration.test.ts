import { startTestServerOnInMemoryDB } from "./helpers/test-server";
import supertest from "supertest";
import TestAgent from "supertest/lib/agent";
import { ItemService } from "../services/items.services";
const { server, AppDataSource } = startTestServerOnInMemoryDB();
describe("Items And Quanity Test", () => {
  // Create a mock express request/response
  let request: TestAgent;
  beforeAll(async () => {
    await AppDataSource.initialize();
    request = supertest(server);
  });

  afterAll(async () => {
    await AppDataSource.destroy();
    server.close();
  });

  describe("Test Add Item", () => {
    it("should return error if some fields are missing", async () => {
      const url = "/foo/add";
      const response = await request.post(url).send({});
      console.log(response.body);

      expect(response.body.errors).toBeDefined();
      expect(response.status).toEqual(422);
      expect(response.body).toHaveProperty("errors");
      response.body.errors.forEach(({ path, msg }) => {
        expect(msg).toBe("Invalid value");
      });
    });

    it("should return {} and 201 if a new item is created", async () => {
      const body = {
        quantity: 10,
        expiry: Date.now() + 1000,
      };
      const url = "/foo/add";
      const response = await request.post(url).send(body);
      console.log(response.body);

      expect(response.body).toMatchObject({});
      expect(response.status).toEqual(201);
    });

    it("should throw an error if value for expiry is invalid", async () => {
      const body = {
        quantity: 10,
        expiry: 1739819762286,
      };
      const url = "/foo/add";
      const response = await request.post(url).send(body);
      expect(response.body.errors).toBeDefined();
      expect(response.status).toEqual(400);
      expect(response.body.errors).toBe(
        "quantity has already expired, please specify a valid expiry",
      );
    });
  });

  describe("Test Sell Item", () => {
    it("should return 422 with missing fields", async () => {
      const body = {};
      const url = "/foo/sell";
      const response = await request.post(url).send(body);

      expect(response.body).toHaveProperty("errors");
      expect(response.status).toEqual(422);
      response.body.errors.forEach(({ path, msg }) => {
        expect(msg).toBe("Invalid value");
      });
    });

    it("should return status code 200 and {}", async () => {
      const body = {
        quantity: 5,
      };
      const url = "/foo/sell";

      await new ItemService(AppDataSource).addItemService({
        item: "foo",
        quantity: 10,
        expiry: Date.now() + 20_000,
      });

      const response = await request.post(url).send(body);

      expect(response.body).toMatchObject({});
      expect(response.status).toEqual(200);
    });

    it("should throw an error if quantity to sell is not available", async () => {
      const body = {
        quantity: 50,
      };
      const url = "/foo/sell";

      await new ItemService(AppDataSource).addItemService({
        item: "foo",
        quantity: 10,
        expiry: Date.now() + 20_000,
      });

      const response = await request.post(url).send(body);

      expect(response.body.errors).toBeDefined();
      expect(response.status).toEqual(400);
      expect(response.body.errors).toBe("Items has expired or low in quantity");
    });
  });

  describe("Get Available Items", () => {
    it("should return total number of quantity available ", async () => {
      const body = {
        quantity: 50,
      };
      const url = "/foo/sell";

      await new ItemService(AppDataSource).addItemService({
        item: "foo",
        quantity: 10,
        expiry: Date.now() + 20_000,
      });

      const response = await request.post(url).send(body);

      expect(response.body.errors).toBeDefined();
      expect(response.status).toEqual(400);
      expect(response.body.errors).toBe("Items has expired or low in quantity");
    });
  });
});
