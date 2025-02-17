import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Item } from "./Item";

@Entity()
export class Quantity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: "int" })
  quantity: number;

  @Column({ nullable: false, type: "bigint" })
  expiry: number;

  @ManyToOne(() => Item, (item) => item.quantities)
  item: Item;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
