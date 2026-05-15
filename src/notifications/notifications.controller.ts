import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/notification-dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}
  @Post('create')
  async createNotification(@Body() body: CreateNotificationDto) {
    return await this.notificationsService.createNotification(
      body.title,
      body.message,
    );
  }
  @Post('update')
  async updateNotification(
    @Query('id', ParseIntPipe) id: number,
    @Body() body: Partial<CreateNotificationDto>,
  ) {
    return await this.notificationsService.updateNotification(id, body);
  }
  @Delete('delete')
  async deleteNotification(@Query('id', ParseIntPipe) id: number) {
    return await this.notificationsService.deleteNotification(id);
  }
  @Get('find-one')
  async findOneNotification(@Query('id', ParseIntPipe) id: number) {
    return await this.notificationsService.findOneNotification(id);
  }
  @Get('find-all')
  async findAllNotifications() {
    return await this.notificationsService.findAllNotifications();
  }
}
