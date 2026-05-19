import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login-admin')
  async loginAdmin(
    @Body() { email, password }: { email: string; password: string },
  ) {
    return await this.authService.loginAdmin(email, password);
  }
  @Post('login-user')
  async loginUser(
    @Body() { mat_no, password }: { mat_no: string; password: string },
  ) {
    return await this.authService.loginUser(mat_no, password);
  }
}
