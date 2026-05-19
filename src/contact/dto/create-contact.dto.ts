import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  address!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  hours!: string;
}

export class SendEmailDto {
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;
  @IsNotEmpty()
  @IsString()
  subject!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;
  @IsNotEmpty()
  @IsString()
  message!: string;
}
