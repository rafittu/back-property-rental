import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  Query,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { CreatePropertyService } from './services/create-property.service';
import { FindAllPropertiesService } from './services/find-all-properties.service';
import { FindPropertyByFilterService } from './services/find-property-by-filter.service';
import { UpdatePropertyService } from './services/update-property.service';
import { DeletePropertyService } from './services/delete-property.service';
import {
  PropertyFilter,
  PropertyForRental,
} from './interfaces/property.interface';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { AppError } from 'src/common/errors/Error';

@UseFilters(new HttpExceptionFilter(new AppError()))
@Controller('property')
export class PropertyController {
  constructor(
    private readonly createProperty: CreatePropertyService,
    private readonly findAllProperties: FindAllPropertiesService,
    private readonly findPropertyByFilter: FindPropertyByFilterService,
    private readonly updateProperty: UpdatePropertyService,
    private readonly deleteProperty: DeletePropertyService,
  ) {}

  @Post('/create')
  create(
    @Body() createPropertyDto: CreatePropertyDto,
  ): Promise<PropertyForRental> {
    return this.createProperty.execute(createPropertyDto);
  }

  @Get('/all')
  findAll(): Promise<PropertyForRental[]> {
    return this.findAllProperties.execute();
  }

  @Get('/filter')
  findByFilter(@Query() filter: PropertyFilter): Promise<PropertyForRental[]> {
    return this.findPropertyByFilter.execute(filter);
  }

  @Patch('/update/:id')
  update(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    return this.updateProperty.execute(id, updatePropertyDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.deleteProperty.execute(id);
  }
}
