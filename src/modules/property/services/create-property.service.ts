import { Inject, Injectable } from '@nestjs/common';
import { IPropertyRepository } from '../interfaces/repository.interface';
import { PropertyRepository } from '../repository/property.repository';
import { CreatePropertyDto } from '../dto/create-property.dto';

@Injectable()
export class CreatePropertyService {
  constructor(
    @Inject(PropertyRepository)
    private propertyRepository: IPropertyRepository,
  ) {}

  async execute(createPropertyDto: CreatePropertyDto) {
    return await this.propertyRepository.createPropertyRental(
      createPropertyDto,
    );
  }
}
