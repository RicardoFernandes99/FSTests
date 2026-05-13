import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/create-user.dto';
import { LoginDto } from './Login.dto';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const accessToken = await this.authService.login(dto);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      maxAge: 1000 * 60 * 60,
    });

    return { message: 'Logged in' };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    if (!res.req.cookies['accessToken']) {
      return { message: 'Already logged out' };
    }
    res.clearCookie('accessToken', {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
    });
    return { message: 'Logged out' };
  }

  @Get('me')
  async me(@Res({ passthrough: true }) res: Response) {
    const accessToken = res.req.cookies['accessToken'];
    return this.authService.me(accessToken);
  }
}
