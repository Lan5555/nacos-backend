import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';

export class CreateStudentNotificationDto {
  @IsString()
  mat_no!: string;
  @IsString()
  title!: string;
  @IsString()
  message!: string;
  @IsBoolean()
  @IsOptional()
  isRead!: boolean;
  @IsDate()
  @IsOptional()
  createdAt!: Date;
}
