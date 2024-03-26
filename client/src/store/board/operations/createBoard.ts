import { createAsyncThunk } from '@reduxjs/toolkit';
import { BoardService } from '../../../service/boardService/boardService';
import { CreateDto } from '../../../service/boardService/types';
import { Board } from '../../../shared/types';
import { boardActions } from '../slice';

export const createBoard = createAsyncThunk<Board, CreateDto>(
	'createBoard',
	async (args, thunkAPI) => {
		try {
			const result = await BoardService.create(args);
			thunkAPI.dispatch(boardActions.addBoard(result.data));
			return thunkAPI.fulfillWithValue(result.data);
		} catch {
			return thunkAPI.rejectWithValue('Error Thunk createBoard');
		}
	},
);
