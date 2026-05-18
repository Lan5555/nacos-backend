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
