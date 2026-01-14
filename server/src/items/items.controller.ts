import { Controller, Get } from '@nestjs/common';
import { ItemsService } from './items.service.js';

@Controller('items')
export class ItemsController {
  constructor(private Items: ItemsService) {}

  @Get()
  getAllItems() {
    return this.Items.getAll_items();
  }
}
