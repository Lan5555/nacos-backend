import { IsNumber } from 'class-validator';

export class EnrollStudentDto {
  @IsNumber()
  studentId!: number;

  @IsNumber()
  courseId!: number;
}
