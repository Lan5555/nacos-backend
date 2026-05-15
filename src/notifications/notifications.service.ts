import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { errorResponse, Future, successResponse } from 'src/helpers/helpers';
import { Repository } from 'typeorm';
import { RegularNotification } from './entities/notification-entity';
import { CreateNotificationDto } from './dto/notification-dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(RegularNotification)
    private readonly notificationsRepository: Repository<RegularNotification>,
  ) {}

  async createNotification(title: string, message: string): Future {
    try {
      const notification = this.notificationsRepository.create({
        title,
        message,
      });
      await this.notificationsRepository.save(notification);
      return successResponse('Notification created successfully', notification);
    } catch (e) {
      return errorResponse(e);
    }
  }
  async updateNotification(
    id: number,
    body: Partial<CreateNotificationDto>,
  ): Future {
    try {
      const notification = await this.notificationsRepository.findOneBy({ id });
      if (!notification) {
        return errorResponse('Notification not found');
      }
      Object.assign(notification, body);
      await this.notificationsRepository.save(notification);
      return successResponse('Notification updated successfully', notification);
    } catch (e) {
      return errorResponse(e);
    }
  }
  async deleteNotification(id: number): Future {
    try {
      const notification = await this.notificationsRepository.findOneBy({ id });
      if (!notification) {
        return errorResponse('Notification not found');
      }
      await this.notificationsRepository.remove(notification);
      return successResponse('Notification deleted successfully', null);
    } catch (e) {
      return errorResponse(e);
    }
  }
  async findOneNotification(id: number): Future {
    try {
      const notification = await this.notificationsRepository.findOneBy({ id });
      if (!notification) {
        return errorResponse('Notification not found');
      }
      return successResponse(
        'Notification retrieved successfully',
        notification,
      );
    } catch (e) {
      return errorResponse(e);
    }
  }
  async findAllNotifications(): Future {
    try {
      const notifications = await this.notificationsRepository.find();
      return successResponse(
        'Notifications retrieved successfully',
        notifications,
      );
    } catch (e) {
      return errorResponse(e);
    }
  }
}
