import { TaskEntity } from 'src/task/task.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('activityLog')
export class ActivityLogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  type: string;

  @Column('text', { nullable: true, default: null })
  from: string;

  @Column('text', { nullable: true, default: null })
  to: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => TaskEntity, (task) => task.activityLogs, {
    onDelete: 'CASCADE',
  })
  task: TaskEntity;
}
