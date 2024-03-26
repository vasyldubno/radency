import { IsOptional, IsString } from 'class-validator';

export class BoardUpdateDTO {
  @IsString()
  @IsOptional()
  title?: string;
}
