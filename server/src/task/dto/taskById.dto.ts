import { IsNumber } from 'class-validator';

export class TaskByIdDTO {
  @IsNumber()
  id: number;
}
