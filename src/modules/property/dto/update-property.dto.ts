import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyDto } from './create-property.dto';
import {
  IsString,
  IsNumber,
  IsBoolean,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { PropertyType } from '@prisma/client';

export class UpdatePropertyDto extends PartialType(CreatePropertyDto) {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  zipCode?: string;

  @IsOptional()
  @IsString()
  bedrooms?: string;

  @IsOptional()
  @IsString()
  bathrooms?: string;

  @IsOptional()
  @IsString()
  garageSpaces?: string;

  @IsOptional()
  @IsBoolean()
  swimmingPool?: boolean;

  @IsOptional()
  @IsString()
  size?: string;

  @IsOptional()
  @IsEnum(PropertyType)
  type?: PropertyType;

  @IsOptional()
  @IsNumber()
  rentalAmount?: number;

  @IsOptional()
  @IsNumber()
  condoFee?: number;

  @IsOptional()
  @IsNumber()
  propertyTax?: number;

  @IsOptional()
  @IsString()
  description?: string;
}
