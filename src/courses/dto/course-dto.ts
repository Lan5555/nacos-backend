import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 200)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  code!: string;

  @IsString()
  @IsNotEmpty()
  level!: string;

  @IsString()
  @IsNotEmpty()
  department!: string;
  @IsString()
  @IsNotEmpty()
  description!: string;
}
