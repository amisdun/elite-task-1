import { startTestServerOnInMemoryDB } from "./helpers/test-server";
import supertest from "supertest";
import TestAgent from "supertest/lib/agent";
import { ItemService } from "../services/items.services";
const { server, AppDataSource } = startTestServerOnInMemoryDB();
describe("Items And Quanity Test", () => {
  // Create a mock express request/response
  let request: TestAgent;
  beforeAll(async () => {
    // initiate in memory database for tests
    await AppDataSource.initialize();
    request = supertest(server);
  });

  afterAll(async () => {
    await AppDataSource.destroy();
    server.close();
  });

  const time_1 = Date.now() + 10_000;
  const time_2 = Date.now() + 12_000;
  const time_3 = Date.now() + 14_000;
  const time_4 = Date.now() + 16_000;
  const time_5 = Date.now() + 18_000;

  describe("Test Add Item", () => {
    it("should return error if some fields are missing", async () => {
      const url = "/foo/add";
      const response = await request.post(url).send({});

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
        expiry: time_1,
      };
      const url = "/foo/add";
      const response = await request.post(url).send(body);

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
    it("should return status code 422 when there are missing fields", async () => {
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
        expiry: time_2,
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
        expiry: time_3,
      });

      const response = await request.post(url).send(body);

      expect(response.body.errors).toBeDefined();
      expect(response.status).toEqual(400);
      expect(response.body.errors).toBe("low in quantity");
    });
  });

  describe("Get Available Items", () => {
    it("should return total number of quantity available ", async () => {
      const url = "/foo/quantity";

      const times = [time_4, time_5];

      times.forEach(async (time) => {
        await new ItemService(AppDataSource).addItemService({
          item: "foo",
          quantity: 10,
          expiry: time,
        });
      });

      const response_1 = await request.get(url).send();

      expect(response_1.body.quantity).toBeDefined();
      expect(response_1.body.validTill).toBeDefined();
      expect(response_1.body).toMatchObject({
        quantity: 45,
        validTill: time_1,
      });
      expect(response_1.status).toEqual(200);

      await new ItemService(AppDataSource).sellItemService({
        item: "foo",
        quantity: 20,
      });

      const response_2 = await request.get(url).send();

      expect(response_2.body.quantity).toBeDefined();
      expect(response_2.body.validTill).toBeDefined();
      expect(response_2.body).toMatchObject({
        quantity: 25,
        validTill: time_1,
      });
      expect(response_2.status).toEqual(200);

      await new ItemService(AppDataSource).sellItemService({
        item: "foo",
        quantity: 20,
      });

      const response_3 = await request.get(url).send();

      expect(response_3.body.quantity).toBeDefined();
      expect(response_3.body.validTill).toBeDefined();
      expect(response_3.body).toMatchObject({
        quantity: 5,
        validTill: time_1,
      });
      expect(response_3.status).toEqual(200);

      await new ItemService(AppDataSource).sellItemService({
        item: "foo",
        quantity: 5,
      });

      const response_4 = await request.get(url).send();

      expect(response_4.body.quantity).toBeDefined();
      expect(response_4.body.validTill).toBeDefined();
      expect(response_4.body).toMatchObject({
        quantity: 0,
        validTill: null,
      });
      expect(response_4.status).toEqual(200);
    });
  });
});
