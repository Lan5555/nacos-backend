import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CoursesModule } from './courses/courses.module';
import { StudentCoursesModule } from './student_courses/student_courses.module';
import { EventsModule } from './events/events.module';
import { StudentNotificationsModule } from './student_notifications/student_notifications.module';
import { NotificationsModule } from './notifications/notifications.module';
import { MarketplaceModule } from './marketplace/marketplace.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: false,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    UsersModule,
    CoursesModule,
    StudentCoursesModule,
    EventsModule,
    NotificationsModule,
    StudentNotificationsModule,
    MarketplaceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
