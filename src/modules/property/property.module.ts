import { Module } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { CreatePropertyService } from './services/create-property.service';
import { FindAllPropertiesService } from './services/find-all-properties.service';
import { FindPropertyByFilterService } from './services/find-property-by-filter.service';
import { UpdatePropertyService } from './services/update-property.service';
import { DeletePropertyService } from './services/delete-property.service';
import { PrismaService } from 'src/prisma.service';
import { PropertyRepository } from './repository/property.repository';

@Module({
  controllers: [PropertyController],
  providers: [
    PrismaService,
    PropertyRepository,
    CreatePropertyService,
    FindAllPropertiesService,
    FindPropertyByFilterService,
    UpdatePropertyService,
    DeletePropertyService,
  ],
})
export class PropertyModule {}
