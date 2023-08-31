import { CreatePropertyDto } from '../dto/create-property.dto';
import { PropertyFilter, PropertyForRental } from './property.interface';

export interface IPropertyRepository {
  createPropertyRental(
    createPropertyDto: CreatePropertyDto,
  ): Promise<PropertyForRental>;
  findAllProperties(): Promise<PropertyForRental[]>;
  findByFilter(filter: PropertyFilter): Promise<PropertyForRental[]>;
  updateProperty(id, updatePropertyDto): Promise<PropertyForRental>;
  deleteProperty(id: string);
}
