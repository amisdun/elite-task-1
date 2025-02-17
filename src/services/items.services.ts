import { EntityManager, Raw } from "typeorm";
import { AppDataSource } from "../data-source";
import { Item } from "../entity/Item";
import { Quantity } from "../entity/Quantity";

export class ItemService {
  private quantityRepository = AppDataSource.getRepository(Quantity);
  private itemRepository = AppDataSource.getRepository(Item);

  async addItemService({
    item,
    quantity,
    expiry,
  }: {
    item: string;
    quantity: number;
    expiry: number;
  }) {
    try {
      let itemData: Item = await this.itemRepository.findOne({
        where: { name: item.toLowerCase() },
      });

      if (!itemData) {
        itemData = (
          await this.itemRepository.insert({ name: item.toLowerCase() })
        ).raw[0];
      }

      await this.quantityRepository.insert({
        quantity,
        expiry,
        item: { id: itemData.id },
      });

      return {};
    } catch (error) {
      throw error;
    }
  }

  async sellItemService({
    item,
    quantity,
  }: {
    item: string;
    quantity: number;
  }) {
    try {
      const dateNow = Date.now();
      return await AppDataSource.transaction(
        async (entityManager: EntityManager) => {
          const itemData = await entityManager.findOne(Item, {
            where: { name: item.toLowerCase() },
          });

          const data = await entityManager
            .getRepository(Quantity)
            .createQueryBuilder()
            .where({
              item: itemData,
              expiry: Raw((x) => `${x} > ${dateNow}`),
              quantity: Raw((y) => `${y} >= ${quantity}`),
            })
            .setLock("pessimistic_read")
            .setOnLocked("skip_locked")
            .orderBy("id", "ASC")
            .getOne();

          if (!data) throw Error("Item has expired or low in quantity");

          data.quantity -= quantity;
          await entityManager.save(data);

          return {};
        },
      );
    } catch (error) {
      throw error;
    }
  }

  async getItemService(item: string) {
    try {
      const dateNow = Date.now();

      const itemData = await this.itemRepository.findOne({
        where: { name: item.toLowerCase() },
      });

      const totalQuantity = await this.quantityRepository.sum("quantity", {
        item: { id: itemData.id },
        expiry: Raw((x) => `${x} > ${dateNow}`),
      });

      if (!totalQuantity)
        return { quantity: totalQuantity || 0, validTill: null };

      const validTill = await AppDataSource.getRepository(Quantity)
        .createQueryBuilder()
        .where({ item: itemData, expiry: Raw((x) => `${x} > ${dateNow}`) })
        .orderBy("id", "ASC")
        .getOne();

      return {
        quantity: totalQuantity,
        validTill: parseInt(validTill.expiry as unknown as string),
      };
    } catch (error) {
      throw error;
    }
  }

  async periodicallyClearExpiredRecords() {
    try {
      const dateNow = Date.now();
      await this.quantityRepository.delete({
        expiry: Raw((x) => `${x} > ${dateNow}`),
      });
    } catch (error) {
      throw error;
    }
  }
}
