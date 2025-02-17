import * as express from "express";
import { ItemController } from "../controllers/item.controller";
import { body, param } from "express-validator";
const Router = express.Router();
const ItemControllerInstance = new ItemController();

Router.post(
  "/:item/add",
  body(["quantity", "expiry"]).notEmpty().isNumeric(),
  param("item").notEmpty().isString(),
  ItemControllerInstance.addItem,
);
Router.post(
  "/:item/sell",
  body("quantity").notEmpty().isNumeric(),
  param("item").notEmpty().isString(),
  ItemControllerInstance.sellItem,
);
Router.get(
  "/:item/quantity",
  param("item").notEmpty().isString(),
  ItemControllerInstance.getItem,
);

export { Router as itemsRouter };
