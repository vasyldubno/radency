import { IsNotEmpty, IsString } from 'class-validator';

export class BoardCreateDTO {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty()
  title: string;
}
