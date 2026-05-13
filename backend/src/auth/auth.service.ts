import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { RegisterUserDto } from 'src/users/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './Login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterUserDto) {
    const existUser = await this.usersService.findByEmail(dto.email);
    if (existUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPass = await bcrypt.hash(dto.password, 10);

    const user = await this.usersService.create({
      name: dto.name,
      email: dto.email,
      password: hashedPass,
      role: dto.role,
    });
    return user;
  }

  async login(dto: LoginDto) {
    const existUser = await this.usersService.findByEmail(dto.email);
    if (!existUser) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (!(await bcrypt.compare(dto.password, existUser.password))) {
      throw new UnauthorizedException('Wrong Password');
    }
    const jwtPayload = {
      sub: existUser.id,
      role: existUser.role,
    };
    const accessToken = await this.jwtService.signAsync(jwtPayload);

    return accessToken;
  }

  async me(accessToken: string) {
    if (!accessToken) {
      throw new UnauthorizedException('No access token provided');
    }
    try {
      const payload = await this.jwtService.verifyAsync(accessToken);
      const user = await this.usersService.findById(payload.sub);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid access token');
    }
  }
}
