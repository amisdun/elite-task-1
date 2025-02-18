import { ItemController } from "../controllers/item.controller";
import { body, param, validationResult } from "express-validator";
import {
  NextFunction,
  Request,
  Response,
  Router as ExpressRouter,
} from "express";
const Router = ExpressRouter();

const checkValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(422).json(result);
    return;
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
