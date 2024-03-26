import { Injectable } from '@nestjs/common';
import { ActivityLogDTO } from './activityLog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityLogEntity } from './activityLog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActivityLogService {
  constructor(
    @InjectRepository(ActivityLogEntity)
    private activityLogRepository: Repository<ActivityLogEntity>,
  ) {}

  async getAllActivityLogs() {
    return await this.activityLogRepository.find({
      relations: { task: true },
      order: { createdAt: 'DESC' },
    });
  }

  async create(dto: ActivityLogDTO) {
    const activityLog = this.activityLogRepository.create({
      task: dto.task,
      type: dto.type,
      from: dto.from,
      to: dto.to,
    });
    return await this.activityLogRepository.save(activityLog);
  }
}
