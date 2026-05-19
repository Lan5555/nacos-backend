import { Module } from '@nestjs/common';
import { StudentCoursesController } from './student_courses.controller';
import { StudentCourse } from 'src/student_courses/entities/student-courses-entities';
import { StudentCoursesService } from './student_courses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([StudentCourse]), AuthModule],
  providers: [StudentCoursesService],
  controllers: [StudentCoursesController],
  exports: [StudentCoursesService],
})
export class StudentCoursesModule {}
