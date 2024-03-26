import { createAsyncThunk } from '@reduxjs/toolkit';
import { BoardService } from '../../../service/boardService/boardService';
import { fetchBoard } from './fetchBoard';

export const deleteBoard = createAsyncThunk<unknown, { boardId: number }>(
	'deleteBoard',
	async (args, thunkAPI) => {
		try {
			const response = await BoardService.delete(args.boardId);
			await thunkAPI.dispatch(fetchBoard());
			return thunkAPI.fulfillWithValue(response.data);
		} catch {
			return thunkAPI.rejectWithValue('Error Thunk deleteBoard');
		}
	},
);
