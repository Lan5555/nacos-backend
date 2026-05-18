import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateResultDto {
  @IsString()
  @IsNotEmpty()
  course!: string;

  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsNumber()
  @IsNotEmpty()
  level!: number;

  @IsString()
  @IsNotEmpty()
  department!: string;
  @IsOptional()
  @IsString()
  file?: string;
}
