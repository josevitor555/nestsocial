import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(pass, user.passwordHash);
    if (isMatch) {
      const { passwordHash, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userData: any) {
    const { email, password, name } = userData;

    // Verificar se o usuário existe
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('E-mail já está em uso.');
    }

    // Criar o hash
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = await this.usersService.create({
      name,
      email,
      passwordHash
    });

    const { passwordHash: _, ...result } = newUser.toObject();
    return result;
  }

  async deleteAccount(userId: string) {
    return this.usersService.remove(userId);
  }

  async updateAccount(userId: string, updateData: any) {
    if (updateData.email) {
      const existingUser = await this.usersService.findByEmail(updateData.email);
      if (existingUser && existingUser._id.toString() !== userId) {
        throw new BadRequestException('E-mail já está em uso.');
      }
    }

    const updatedUser = await this.usersService.update(userId, updateData);
    if (!updatedUser) {
      throw new BadRequestException('Usuário não encontrado.');
    }

    const { passwordHash: _, ...result } = updatedUser.toObject();
    return result;
  }
}
