import { CreatePropertyDto } from '../dto/create-property.dto';
import { PropertyForRental } from './property.interface';

export interface IPropertyRepository {
  createPropertyRental(
    createPropertyDto: CreatePropertyDto,
  ): Promise<PropertyForRental>;
}
