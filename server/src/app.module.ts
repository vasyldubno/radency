import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm.config';
import { BoardModule } from './board/board.module';
import { TaskModule } from './task/task.module';
import { ActivityLogModule } from './activity-log/activity-log.module';
import { HistoryModule } from './history/history.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    BoardModule,
    TaskModule,
    ActivityLogModule,
    HistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
