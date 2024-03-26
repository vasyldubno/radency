import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Priority } from '../enums/priority.enum';
import { Status } from '../enums/status.enum';

export class TaskUpdateDTO {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @IsEnum(Priority, { message: 'priority must be low, medium or high' })
  @IsOptional()
  priority?: Priority;

  @IsEnum(Status, { message: 'status must be in_progress, completed or to_do' })
  @IsOptional()
  status?: Status;

  @IsNumber()
  @IsOptional()
  boardId?: number;
}
