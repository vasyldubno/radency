import { Axios } from '../../config/axios';
import { ITask } from '../../shared/types';
import { CreateTaskDto, UpdateDto } from './types';

export class TaskService {
	static async getAll() {
		return await Axios.get<ITask[]>('/tasks');
	}

	static async getById(id: number) {
		return await Axios.get<ITask>(`/tasks/${id}`);
	}

	static async create(dto: CreateTaskDto) {
		return await Axios.post<ITask>('/tasks', dto);
	}

	static async update(dto: UpdateDto, taskId: number) {
		return await Axios.patch(`/tasks/${taskId}`, dto);
	}

	static async delete(taskId: number) {
		return await Axios.delete(`/tasks/${taskId}`);
	}
}
