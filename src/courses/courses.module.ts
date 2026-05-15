import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from 'src/courses/entities/course-entites';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  providers: [CoursesService],
  controllers: [CoursesController],
})
export class CoursesModule {}
