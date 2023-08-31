import { PropertyType } from '@prisma/client';

export interface PropertyForRental {
  id: string;
  title: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  bedrooms: string;
  bathrooms: string;
  garageSpaces: string;
  swimmingPool: boolean;
  size: string;
  type: PropertyType;
  rentalAmount: number;
  condoFee: number;
  propertyTax: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PropertyFilter {
  id?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  bedrooms?: string;
  bathrooms?: string;
  garageSpaces?: string;
  swimmingPool?: boolean;
  type?: PropertyType;
}
