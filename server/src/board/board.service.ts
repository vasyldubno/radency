import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from './board.entity';
import { Repository } from 'typeorm';
import { BoardCreateDTO } from './dto/boardCreate.dto';
import { BoardDeleteDTO } from './dto/boardDelete.dto';
import { BoardUpdateDTO } from './dto/boardUpdate.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardEntity)
    private boardRepository: Repository<BoardEntity>,
  ) {}

  async getAll() {
    const boards = await this.boardRepository.find({
      relations: { tasks: { activityLogs: true } },
    });
    return boards;
  }

  async getById(id: number) {
    const board = await this.boardRepository.findOneBy({ id });
    return board;
  }

  async create(dto: BoardCreateDTO) {
    const board = this.boardRepository.create({ title: dto.title });
    const newBoard = await this.boardRepository.save(board);
    return newBoard;
  }

  async delete(dto: BoardDeleteDTO) {
    const board = await this.boardRepository.findOneBy({ id: dto.boardId });
    if (!board) {
      throw new NotFoundException('Board not found');
    }
    return await this.boardRepository.delete(dto.boardId);
  }

  async update(dto: BoardUpdateDTO, boardId: number) {
    const board = await this.boardRepository.findOneBy({ id: boardId });
    if (!board) {
      throw new NotFoundException('Board not found');
    }

    return await this.boardRepository.update(boardId, dto);
  }
}
