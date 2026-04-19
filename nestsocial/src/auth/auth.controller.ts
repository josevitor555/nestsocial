import { Controller, Post, Body, UnauthorizedException, HttpCode, HttpStatus, Get, Request, UseGuards, Delete, Patch, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { CreateUserSchema, LoginSchema, UpdateUserSchema } from '../users/validations/user.validation';
import type { CreateUserDto, LoginDto, UpdateUserDto } from '../users/validations/user.validation';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  @UsePipes(new ZodValidationPipe(CreateUserSchema))
  async register(@Body() body: CreateUserDto) {
    return this.authService.register(body);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UsePipes(new ZodValidationPipe(LoginSchema))
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req: any) {
    // req.user é injetado pelo Passport via JwtStrategy
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('me')
  async deleteAccount(@Request() req: any) {
    // O id do usuário está no sub do payload do JWT, que o Passport coloca em req.user.userId ou similar
    // Dependendo de como o JwtStrategy foi configurado.
    // Vamos verificar como o payload é mapeado no JwtStrategy.
    return this.authService.deleteAccount(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  @UsePipes(new ZodValidationPipe(UpdateUserSchema))
  async updateAccount(@Request() req: any, @Body() body: UpdateUserDto) {
    return this.authService.updateAccount(req.user.userId, body);
  }
}