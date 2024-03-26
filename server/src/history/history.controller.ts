import { Controller, Delete, Get } from '@nestjs/common';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  async getAll() {
    return await this.historyService.getAll();
  }

  @Delete()
  async clearHistory() {
    return await this.historyService.clearHistory();
  }
}
