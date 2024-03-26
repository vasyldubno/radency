import { IsDateString, IsEnum, IsNumber, IsString } from 'class-validator';
import { Priority } from '../enums/priority.enum';
import { Status } from '../enums/status.enum';

export class TaskCreateDTO {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDateString()
  dueDate: string;

  @IsEnum(Priority, { message: 'priority must be low, medium or high' })
  priority: Priority;

  @IsEnum(Status, { message: 'status must be in_progress, completed or to_do' })
  status: Status;

  @IsNumber()
  boardId: number;
}
