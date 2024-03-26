import { z } from 'zod';
import { schemaPriority, schemaStatus } from './schema';

export interface Board {
	id: number;
	title: string;
	tasks?: ITask[];
}

export interface IActivityLog {
	id: number;
	type:
		| 'create'
		| 'moved'
		| 'rename'
		| 'change_prioriry'
		| 'change_status'
		| 'change_due_date'
		| 'change_description';
	from: string;
	to: string;
	createdAt: Date;
}

export interface IHistory {
	id: number;
	taskTitle: string;
	type:
		| 'create'
		| 'moved'
		| 'rename'
		| 'change_prioriry'
		| 'change_status'
		| 'change_due_date'
		| 'change_description'
		| 'delete';
	from: string;
	to: string;
	createdAt: Date;
}

export interface ITask {
	id: number;
	title: string;
	description: string;
	dueDate: string;
	priority: Priority;
	status: Status;
	activityLogs: IActivityLog[];
}

export type Status = z.infer<typeof schemaStatus>;
export type Priority = z.infer<typeof schemaPriority>;
