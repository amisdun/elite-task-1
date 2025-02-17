import * as express from "express";
import { ItemController } from "../controllers/item.controller";
import { body, param, validationResult } from "express-validator";
const Router = express.Router();

const checkValidationErrors = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(422).json(result);
  }
  next();
};

Router.post(
  "/:item/add",
  body("quantity").notEmpty().isNumeric(),
  body("expiry").notEmpty().isNumeric(),
  param("item").notEmpty().isString(),
  checkValidationErrors,
  ItemController.addItem,
);
Router.post(
  "/:item/sell",
  body("quantity").notEmpty().isNumeric(),
  param("item").notEmpty().isString(),
  checkValidationErrors,
  ItemController.sellItem,
);
Router.get(
  "/:item/quantity",
  param("item").notEmpty().isString(),
  checkValidationErrors,
  ItemController.getItem,
);

export { Router as itemsRouter };
