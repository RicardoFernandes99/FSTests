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

  @IsString()
  @MinLength(5)
  password!: string;

  @IsOptional()
  @IsIn(['Admin', 'User'])
  role?: string;
}

export class RegisterUserDto {
  @IsString()
  @MinLength(5)
  name!: string;

  @IsString()
  @MinLength(5)
  password!: string;

  @IsEmail()
  email!: string;

  @IsIn(['Admin', 'User'])
  role?: string;
}
