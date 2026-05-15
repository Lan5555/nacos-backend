/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsString,
  IsEmail,
  IsBoolean,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  mat_no!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsString()
  @IsNotEmpty()
  department!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;

  @IsString()
  @IsNotEmpty()
  level!: string;

  @IsBoolean()
  @IsOptional()
  isAdmin?: boolean;

  @IsDateString()
  @IsOptional()
  createdAt?: Date;
}

export class ResetPasswordDto {
  @IsString()
  mat_no!: string;
  @IsString()
  @MinLength(6)
  password!: string;
  @IsString()
  otp!: string;
}
