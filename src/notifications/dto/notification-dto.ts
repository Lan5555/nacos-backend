import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';

export class CreateNotificationDto {
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
