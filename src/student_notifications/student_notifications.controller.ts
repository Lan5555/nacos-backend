import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { StudentNotificationsService } from './student_notifications.service';
import { CreateStudentNotificationDto } from './dto/student-notification-dto';

@Controller('student-notifications')
export class StudentNotificationsController {
  constructor(
    private readonly studentNotificationsService: StudentNotificationsService,
  ) {}
  @Post('create')
  async createNotification(@Body() body: CreateStudentNotificationDto) {
    return await this.studentNotificationsService.createNotification(
      body.mat_no,
      body.title,
      body.message,
    );
  }
  @Post('update')
  async updateNotification(
    @Query('mat_no') mat_no: string,
    @Query('id', ParseIntPipe) id: number,
    @Body() body: Partial<CreateStudentNotificationDto>,
  ) {
    return await this.studentNotificationsService.updateNotification(
      mat_no,
      id,
      body,
    );
  }
  @Delete('delete')
  async deleteNotification(
    @Query('mat_no') mat_no: string,
    @Query('id', ParseIntPipe) id: number,
  ) {
    return await this.studentNotificationsService.deleteNotification(
      mat_no,
      id,
    );
  }
  @Get('find-one')
  async findOneNotification(
    @Query('mat_no') mat_no: string,
    @Query('id', ParseIntPipe) id: number,
  ) {
    return await this.studentNotificationsService.findOneNotification(
      mat_no,
      id,
    );
  }
  @Get('find-all')
  async findAllNotifications(@Query('mat_no') mat_no: string) {
    return await this.studentNotificationsService.findAllNotifications(mat_no);
  }
}
