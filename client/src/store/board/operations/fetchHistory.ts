import { createAsyncThunk } from '@reduxjs/toolkit';
import { HistoryService } from '../../../service/historyService/historyService';
import { IHistory } from '../../../shared/types';
import { boardActions } from '../slice';

export const fetchHistory = createAsyncThunk<IHistory[]>(
	'fetchHistory',
	async (_, thunkAPI) => {
		try {
			const history = await HistoryService.getAll();
			thunkAPI.dispatch(boardActions.updateHistory(history.data));
			return thunkAPI.fulfillWithValue(history.data);
		} catch {
			return thunkAPI.rejectWithValue('Error Thunk fetchHistory');
		}
	},
);
