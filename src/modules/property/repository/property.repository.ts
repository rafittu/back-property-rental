import { Injectable } from '@nestjs/common';
import { IPropertyRepository } from '../interfaces/repository.interface';
import { PrismaService } from '../../../prisma.service';
import { AppError } from '../../../common/errors/Error';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { Prisma, Property } from '@prisma/client';
import { PropertyForRental } from '../interfaces/property.interface';

@Injectable()
export class PropertyRepository implements IPropertyRepository {
  constructor(private prisma: PrismaService) {}

  private formatProperty(
    createPropertyDto: CreatePropertyDto,
  ): Prisma.PropertyCreateInput {
    return {
      title: createPropertyDto.title,
      address: createPropertyDto.address,
      city: createPropertyDto.city,
      state: createPropertyDto.state,
      zip_code: createPropertyDto.zipCode,
      PropertyDetails: {
        create: {
          bedrooms: createPropertyDto.bedrooms,
          bathrooms: createPropertyDto.bathrooms,
          garage_spaces: createPropertyDto.garageSpaces,
          swimming_pool: createPropertyDto.swimmingPool,
          size: createPropertyDto.size,
          type: createPropertyDto.type,
          description: createPropertyDto.description,
        },
      },
      PropertyValue: {
        create: {
          rental_amount: createPropertyDto.rentalAmount,
          condo_fee: createPropertyDto.condoFee,
          property_tax: createPropertyDto.propertyTax,
        },
      },
    };
  }

  private formatPropertyResponse(property): PropertyForRental {
    return {
      id: property.id,
      title: property.title,
      address: property.address,
      city: property.city,
      state: property.state,
      zipCode: property.zip_code,
      bedrooms: property.PropertyDetails[0].bedrooms,
      bathrooms: property.PropertyDetails[0].bathrooms,
      garageSpaces: property.PropertyDetails[0].garage_paces,
      swimmingPool: property.PropertyDetails[0].swimming_pool,
      size: property.PropertyDetails[0].size,
      type: property.PropertyDetails[0].type,
      description: property.PropertyDetails[0].description,
      rentalAmount: property.PropertyValue[0].rental_amount,
      condoFee: property.PropertyValue[0].condo_fee,
      propertyTax: property.PropertyValue[0].property_ax,
      createdAt: property.created_at,
      updatedAt: property.update_at,
    };
  }

  async createPropertyRental(
    createPropertyDto: CreatePropertyDto,
  ): Promise<PropertyForRental> {
    try {
      const formatedProperty = this.formatProperty(createPropertyDto);

      const propertyRental = await this.prisma.property.create({
        data: formatedProperty,
        select: {
          id: true,
          title: true,
          address: true,
          city: true,
          state: true,
          zip_code: true,
          created_at: true,
          PropertyDetails: true,
          PropertyValue: true,
        },
      });

      const propertyResponse = this.formatPropertyResponse(propertyRental);

      return propertyResponse;
    } catch (error) {
      console.log(error);
      throw new AppError(
        'property-repository.createPropertyRental',
        500,
        'failed to create property rental',
      );
    }
  }

  async findAllProperties() {
    try {
      const properties = await this.prisma.property.findMany({
        select: {
          id: true,
          title: true,
          address: true,
          city: true,
          state: true,
          zip_code: true,
          created_at: true,
          PropertyDetails: true,
          PropertyValue: true,
        },
      });

      const response = properties.map((property) => {
        return this.formatPropertyResponse(property);
      });

      return response;
    } catch (error) {
      throw new AppError(
        'property-repository.findAllProperties',
        500,
        'failed to get properties',
      );
    }
  }
}
