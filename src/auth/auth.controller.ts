import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
@Throttle({ default: { limit: 5, ttl: 60 } }) // 5 inscriptions / minute
  @ApiOperation({ summary: 'Créer un nouveau compte utilisateur' })
  async register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @Post('login')
@Throttle({ default: { limit: 3, ttl: 15 } }) // 3 tentatives / 15 secondes
  @ApiOperation({ summary: 'Connexion avec email + mot de passe' })
async login(@Body() dto: LoginDto) {
  return this.authService.login(dto);
  }

  
}
