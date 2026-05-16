import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login-admin')
  async loginAdmin(email: string, password: string) {
    return await this.authService.loginAdmin(email, password);
  }
  @Post('login-user')
  async loginUser(email: string, password: string) {
    return await this.authService.loginUser(email, password);
  }
}
