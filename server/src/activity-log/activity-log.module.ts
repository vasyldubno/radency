import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityLogEntity } from './activityLog.entity';
import { ActivityLogService } from './activityLog.service';
import { ActivityLogController } from './activityLog.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityLogEntity])],
  providers: [ActivityLogService],
  exports: [TypeOrmModule, ActivityLogService],
  controllers: [ActivityLogController],
})
export class ActivityLogModule {}
