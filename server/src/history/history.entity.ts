import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('history')
export class HistoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  taskTitle: string;

  @Column('text')
  type: string;

  @Column('text', { nullable: true, default: null })
  from: string;

  @Column('text', { nullable: true, default: null })
  to: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
