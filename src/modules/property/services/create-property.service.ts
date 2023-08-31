import { Injectable } from '@nestjs/common';

@Injectable()
export class CreatePropertyService {
  async execute() {
    return 'property rental created';
  }
}
