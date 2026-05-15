import { IsBoolean, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  title!: string;
  @IsString()
  content!: string;
  @IsBoolean()
  isActive!: boolean;
  @IsString()
  venue!: string;
}
