import { IsNumber } from 'class-validator';

export class TaskDeleteDTO {
  @IsNumber()
  id: number;
}
