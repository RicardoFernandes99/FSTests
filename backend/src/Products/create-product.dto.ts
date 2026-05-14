import { IsDecimal, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(5)
  name!: string;

  @IsNumber()
  quantity!: number;

  @IsDecimal({ decimal_digits: '2', force_decimal: true })
  price!: number;
}
