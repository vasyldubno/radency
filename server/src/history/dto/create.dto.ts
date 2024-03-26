import { IsOptional, IsString } from 'class-validator';

export class CreateHistoryDto {
  @IsString()
  taskTitle: string;

  @IsString()
  type: string;

  @IsString()
  @IsOptional()
  from?: string;

  @IsString()
  @IsOptional()
  to?: string;
}
