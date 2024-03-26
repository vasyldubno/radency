import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { TaskCreateDTO } from './dto/taskCreate.dto';
import { TaskUpdateDTO } from './dto/taskUpdate.dto';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  async getAll(@Res() res: Response) {
    const tasks = await this.taskService.allTasks();
    return res.json(tasks);
  }

  @Get(':id')
  async getById(@Res() res: Response, @Param('id') id: number) {
    const task = await this.taskService.taskById({ id });
    return res.json(task);
  }

  @Post()
  async create(@Res() res: Response, @Body() dto: TaskCreateDTO) {
    const task = await this.taskService.create(dto);
    return res.json(task);
  }

  @Patch(':id')
  async update(
    @Res() res: Response,
    @Body() dto: TaskUpdateDTO,
    @Param('id') id: number,
  ) {
    const result = await this.taskService.update(dto, id);
    return res.json(result);
  }

  @Delete(':id')
  async delete(@Res() res: Response, @Param('id') id: number) {
    const result = await this.taskService.delete({ id });
    return res.json(result);
  }
}
