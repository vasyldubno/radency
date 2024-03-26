import { IsNumber } from 'class-validator';

export class BoardDeleteDTO {
  @IsNumber()
  boardId: number;
}
