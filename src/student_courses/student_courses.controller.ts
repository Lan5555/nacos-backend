import { Controller, Delete, Get, Query, UseGuards } from '@nestjs/common';
import { StudentCoursesService } from './student_courses.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@UseGuards(AuthGuard('jwt'), AdminGuard)
@Controller('student-courses')
export class StudentCoursesController {
  constructor(private readonly studentCoursesService: StudentCoursesService) {}
  // Add a student to a course
  @Get('add')
  async addStudentCourse(
    @Query('studentId') studentId: number,
    @Query('courseId') courseId: number,
  ) {
    return await this.studentCoursesService.addStudentCourse(
      studentId,
      courseId,
    );
  }
  // Remove a student from a course
  @Delete('remove')
  async removeStudentCourse(
    @Query('studentId') studentId: number,
    @Query('courseId') courseId: number,
  ) {
    return await this.studentCoursesService.removeStudentCourse(
      studentId,
      courseId,
    );
  }
  // Get all courses for a student
  @Get('find-student-courses')
  async getStudentCourses(@Query('studentId') studentId: number) {
    return await this.studentCoursesService.getStudentCourses(studentId);
  }
}
