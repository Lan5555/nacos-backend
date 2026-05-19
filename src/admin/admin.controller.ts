import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { SuperAdminGuard } from 'src/auth/guards/super_admin.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @UseGuards(AuthGuard('jwt'), SuperAdminGuard)
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
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.adminService.update(+id, updateAdminDto, file);
  }
  @UseGuards(AuthGuard('jwt'), SuperAdminGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
  @UseGuards(AuthGuard('jwt'), SuperAdminGuard)
  @Get('make-rep')
  makeRep(@Query('id') id: number) {
    return this.adminService.makeRep(id);
  }
  @UseGuards(AuthGuard('jwt'), SuperAdminGuard)
  @Get('remove-rep')
  removeRep(@Query('id') id: number) {
    return this.adminService.removeRep(id);
  }
  @UseGuards(AuthGuard('jwt'), SuperAdminGuard)
  @Get('make-staff')
  makeStaff(@Query('id') id: number) {
    return this.adminService.makeStaff(id);
  }
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Post('broadcast-notification')
  broadcastNotification(
    @Query('studentId') studentId: number,
    @Query('title') title: string,
    @Body() { notification }: { notification: string },
  ) {
    return this.adminService.broadcastNotification(
      studentId,
      title,
      notification,
    );
  }
  @UseGuards(AuthGuard('jwt'), SuperAdminGuard)
  @Get('make-super-admin')
  makeSuperAdmin(@Query('id') id: number) {
    return this.adminService.makeSuperAdmin(id);
  }
}
