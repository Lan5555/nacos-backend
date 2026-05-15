import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { errorResponse, Future, successResponse } from 'src/helpers/helpers';
import { Repository } from 'typeorm';
import { CreateStudentNotificationDto } from './dto/student-notification-dto';
import { StudentNotification } from './entities/student-notification-entity';

@Injectable()
export class StudentNotificationsService {
  constructor(
    @InjectRepository(StudentNotification)
    private readonly notificationsRepository: Repository<StudentNotification>,
  ) {}

  async createNotification(
    mat_no: string,
    title: string,
    message: string,
  ): Future {
    try {
      const notification = this.notificationsRepository.create({
        mat_no,
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
    mat_no: string,
    id: number,
    body: Partial<CreateStudentNotificationDto>,
  ): Future {
    try {
      const notification = await this.notificationsRepository.findOneBy({
        mat_no,
        id,
      });
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
  async deleteNotification(mat_no: string, id: number): Future {
    try {
      const notification = await this.notificationsRepository.findOneBy({
        mat_no,
        id,
      });
      if (!notification) {
        return errorResponse('Notification not found');
      }
      await this.notificationsRepository.remove(notification);
      return successResponse('Notification deleted successfully', null);
    } catch (e) {
      return errorResponse(e);
    }
  }
  async findOneNotification(mat_no: string, id: number): Future {
    try {
      const notification = await this.notificationsRepository.findOneBy({
        mat_no,
        id,
      });
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
  async findAllNotifications(mat_no: string): Future {
    try {
      const notifications = await this.notificationsRepository.find({
        where: { mat_no },
      });
      return successResponse(
        'Notifications retrieved successfully',
        notifications,
      );
    } catch (e) {
      return errorResponse(e);
    }
  }
}
