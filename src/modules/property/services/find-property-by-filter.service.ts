import { Injectable } from '@nestjs/common';

@Injectable()
export class FindPropertyByFilterService {
  async execute() {
    return 'property for rent';
  }
}
