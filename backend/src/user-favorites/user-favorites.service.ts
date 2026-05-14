import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../Products/product.entity';
import { UserFavorite } from './user-favorite.entity';

@Injectable()
export class UserFavoritesService {
  constructor(
    @InjectRepository(UserFavorite)
    private readonly userFavoriteRepository: Repository<UserFavorite>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAllForUser(userId: number) {
    return this.userFavoriteRepository.find({
      where: { userId },
      relations: { product: true },
      order: { createdAt: 'DESC' },
    });
  }

  async addFavorite(userId: number, productId: number) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const existingFavorite = await this.userFavoriteRepository.findOne({
      where: { userId, productId },
    });

    if (existingFavorite) {
      throw new ConflictException('Product already favorited');
    }

    const favorite = this.userFavoriteRepository.create({
      userId,
      productId,
    });

    return this.userFavoriteRepository.save(favorite);
  }

  async removeFavorite(userId: number, productId: number) {
    const result = await this.userFavoriteRepository.delete({
      userId,
      productId,
    });

    if (!result.affected) {
      throw new NotFoundException('Favorite not found');
    }

    return { deleted: true };
  }
}
