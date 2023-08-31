import { Inject, Injectable } from '@nestjs/common';
import { PropertyRepository } from '../repository/property.repository';
import { IPropertyRepository } from '../interfaces/repository.interface';

@Injectable()
export class DeletePropertyService {
  constructor(
    @Inject(PropertyRepository)
    private propertyRepository: IPropertyRepository,
  ) {}

  async execute(id: string) {
    return await this.propertyRepository.deleteProperty(id);
  }
}
