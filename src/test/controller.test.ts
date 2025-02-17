// import { TestHelper } from "./db-instance-helper";
// import { mockEntityManager } from "./mock-entity-manager";
// import * as httpMocks from "node-mocks-http";
// import { EntityNotFoundError } from "typeorm";
// import { mockDeep } from "jest-mock-extended";
// import { Item } from "../entity/Item";
// import { Quantity } from "../entity/Quantity";
// import { ItemController } from "../controllers/item.controller";
// import { ItemService } from "../services/items.services";

// jest.mock("@project/repositories/sample.repository");

// describe("SampleController Test", () => {
//   // Create a mock express request/response
//   let mockRequest = httpMocks.createRequest();
//   let mockResponse = httpMocks.createResponse();

//   beforeAll(async () => {
//     await TestHelper.instance.setupTestDB();
//   });

//   afterAll(() => {
//     TestHelper.instance.teardownTestDB();
//   });

//   beforeEach(() => {
//     // Anything else we need to mock?
//   });

//   // Resetting our request and any mocks done
//   // to the repository
//   afterEach(() => {
//     (ItemService as jest.Mock).mockClear();

//     mockRequest = httpMocks.createRequest();
//     mockResponse = httpMocks.createResponse();
//   });

//   describe("SampleController.get", async () => {
//     it("should return 404 due to entity not found", async () => {
//       mockRequest.params = {
//         item: "foo",
//       };
//       mockRequest.body = {};

//       // Here we force the repository to fail due to a not found error by TypeOrm
//       // The error type can be adjusted based on how your repository function behave
//       jest
//         .spyOn(ItemService.prototype, "addItemService")
//         .mockRejectedValueOnce(new EntityNotFoundError("Sample", { id: 1 }));

//       // Here we trigger the function
//       await ItemController.addItem(mockRequest, mockResponse);

//       // And testing our expected result
//       expect(mockResponse.statusCode).toEqual(404);
//       expect(mockResponse._getData()).toEqual("Sample not found.");
//     });

//     it("should return 200 with the sample object", async () => {
//       mockRequest.params = {
//         item: "",
//       };

//       const mockSample = mockDeep<Item>();

//       // jest
//       //   .spyOn(Item.prototype, "")
//       //   .mockResolvedValueOnce(mockSample);

//       // Here we trigger the function
//       await ItemController.getItem(mockRequest, mockResponse);

//       // And testing our expected result
//       // we can see if the repository is called with the right parameters
//       expect(
//         (ItemService as jest.Mock).mock.instances[0].findById,
//       ).toHaveBeenCalledWith(1);
//       expect(mockResponse.statusCode).toEqual(200);
//       expect(mockResponse._getData()).toEqual(mockSample);
//     });
//   });

//   describe("SampleController.create", async () => {
//     it("should return 200 and update Tier object", async () => {
//       const testInput = {
//         // name: "Test Sample",
//       };
//       const mockDBOutput = mockDeep<Item>(testInput);

//       mockRequest.body = testInput;

//       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//       // @ts-ignore
//       jest.spyOn(ItemService.prototype, "getManager").mockReturnValue({
//         transaction: jest.fn().mockImplementation(mockEntityManager),
//       });

//       expect(
//         (ItemService as jest.Mock).mock.instances[0].getManager,
//       ).toHaveBeenCalledTimes(1);
//       expect(mockResponse.statusCode).toEqual(200);
//       expect(mockResponse._isEndCalled()).toBeTruthy();
//     });
//   });
// });
