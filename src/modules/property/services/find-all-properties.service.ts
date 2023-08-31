import { Inject, Injectable } from '@nestjs/common';
import { PropertyRepository } from '../repository/property.repository';
import { IPropertyRepository } from '../interfaces/repository.interface';

@Injectable()
export class FindAllPropertiesService {
  constructor(
    @Inject(PropertyRepository)
    private propertyRepository: IPropertyRepository,
  ) {}

  async execute() {
    return await this.propertyRepository.findAllProperties();
  }
}
