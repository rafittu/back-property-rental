import { Inject, Injectable } from '@nestjs/common';
import {
  PropertyFilter,
  PropertyForRental,
} from '../interfaces/property.interface';
import { PropertyRepository } from '../repository/property.repository';
import { IPropertyRepository } from '../interfaces/repository.interface';

@Injectable()
export class FindPropertyByFilterService {
  constructor(
    @Inject(PropertyRepository)
    private propertyRepository: IPropertyRepository,
  ) {}

  async execute(filter: PropertyFilter): Promise<PropertyForRental[]> {
    return await this.propertyRepository.findByFilter(filter);
  }
}
