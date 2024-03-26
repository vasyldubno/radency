import { ActivityLogEntity } from 'src/activity-log/activityLog.entity';
import { BoardEntity } from 'src/board/board.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Priority } from './enums/priority.enum';
import { Status } from './enums/status.enum';

@Entity('task')
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('timestamp')
  dueDate: string;

  @Column({ type: 'enum', enum: Priority })
  priority: Priority;

  @Column({ type: 'enum', enum: Status })
  status: Status;

  @ManyToOne(() => BoardEntity, (board) => board.tasks)
  board: BoardEntity;

  @OneToMany(() => ActivityLogEntity, (activityLog) => activityLog.task, {
    cascade: true,
  })
  activityLogs: ActivityLogEntity[];
}
