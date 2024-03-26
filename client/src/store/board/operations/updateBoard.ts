import { createAsyncThunk } from '@reduxjs/toolkit';
import { BoardService } from '../../../service/boardService/boardService';
import { fetchBoard } from './fetchBoard';

interface Args {
	title?: string;
	boardId: number;
}

export const updateBoard = createAsyncThunk<unknown, Args>(
	'updateBoard',
	async (args, thunkAPI) => {
		try {
			const response = await BoardService.update(
				{ title: args.title },
				args.boardId,
			);
			await thunkAPI.dispatch(fetchBoard());
			return thunkAPI.fulfillWithValue(response.data);
		} catch {
			return thunkAPI.rejectWithValue('Error Thunk updateBoard');
		}
	},
);
