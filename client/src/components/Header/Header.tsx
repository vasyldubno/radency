import { useState } from 'react';
import { COLORS } from '../../config/colors';
import { Button } from '../../shared/components/Button/Button';
import { ModalAddBoard } from '../../shared/components/ModalAddBoard/ModalAddBoard';
import { Right, Wrapper } from './styled';
import { useAppSelector } from '../../store/store';
import { ModalHistory } from '../../shared/components/ModalHistory/ModalHistory';

export const Header = () => {
	const [isOpenAddBoard, setIsOpenAddBoard] = useState(false);
	const [isOpenHistory, setIsOpenHistory] = useState(false);

	const handleAddBoardClose = () => {
		setIsOpenAddBoard(false);
	};

	const handleHistoryClose = () => {
		setIsOpenHistory(false);
	};

	const handleClickNewBoard = () => {
		setIsOpenAddBoard(true);
	};

	const handleClickHistory = () => {
		setIsOpenHistory(true);
	};

	const boardList = useAppSelector((store) => store.boards);
	console.log(boardList);

	return (
		<>
			<Wrapper>
				<h1>My Task Board</h1>
				<Right>
					<Button borderColor={COLORS.border} onClick={handleClickHistory}>
						<p style={{ color: COLORS.text.primary }}>History</p>
					</Button>
					<Button backgroundColor={COLORS.accent} onClick={handleClickNewBoard}>
						<p style={{ color: '#fff' }}>Create new list</p>
					</Button>
				</Right>
			</Wrapper>
			<ModalAddBoard isOpen={isOpenAddBoard} onClose={handleAddBoardClose} />
			<ModalHistory isOpen={isOpenHistory} onClose={handleHistoryClose} />
		</>
	);
};
