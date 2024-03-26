import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityLogService } from 'src/activity-log/activityLog.service';
import { BoardEntity } from 'src/board/board.entity';
import { Repository } from 'typeorm';
import { TaskDeleteDTO } from './dto/taskDelete.dto';
import { TaskCreateDTO } from './dto/taskCreate.dto';
import { TaskEntity } from './task.entity';
import { TaskByIdDTO } from './dto/taskById.dto';
import { TaskUpdateDTO } from './dto/taskUpdate.dto';
import { BoardService } from 'src/board/board.service';
import { HistoryService } from 'src/history/history.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
    @InjectRepository(BoardEntity)
    private boardRepository: Repository<BoardEntity>,
    private activityLogService: ActivityLogService,
    private boardService: BoardService,
    private historyService: HistoryService,
  ) {}

  async getAllActivityLogs() {
    return await this.activityLogService.getAllActivityLogs();
  }

  async create(dto: TaskCreateDTO) {
    const board = await this.boardRepository.findOneBy({ id: dto.boardId });
    if (!board) {
      throw new NotFoundException('Board not found');
    }

    const task = this.taskRepository.create({
      title: dto.title,
      description: dto.description,
      dueDate: dto.dueDate,
      priority: dto.priority,
      status: dto.status,
      board,
    });

    const newTask = await this.taskRepository.save(task);

    const activityLog = await this.activityLogService.create({
      task: newTask,
      type: 'create',
      from: null,
      to: null,
    });

    newTask.activityLogs = [activityLog];
    const updatedTask = await this.taskRepository.save(newTask);

    await this.historyService.create({
      taskTitle: updatedTask.title,
      type: 'create',
      from: null,
      to: task.board.title,
    });

    return updatedTask;
  }

  async delete(dto: TaskDeleteDTO) {
    const task = await this.taskRepository.findOne({
      where: { id: dto.id },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const updatedTask = await this.taskRepository.delete(dto.id);

    await this.historyService.create({
      taskTitle: task.title,
      type: 'delete',
      from: task.board.title,
      to: null,
    });

    return updatedTask;
  }

  async allTasks() {
    const tasks = await this.taskRepository.find({
      relations: { board: true, activityLogs: true },
    });
    return tasks;
  }

  async taskById(dto: TaskByIdDTO) {
    const task = await this.taskRepository.findOne({ where: { id: dto.id } });
    return task;
  }

  async update(dto: TaskUpdateDTO, id: number) {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: { board: true },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (dto.boardId) {
      const newBoard = await this.boardService.getById(dto.boardId);

      if (!newBoard) {
        throw new NotFoundException('Board not found');
      }

      await this.activityLogService.create({
        task,
        type: 'moved',
        from: task.board.title,
        to: newBoard.title,
      });

      await this.historyService.create({
        taskTitle: task.title,
        type: 'moved',
        from: task.board.title,
        to: newBoard.title,
      });

      await this.taskRepository.update(id, {
        board: newBoard,
      });
    }

    if (dto.title) {
      await this.activityLogService.create({
        task,
        type: 'rename',
        from: task.title,
        to: dto.title,
      });

      await this.historyService.create({
        taskTitle: task.title,
        type: 'rename',
        from: task.title,
        to: dto.title,
      });

      await this.taskRepository.update(id, {
        title: dto.title,
      });
    }

    if (dto.priority) {
      await this.activityLogService.create({
        task,
        type: 'change_prioriry',
        from: task.priority,
        to: dto.priority,
      });

      await this.historyService.create({
        taskTitle: task.title,
        type: 'change_prioriry',
        from: task.priority,
        to: dto.priority,
      });

      await this.taskRepository.update(id, {
        priority: dto.priority,
      });
    }

    if (dto.status) {
      await this.activityLogService.create({
        task,
        type: 'change_status',
        from: task.status,
        to: dto.status,
      });

      await this.historyService.create({
        taskTitle: task.title,
        type: 'change_status',
        from: task.status,
        to: dto.status,
      });

      await this.taskRepository.update(id, {
        status: dto.status,
      });
    }

    if (dto.dueDate) {
      await this.activityLogService.create({
        task,
        type: 'change_due_date',
        from: task.dueDate,
        to: dto.dueDate,
      });

      await this.historyService.create({
        taskTitle: task.title,
        type: 'change_due_date',
        from: task.dueDate,
        to: dto.dueDate,
      });

      await this.taskRepository.update(id, {
        dueDate: dto.dueDate,
      });
    }

    if (dto.description) {
      await this.activityLogService.create({
        task,
        type: 'change_description',
        from: null,
        to: null,
      });

      await this.historyService.create({
        taskTitle: task.title,
        type: 'change_description',
        from: null,
        to: null,
      });

      await this.taskRepository.update(id, {
        description: dto.description,
      });
    }

    return 'Sucessfully updated';
  }
}
