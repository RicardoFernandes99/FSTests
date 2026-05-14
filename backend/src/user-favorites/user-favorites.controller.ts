import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from '../security/guards/jwt.guard';
import { UserFavoritesService } from './user-favorites.service';

type AuthenticatedRequest = Request & {
  user: {
    sub: number;
    role: string;
  };
};

@UseGuards(JwtGuard)
@Controller('favorites')
export class UserFavoritesController {
  constructor(private readonly userFavoritesService: UserFavoritesService) {}

  @Get()
  findAllForUser(@Req() req: AuthenticatedRequest) {
    return this.userFavoritesService.findAllForUser(req.user.sub);
  }

  @Post(':productId')
  addFavorite(
    @Req() req: AuthenticatedRequest,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.userFavoritesService.addFavorite(req.user.sub, productId);
  }

  @Delete(':productId')
  removeFavorite(
    @Req() req: AuthenticatedRequest,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.userFavoritesService.removeFavorite(req.user.sub, productId);
  }
}
