import { Controller, Get } from '@nestjs/common';
import { ActivityLogService } from './activityLog.service';

@Controller('activity-log')
export class ActivityLogController {
  constructor(private activityLogService: ActivityLogService) {}

  @Get()
  async getAll() {
    return await this.activityLogService.getAllActivityLogs();
  }
}
