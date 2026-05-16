import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CloudinaryFile } from 'src/cloudinary/entities/cloudinary-file.entity';
import { CreateCourseDto } from 'src/courses/dto/course-dto';
import { Course } from 'src/courses/entities/course-entites';
import { errorResponse, Future, successResponse } from 'src/helpers/helpers';
import { Repository } from 'typeorm';

@Injectable()
export class CoursesService {
  constructor(
    private readonly fileService: CloudinaryService,
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

  async createCourse(
    createCourseDto: CreateCourseDto,
    file: Express.Multer.File,
  ): Future {
    try {
      const uploadResponse = await this.fileService.uploadFile(
        file,
        'course_files',
      );
      const cloudFile = uploadResponse.data as CloudinaryFile;
      const newCourse = await this.courseRepository.save({
        ...createCourseDto,
        file: cloudFile.publicId,
      });
      return successResponse('Course created successfully', newCourse);
    } catch (error) {
      console.error(error);
      return errorResponse(error);
    }
  }

  async updateCourse(
    id: number,
    course: Partial<CreateCourseDto>,
    file: Express.Multer.File,
  ): Future {
    try {
      const existingCourse = await this.courseRepository.findOneBy({ id });
      if (existingCourse) {
        const uploadResponse = await this.fileService.uploadFile(
          file,
          'course_files',
        );
        const cloudFile = uploadResponse.data as CloudinaryFile;
        const updatedCourse = await this.courseRepository.save({
          ...existingCourse,
          ...course,
          file: cloudFile.publicId,
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
