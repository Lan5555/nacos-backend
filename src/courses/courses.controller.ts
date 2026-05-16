import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from 'src/courses/dto/course-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile, UseInterceptors } from '@nestjs/common';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get('find-all-courses')
  async findAllCourses(
    @Query('level') level?: string,
    @Query('department') department?: string,
  ) {
    return await this.coursesService.findAllCourses(level, department);
  }
  @Get('find-one-course')
  async findOneCourse(@Query('id') id: number) {
    return await this.coursesService.findOneCourse(id);
  }
  @Post('create-course')
  @UseInterceptors(FileInterceptor('file')) // 'file' is the field name for the uploaded file
  async createCourse(
    @Body() createCourseDto: CreateCourseDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.coursesService.createCourse(createCourseDto, file);
  }
  @Post('update-course')
  @UseInterceptors(FileInterceptor('file'))
  async updateCourse(
    @Query('id') id: number,
    @Body() body: Partial<CreateCourseDto>,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return await this.coursesService.updateCourse(id, body, file);
  }
  @Delete('delete-course')
  async deleteCourse(@Query('id') id: number) {
    return await this.coursesService.deleteCourse(id);
  }
}
