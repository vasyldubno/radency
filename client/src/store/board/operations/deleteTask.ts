import { createAsyncThunk } from '@reduxjs/toolkit';
import { TaskService } from '../../../service/taskService/taskService';
import { fetchBoard } from './fetchBoard';

export const deleteTask = createAsyncThunk<unknown, { taskId: number }>(
	'deleteTask',
	async (args, thunkAPI) => {
		try {
			const response = await TaskService.delete(args.taskId);
			await thunkAPI.dispatch(fetchBoard());
			return thunkAPI.fulfillWithValue(response.data);
		} catch {
			return thunkAPI.rejectWithValue('Error Thunk deleteTask');
		}
	},
);
