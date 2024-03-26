import { useEffect } from 'react';
import { ColumnList } from './components/ColumnList/ColumnList';
import { Header } from './components/Header/Header';
import { fetchBoard } from './store/board/operations/fetchBoard';
import { useAppDispatch } from './store/store';
import { fetchHistory } from './store/board/operations/fetchHistory';

export const App = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchBoard());
		dispatch(fetchHistory());
	}, []);

	return (
		<div style={{ padding: '1rem' }}>
			<Header />
			<ColumnList />
		</div>
	);
};
