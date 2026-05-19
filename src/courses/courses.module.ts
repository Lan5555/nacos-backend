import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from 'src/courses/entities/course-entites';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Course]), CloudinaryModule, AuthModule],
  providers: [CoursesService],
  controllers: [CoursesController],
})
export class CoursesModule {}
