import {
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(5)
  name!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @IsIn(['Admin', 'User'])
  role?: string;
}
