import { createAsyncThunk } from '@reduxjs/toolkit';
import { UpdateDto } from '../../../service/taskService/types';
import { TaskService } from '../../../service/taskService/taskService';
import { fetchBoard } from './fetchBoard';
import { fetchHistory } from './fetchHistory';

interface Args {
	updateTaskDto: UpdateDto;
	taskId: number;
}

export const updateTask = createAsyncThunk<unknown, Args>(
	'updateTask',
	async (args, thunkAPI) => {
		try {
			const response = await TaskService.update(
				args.updateTaskDto,
				args.taskId,
			);
			await thunkAPI.dispatch(fetchBoard());
			await thunkAPI.dispatch(fetchHistory());
			return thunkAPI.fulfillWithValue(response.data);
		} catch {
			return thunkAPI.rejectWithValue('Error Thunk updateTask');
		}
	},
);
