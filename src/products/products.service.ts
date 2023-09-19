import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/shared/database/models/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  findAll() {
    return this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect(
        'product.promotions',
        'promotion',
        'promotion.active = :active',
        { active: true },
      )
      .orderBy('product.id', 'ASC')
      .addOrderBy('promotion.priority', 'DESC')
      .getMany();
  }

  findOne(id: number) {
    return this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect(
        'product.promotions',
        'promotion',
        'promotion.active = :active',
        { active: true },
      )
      .where('product.id = :id', { id })
      .orderBy('product.id', 'ASC')
      .addOrderBy('promotion.priority', 'DESC')
      .getOne();
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productRepository.update(id, updateProductDto);
  }

  remove(id: number) {
    return this.productRepository.delete(id);
  }
}
