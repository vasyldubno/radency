import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Board, IHistory } from '../../shared/types';

type InitialState = {
	boards: Board[] | null;
	history: IHistory[] | null;
};

const initialState: InitialState = { boards: null, history: null };

const slice = createSlice({
	name: 'board',
	initialState,
	reducers: {
		addBoard: (state, action: PayloadAction<Board>) => {
			if (state.boards) {
				state.boards.push(action.payload);
			} else {
				state.boards = [action.payload];
			}
		},

		updateBoard: (state, action: PayloadAction<Board[] | null>) => {
			state.boards = action.payload;
		},

		updateHistory: (state, action: PayloadAction<IHistory[] | null>) => {
			state.history = action.payload;
		},
	},
});

export const boardReducer = slice.reducer;
export const boardActions = slice.actions;
