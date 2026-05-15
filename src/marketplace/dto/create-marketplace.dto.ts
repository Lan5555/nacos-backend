import { IsDate, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMarketplaceDto {
  @IsString()
  name!: string;
  @IsString()
  description!: string;
  @IsNumber()
  price!: number;
  @IsInt()
  stock!: number;
  @IsString()
  sellerName!: string;
  @IsString()
  sellerPhone!: string;
  @IsDate()
  @IsOptional()
  createdAt!: Date;
}
