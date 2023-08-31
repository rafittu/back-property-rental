import { Inject, Injectable } from '@nestjs/common';
import { IPropertyRepository } from '../interfaces/repository.interface';
import { PropertyRepository } from '../repository/property.repository';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { PropertyForRental } from '../interfaces/property.interface';

@Injectable()
export class CreatePropertyService {
  constructor(
    @Inject(PropertyRepository)
    private propertyRepository: IPropertyRepository,
  ) {}

  async execute(
    createPropertyDto: CreatePropertyDto,
  ): Promise<PropertyForRental> {
    return await this.propertyRepository.createPropertyRental(
      createPropertyDto,
    );
  }
}
