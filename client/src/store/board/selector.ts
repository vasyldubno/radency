import { RootState } from '../store';

export const selectBoards = (store: RootState) => store.boards.boards;
export const selectHistoryList = (store: RootState) => store.boards.history;
