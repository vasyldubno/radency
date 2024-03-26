import { TaskEntity } from 'src/task/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('board')
export class BoardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @OneToMany(() => TaskEntity, (task) => task.board)
  tasks: TaskEntity[];
}
