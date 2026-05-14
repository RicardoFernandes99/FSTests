import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Product } from './Products/product.entity';
import { ProductsModule } from './Products/products.module';
import { UserFavorite } from './user-favorites/user-favorite.entity';
import { UserFavoritesModule } from './user-favorites/user-favorites.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Product, UserFavorite],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    UserFavoritesModule,
  ],
})
export class AppModule {}
