import { Request, Response } from "express";
import { ItemService } from "../services/items.services";
import { validationResult } from "express-validator";

export class ItemController {
  static async addItem(req: Request, res: Response) {
    try {
      const ItemServiceInstance = new ItemService();
      const { quantity, expiry } = req.body;
      const { item } = req.params;
      const response = await ItemServiceInstance.addItemService({
        item,
        quantity,
        expiry,
      });
      return res.status(201).json(response);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async sellItem(req: Request, res: Response) {
    try {
      const ItemServiceInstance = new ItemService();
      const { quantity } = req.body;
      const { item } = req.params;
      const response = await ItemServiceInstance.sellItemService({
        item,
        quantity,
      });
      return res.status(201).json(response);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async getItem(req: Request, res: Response) {
    try {
      const ItemServiceInstance = new ItemService();
      const { item } = req.params;
      const response = await ItemServiceInstance.getItemService(item);
      return res.status(201).json(response);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
