import { Module } from '@nestjs/common';
import { PropertyService } from './services/property.service';
import { PropertyController } from './property.controller';

@Module({
  controllers: [PropertyController],
  providers: [PropertyService],
})
export class PropertyModule {}
