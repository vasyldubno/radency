import { createAsyncThunk } from '@reduxjs/toolkit';
import { TaskService } from '../../../service/taskService/taskService';
import { CreateTaskDto } from '../../../service/taskService/types';
import { ITask } from '../../../shared/types';
import { fetchBoard } from './fetchBoard';
import { fetchHistory } from './fetchHistory';

export const createTask = createAsyncThunk<ITask, CreateTaskDto>(
	'createTask',
	async (args, thunkAPI) => {
		try {
			const result = await TaskService.create(args);
			await thunkAPI.dispatch(fetchBoard());
			await thunkAPI.dispatch(fetchHistory());
			return thunkAPI.fulfillWithValue(result.data);
		} catch {
			return thunkAPI.rejectWithValue('Error Thunk createTask');
		}
	},
);
