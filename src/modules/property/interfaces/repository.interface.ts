import { CreatePropertyDto } from '../dto/create-property.dto';

export interface IPropertyRepository {
  createPropertyRental(createPropertyDto: CreatePropertyDto);
}
