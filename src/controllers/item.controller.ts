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
      res.status(201).json(response);
      return;
    } catch (error) {
      res.status(400).json({ errors: error.message });
      return;
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
      res.status(200).json(response);
      return;
    } catch (error) {
      res.status(400).json({ errors: error.message });
      return;
    }
  }

  static async getItem(req: Request, res: Response) {
    try {
      const ItemServiceInstance = new ItemService(AppDataSource);
      const { item } = req.params;
      const response = await ItemServiceInstance.getItemService(item);
      res.status(200).json(response);
      return;
    } catch (error) {
      res.status(400).json({ errors: error.message });
      return;
    }
  }
}
