import { Priority, Status } from '../../shared/types';

export interface CreateTaskDto {
	title: string;
	description: string;
	dueDate: string;
	priority: Priority;
	status: Status;
	boardId: number;
}

export interface UpdateDto {
	title?: string;
	description?: string;
	dueDate?: string;
	priority?: Priority;
	status?: Status;
	boardId?: number;
}
