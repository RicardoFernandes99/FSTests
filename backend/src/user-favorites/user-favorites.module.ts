import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../Products/product.entity';
import { SecurityModule } from '../security/security.module';
import { UserFavorite } from './user-favorite.entity';
import { UserFavoritesController } from './user-favorites.controller';
import { UserFavoritesService } from './user-favorites.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserFavorite, Product]),
    SecurityModule,
  ],
  controllers: [UserFavoritesController],
  providers: [UserFavoritesService],
  exports: [UserFavoritesService],
})
export class UserFavoritesModule {}
