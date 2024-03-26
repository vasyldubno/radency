import { selectBoards } from '../../store/board/selector';
import { useAppSelector } from '../../store/store';
import { Column } from '../Column/Column';
import { Wrapper } from './styles';

export const ColumnList = () => {
	const boards = useAppSelector(selectBoards);

	return (
		<Wrapper>
			{boards && boards.map((board) => <Column key={board.id} board={board} />)}
		</Wrapper>
	);
};
