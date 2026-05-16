import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, ResetPasswordDto } from 'src/users/dto/user-dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('find-all-users')
  async findAllUsers(
    @Query('level') level?: string,
    @Query('department') department?: string,
  ) {
    return await this.usersService.findAllUsers(level, department);
  }

  @Get('find-one-user')
  async findOneUser(@Query('mat_no') mat_no: string) {
    return await this.usersService.findOneUser(mat_no);
  }
  @Post('create-user')
  async createUser(@Body() body: CreateUserDto) {
    return await this.usersService.createUser(body);
  }
  @Get('v1/test')
  async test() {
    return await this.usersService.test();
  }

  @Delete('delete-user')
  async deleteUser(@Query('mat_no') mat_no: string) {
    return await this.usersService.deleteUser(mat_no);
  }

  @Post('update-user')
  async updateUser(
    @Query('mat_no') mat_no: string,
    @Body() body: Partial<CreateUserDto>,
  ) {
    return await this.usersService.updateUser(mat_no, body);
  }
  @Post('create-password')
  async createPassword(
    @Query('mat_no') mat_no: string,
    @Body() body: { password: string },
  ) {
    return await this.usersService.createPasswordHashAndUpdateUser(
      mat_no,
      body.password,
    );
  }
  @Get('total-users')
  async getTotalNumberOfUsers() {
    return await this.usersService.getTotalNumberOfUsers();
  }
  @Get('generate-otp')
  async generateOtp(@Query('user_id', ParseIntPipe) user_id: number) {
    return await this.usersService.sendOtp(user_id);
  }
  @Post('reset-password')
  async resetPassword(@Body() data: ResetPasswordDto) {
    return await this.usersService.resetPassword(data);
  }
  @Get('verify-mat-no')
  async verifyMatNumber(@Query('mat_no') mat_no: string) {
    return await this.usersService.verifyMatNo(mat_no);
  }
}
