import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('create-admin')
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get('find-all')
  findAll(@Query('isStaff') isStaff?: boolean, @Query('level') level?: number) {
    return this.adminService.findAll(isStaff, level);
  }

  @Get('find-one/:id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
  @Post('login')
  login(@Body() { email, password }: { email: string; password: string }) {
    return this.adminService.login(email, password);
  }
  @Post('make-rep')
  makeRep(@Query('id') id: number) {
    return this.adminService.makeRep(id);
  }
  @Post('remove-rep')
  removeRep(@Query('id') id: number) {
    return this.adminService.removeRep(id);
  }
  @Post('make-staff')
  makeStaff(@Query('id') id: number) {
    return this.adminService.makeStaff(id);
  }
  @Post('broadcast-notification')
  broadcastNotification(
    @Query('title') title: string,
    @Query('notification') notification: string,
  ) {
    return this.adminService.broadcastNotification(title, notification);
  }
}
