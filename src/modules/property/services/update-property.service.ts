import { Inject, Injectable } from '@nestjs/common';
import { PropertyRepository } from '../repository/property.repository';
import { IPropertyRepository } from '../interfaces/repository.interface';
import { UpdatePropertyDto } from '../dto/update-property.dto';

@Injectable()
export class UpdatePropertyService {
  constructor(
    @Inject(PropertyRepository)
    private propertyRepository: IPropertyRepository,
  ) {}

  async execute(id: string, updatePropertyDto: UpdatePropertyDto) {
    return await this.propertyRepository.updateProperty(id, updatePropertyDto);
  }
}
