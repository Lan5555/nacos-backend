import { Module } from '@nestjs/common';
import { StudentCoursesController } from './student_courses.controller';
import { StudentCourse } from 'src/student_courses/entities/student-courses-entities';
import { StudentCoursesService } from './student_courses.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([StudentCourse])],
  providers: [StudentCoursesService],
  controllers: [StudentCoursesController],
})
export class StudentCoursesModule {}
