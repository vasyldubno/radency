import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistoryEntity } from './history.entity';
import { CreateHistoryDto } from './dto/create.dto';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(HistoryEntity)
    private historyRepository: Repository<HistoryEntity>,
  ) {}

  async create(dto: CreateHistoryDto) {
    const history = this.historyRepository.create({
      from: dto.from,
      to: dto.to,
      taskTitle: dto.taskTitle,
      type: dto.type,
    });
    return await this.historyRepository.save(history);
  }

  async getAll() {
    return await this.historyRepository.find({ order: { createdAt: 'DESC' } });
  }

  async clearHistory() {
    return await this.historyRepository.clear();
  }
}
