import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { TaskEntity } from 'src/task/task.entity';

export class ActivityLogDTO {
  @IsString()
  type: string;

  @IsString()
  @IsOptional()
  from: string;

  @IsString()
  @IsOptional()
  to: string;

  task: TaskEntity;
}
