import { Injectable } from '@nestjs/common';
import { IPropertyRepository } from '../interfaces/repository.interface';
import { PrismaService } from '../../../prisma.service';
import { AppError } from '../../../common/errors/Error';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { Prisma } from '@prisma/client';
import {
  PropertyFilter,
  PropertyForRental,
} from '../interfaces/property.interface';
import { UpdatePropertyDto } from '../dto/update-property.dto';

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
      throw new AppError(
        'property-repository.createPropertyRental',
        500,
        'failed to create property rental',
      );
    }
  }

  async findAllProperties(): Promise<PropertyForRental[]> {
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

  async findByFilter(filter: PropertyFilter): Promise<PropertyForRental[]> {
    const {
      id,
      city,
      state,
      zipCode,
      bedrooms,
      bathrooms,
      garageSpaces,
      swimmingPool,
      type,
    } = filter;

    try {
      const propertyQuery: Prisma.PropertyWhereInput = {};

      id ? (propertyQuery.id = id) : propertyQuery;

      city ? (propertyQuery.city = city) : propertyQuery;

      state ? (propertyQuery.state = state) : propertyQuery;

      zipCode ? (propertyQuery.zip_code = zipCode) : propertyQuery;

      if (bedrooms || bathrooms || garageSpaces || swimmingPool || type) {
        propertyQuery.PropertyDetails = {
          some: {
            ...(bedrooms && { bedrooms }),
            ...(bathrooms && { bathrooms }),
            ...(garageSpaces && { garage_spaces: garageSpaces }),
            ...(swimmingPool !== undefined && { swimming_pool: swimmingPool }),
            ...(type && { type }),
          },
        };
      }

      const properties = await this.prisma.property.findMany({
        where: propertyQuery,
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
        'property-repository.findByFilter',
        500,
        'failed to get properties',
      );
    }
  }

  async updateProperty(
    id: string,
    updatePropertyDto: UpdatePropertyDto,
  ): Promise<PropertyForRental> {
    const {
      title,
      address,
      city,
      state,
      zipCode,
      bedrooms,
      bathrooms,
      garageSpaces,
      swimmingPool,
      size,
      type,
      rentalAmount,
      condoFee,
      propertyTax,
      description,
    } = updatePropertyDto;

    try {
      const propertyToUpdate = await this.prisma.property.findFirst({
        where: { id },
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

      const property = await this.prisma.property.update({
        where: {
          id,
        },
        data: {
          title,
          address,
          city,
          state,
          zip_code: zipCode,

          PropertyDetails: {
            update: {
              where: { id: propertyToUpdate.PropertyDetails[0].id },
              data: {
                bedrooms,
                bathrooms,
                garage_spaces: garageSpaces,
                swimming_pool: swimmingPool,
                size,
                type,
                description,
              },
            },
          },

          PropertyValue: {
            update: {
              where: { id: propertyToUpdate.PropertyValue[0].id },
              data: {
                rental_amount: rentalAmount,
                condo_fee: condoFee,
                property_tax: propertyTax,
              },
            },
          },
        },
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

      const propertyResponse = this.formatPropertyResponse(property);

      return propertyResponse;
    } catch (error) {
      throw new AppError(
        'property-repository.updateProperty',
        500,
        'failed to update properties',
      );
    }
  }

  async deleteProperty(id: string) {
    try {
      await this.prisma.property.delete({
        where: { id },
      });

      return { message: 'property deleted' };
    } catch (error) {
      throw new AppError(
        'property-repository.deleteProperty',
        500,
        'failed to delete properties',
      );
    }
  }
}
