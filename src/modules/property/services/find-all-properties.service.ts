import { Injectable } from '@nestjs/common';

@Injectable()
export class FindAllPropertiesService {
  async execute() {
    return 'all properties for rental';
  }
}
