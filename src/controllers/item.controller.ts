import { Request, Response } from "express";
import { ItemService } from "../services/items.services";

const ItemServiceInstance = new ItemService();

export class ItemController {
  async addItem(req: Request, res: Response) {
    try {
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

  async sellItem(req: Request, res: Response) {
    try {
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

  async getItem(req: Request, res: Response) {
    try {
      const { item } = req.params;
      const response = await ItemServiceInstance.getItemService(item);
      return res.status(201).json(response);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
