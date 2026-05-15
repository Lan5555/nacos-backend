import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCourseDto } from 'src/courses/dto/course-dto';
import { Course } from 'src/courses/entities/course-entites';
import { errorResponse, Future, successResponse } from 'src/helpers/helpers';
import { Repository } from 'typeorm';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>,
  ) {}

  async findAllCourses(level?: string, department?: string): Future {
    try {
      const courses = await this.courseRepository.find({
        where: {
          level: level ? level : undefined,
          department: department ? department : undefined,
        },
      });
      if (courses) {
        return successResponse('Courses retrieved successfully', courses);
      } else {
        return errorResponse('No courses found');
      }
    } catch (error) {
      console.error(error);
      return errorResponse(error);
    }
  }

  async findOneCourse(id: number): Future {
    try {
      const course = await this.courseRepository.findOneBy({ id });
      if (course) {
        return successResponse('Course retrieved successfully', course);
      } else {
        return errorResponse('Course not found');
      }
    } catch (error) {
      console.error(error);
      return errorResponse(error);
    }
  }

  async createCourse(course: CreateCourseDto): Future {
    try {
      const newCourse = await this.courseRepository.save(course);
      return successResponse('Course created successfully', newCourse);
    } catch (error) {
      console.error(error);
      return errorResponse(error);
    }
  }

  async updateCourse(id: number, course: Partial<CreateCourseDto>): Future {
    try {
      const existingCourse = await this.courseRepository.findOneBy({ id });
      if (existingCourse) {
        const updatedCourse = await this.courseRepository.save({
          ...existingCourse,
          ...course,
        });
        return successResponse('Course updated successfully', updatedCourse);
      } else {
        return errorResponse('Course not found');
      }
    } catch (error) {
      console.error(error);
      return errorResponse(error);
    }
  }

  async deleteCourse(id: number): Future {
    try {
      const existingCourse = await this.courseRepository.findOneBy({ id });
      if (existingCourse) {
        await this.courseRepository.remove(existingCourse);
        return successResponse('Course deleted successfully', null);
      } else {
        return errorResponse('Course not found');
      }
    } catch (error) {
      console.error(error);
      return errorResponse(error);
    }
  }
}
