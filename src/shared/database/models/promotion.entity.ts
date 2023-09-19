import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { Category } from './category.entity';
import { Product } from './product.entity';

export enum Priority {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
  VERY_HIGH = 4,
  ULTRA_HIGH = 5,
}

export enum PromotionType {
  PERCENTAGE = 'percentage',
  BUY_CARRY = 'buy_carry',
  BUY_N_CARRY_M = 'buy_n_carry_m',
  MIN_AMOUNT = 'min_amount',
}

@Entity()
export class Promotion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: PromotionType,
    default: PromotionType.PERCENTAGE,
  })
  promotion_type: PromotionType;

  @Column({ nullable: true })
  discount: number;

  @Column({ nullable: true })
  quantity_items_purchased: number;

  @Column({ nullable: true })
  quantity_items_paid: number;

  // relation with Category -> one promotion can have one category and one category can have many promotions
  @ManyToOne(() => Category, (category) => category.promotions)
  category_free: Category;

  @ManyToMany(() => Product, (product) => product.promotions)
  products: Product[];

  @Column()
  min_amount: number;

  @Column({ type: 'enum', enum: Priority })
  priority: Priority;

  @Column({ default: false })
  active: boolean;
}
