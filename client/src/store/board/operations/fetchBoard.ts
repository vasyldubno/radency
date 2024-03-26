import { createAsyncThunk } from '@reduxjs/toolkit';
import { BoardService } from '../../../service/boardService/boardService';
import { boardActions } from '../slice';

export const fetchBoard = createAsyncThunk(
	'fetchBoard',
	async (_, thunkAPI) => {
		try {
			const boards = await BoardService.getAll();
			thunkAPI.dispatch(boardActions.updateBoard(boards.data));
			return thunkAPI.fulfillWithValue(boards.data);
		} catch {
			return thunkAPI.rejectWithValue('Error Thunk fetchBoard');
		}
	},
);
