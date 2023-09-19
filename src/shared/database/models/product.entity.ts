import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Category } from './category.entity';
import { Promotion } from './promotion.entity';
import { ProductOrder } from './product_orders.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ManyToMany(() => Promotion, (promotion) => promotion.products)
  @JoinTable()
  promotions: Promotion[];

  @OneToMany(() => ProductOrder, (productOrder) => productOrder.productId)
  productOrders: ProductOrder[];
}
