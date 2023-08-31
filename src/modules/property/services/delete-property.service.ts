import { Injectable } from '@nestjs/common';

@Injectable()
export class DeletePropertyService {
  async execute() {
    return 'property deleted';
  }
}
