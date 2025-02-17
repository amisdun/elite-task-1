import { Request, Response } from "express";
import { ItemService } from "../services/items.services";
import { AppDataSource } from "../data-source";

export class ItemController {
  static async addItem(req: Request, res: Response) {
    try {
      const ItemServiceInstance = new ItemService(AppDataSource);
      const { quantity, expiry } = req.body;
      const { item } = req.params;
      const response = await ItemServiceInstance.addItemService({
        item,
        quantity,
        expiry,
      });
      return res.status(201).json(response);
    } catch (error) {
      return res.status(400).json({ errors: error.message });
    }
  }

  static async sellItem(req: Request, res: Response) {
    try {
      const ItemServiceInstance = new ItemService(AppDataSource);
      const { quantity } = req.body;
      const { item } = req.params;
      const response = await ItemServiceInstance.sellItemService({
        item,
        quantity,
      });
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({ errors: error.message });
    }
  }

  static async getItem(req: Request, res: Response) {
    try {
      const ItemServiceInstance = new ItemService(AppDataSource);
      const { item } = req.params;
      const response = await ItemServiceInstance.getItemService(item);
      return res.status(201).json(response);
    } catch (error) {
      return res.status(400).json({ errors: error.message });
    }
  }
}
