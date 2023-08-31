import { PropertyType } from '@prisma/client';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsBoolean,
  IsEnum,
} from 'class-validator';

export class CreatePropertyDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  zipCode: string;

  @IsNotEmpty()
  @IsString()
  bedrooms: string;

  @IsNotEmpty()
  @IsString()
  bathrooms: string;

  @IsNotEmpty()
  @IsString()
  garageSpaces: string;

  @IsNotEmpty()
  @IsBoolean()
  swimmingPool: boolean;

  @IsNotEmpty()
  @IsString()
  size: string;

  @IsNotEmpty()
  @IsEnum(PropertyType)
  type: PropertyType;

  @IsNotEmpty()
  @IsNumber()
  rentalAmount: number;

  @IsNotEmpty()
  @IsNumber()
  condoFee: number;

  @IsNotEmpty()
  @IsNumber()
  propertyTax: number;

  @IsNotEmpty()
  @IsString()
  description: string;
}
