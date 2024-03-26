import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ActivityLogEntity } from 'src/activity-log/activityLog.entity';
import { BoardEntity } from 'src/board/board.entity';
import { HistoryEntity } from 'src/history/history.entity';
import { TaskEntity } from 'src/task/task.entity';

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  synchronize: true,
  logging: true,
  entities: [BoardEntity, TaskEntity, ActivityLogEntity, HistoryEntity],
  subscribers: [],
  migrations: [],
};
