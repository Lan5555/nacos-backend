import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;
  @IsNumber()
  level!: number;
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!: string;
  @IsString()
  department!: string;
  @IsString()
  position!: string;
  @IsString()
  phone!: string;

  @IsBoolean()
  @IsOptional()
  isStaff?: boolean;
}
