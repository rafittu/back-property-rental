import { PropertyType } from '@prisma/client';

export interface PropertyForRental {
  id: string;
  title: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  bedrooms: number;
  bathrooms: number;
  garageSpaces: number;
  swimmingPool: boolean;
  size: number;
  type: PropertyType;
  rentalAmount: number;
  condoFee: number;
  propertyTax: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
