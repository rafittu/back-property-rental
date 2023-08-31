import { Injectable } from '@nestjs/common';
import { IPropertyRepository } from '../interfaces/repository.interface';
import { PrismaService } from '../../../prisma.service';
import { AppError } from '../../../common/errors/Error';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { Property } from '@prisma/client';

@Injectable()
export class PropertyRepository implements IPropertyRepository {
  constructor(private prisma: PrismaService) {}

  private formatProperty(createPropertyDto: CreatePropertyDto): Property {
    return {};
  }

  private formatPropertyResponse(property: Property): PropertyForRental {
    return {};
  }

  async createPropertyRental(
    createPropertyDto: CreatePropertyDto,
  ): Promise<PropertyForRental> {
    try {
      const formatedProperty = this.formatProperty(createPropertyDto);

      const propertyRental = await this.prisma.property.create({
        data: {
          formatedProperty,
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
}
