import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentCourse } from 'src/student_courses/entities/student-courses-entities';
import { errorResponse, Future, successResponse } from 'src/helpers/helpers';
import { Repository } from 'typeorm';

@Injectable()
export class StudentCoursesService {
  constructor(
    @InjectRepository(StudentCourse)
    private studentCourseRepository: Repository<StudentCourse>,
  ) {}

  async addStudentCourse(studentId: number, courseId: number): Future {
    try {
      const enrollment = await this.studentCourseRepository.save({
        student: { id: studentId },
        course: { id: courseId },
      });
      return successResponse('Student course added successfully', enrollment);
    } catch (error) {
      console.error(error);
      return errorResponse(error);
    }
  }
  async removeStudentCourse(studentId: number, courseId: number): Future {
    try {
      const enrollment = await this.studentCourseRepository.delete({
        student: { id: studentId },
        course: { id: courseId },
      });
      if (enrollment.affected) {
        return successResponse('Student course removed successfully', null);
      } else {
        return errorResponse('Student course not found');
      }
    } catch (error) {
      console.error(error);
      return errorResponse(error);
    }
  }

  async getStudentCourses(studentId: number): Future {
    try {
      const courses = await this.studentCourseRepository.find({
        where: { student: { id: studentId } },
        relations: ['course'],
      });
      return successResponse('Student courses retrieved successfully', courses);
    } catch (error) {
      console.error(error);
      return errorResponse(error);
    }
  }
}
