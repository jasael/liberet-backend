import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from './product.entity';
import { Order } from './order.entity';

@Entity()
export class ProductOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.productOrders)
  productId: Product;

  @ManyToOne(() => Order, (order) => order.productOrders)
  orderId: Order;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  total: number;

  @Column()
  discount: number;
}
