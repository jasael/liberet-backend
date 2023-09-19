import { Injectable } from '@nestjs/common';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Promotion } from 'src/shared/database/models/promotion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PromotionsService {
  constructor(
    @InjectRepository(Promotion)
    private readonly promotionRepository: Repository<Promotion>,
  ) {}

  create(createPromotionDto: CreatePromotionDto) {
    const promotion = this.promotionRepository.create(createPromotionDto);

    return this.promotionRepository.save(promotion);
  }

  findAll() {
    return this.promotionRepository
      .createQueryBuilder('promotion')
      .leftJoinAndSelect('promotion.products', 'product')
      .select('promotion')
      .addSelect('product.id')
      .where('promotion.active = :active', { active: true })
      .getMany();
  }

  findOne(id: number) {
    return this.promotionRepository.findOne({ where: { id } });
  }

  update(id: number, updatePromotionDto: UpdatePromotionDto) {
    return this.promotionRepository.update(id, updatePromotionDto);
  }

  remove(id: number) {
    return this.promotionRepository.delete(id);
  }
}
