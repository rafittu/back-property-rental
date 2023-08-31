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
  @IsNumber()
  bedrooms: number;

  @IsNotEmpty()
  @IsNumber()
  bathrooms: number;

  @IsNotEmpty()
  @IsNumber()
  garageSpaces: number;

  @IsNotEmpty()
  @IsBoolean()
  swimmingPool: boolean;

  @IsNotEmpty()
  @IsNumber()
  size: number;

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
