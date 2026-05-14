import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../security/guards/jwt.guard';
import { CreateProductDto } from './create-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.productService.findAll();
  }
  @UseGuards(JwtGuard)
  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }
}
