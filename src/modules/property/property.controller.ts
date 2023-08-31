import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { CreatePropertyService } from './services/create-property.service';
import { FindAllPropertiesService } from './services/find-all-properties.service';
import { FindPropertyByFilterService } from './services/find-property-by-filter.service';
import { UpdatePropertyService } from './services/update-property.service';
import { DeletePropertyService } from './services/delete-property.service';

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
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.createProperty.execute(createPropertyDto);
  }

  @Get()
  findAll() {
    return this.findAllProperties.execute();
  }

  @Get(':id')
  findByFilter(@Param('id') id: string) {
    return this.findPropertyByFilter.execute();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    return this.updateProperty.execute();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteProperty.execute();
  }
}
