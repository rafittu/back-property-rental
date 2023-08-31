import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdatePropertyService {
  async execute() {
    return 'property updated';
  }
}
