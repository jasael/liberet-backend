import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Promotion } from './promotion.entity';
import { ProductOrder } from './product_orders.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  total: number;

  @Column()
  discount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Promotion)
  @JoinTable()
  promotions: Promotion[];

  @OneToMany(() => ProductOrder, (productOrder) => productOrder.orderId)
  productOrders: ProductOrder[];
}
