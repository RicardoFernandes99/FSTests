import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateProductDto } from './create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  findAll() {
    return this.productRepository.find({ order: { id: 'DESC' } });
  }

  async create(dto: CreateProductDto) {
    const product = this.productRepository.create(dto);
    return this.productRepository.save(product);
  }
}
