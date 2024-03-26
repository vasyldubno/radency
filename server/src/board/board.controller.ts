import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { BoardService } from './board.service';
import { BoardCreateDTO } from './dto/boardCreate.dto';
import { BoardUpdateDTO } from './dto/boardUpdate.dto';

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get()
  async getAll(@Res() res: Response) {
    const allBoards = await this.boardService.getAll();
    return res.json(allBoards);
  }

  @Post()
  async create(@Res() res: Response, @Body() dto: BoardCreateDTO) {
    const result = await this.boardService.create(dto);
    return res.json(result);
  }

  @Patch(':id')
  async update(
    @Res() res: Response,
    @Body() dto: BoardUpdateDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const result = await this.boardService.update(dto, id);
    return res.json(result);
  }

  @Delete(':id')
  async delete(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const result = await this.boardService.delete({ boardId: id });
    return res.json(result);
  }
}
