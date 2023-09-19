import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from './product.entity';
import { Promotion } from './promotion.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  // relation with Promotion -> one category can have many promotions
  @OneToMany(() => Promotion, (promotion) => promotion.category_free)
  promotions: Promotion[];
}
