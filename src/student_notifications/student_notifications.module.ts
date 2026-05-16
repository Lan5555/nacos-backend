import { Module } from '@nestjs/common';
import { StudentNotificationsService } from './student_notifications.service';
import { StudentNotificationsController } from './student_notifications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentNotification } from './entities/student-notification-entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentNotification])],
  providers: [StudentNotificationsService],
  controllers: [StudentNotificationsController],
  exports: [StudentNotificationsService],
})
export class StudentNotificationsModule {}
