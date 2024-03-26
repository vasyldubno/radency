import { FC, useState } from 'react';
import { COLORS } from '../../../config/colors';
import { createBoard } from '../../../store/board/operations/createBoard';
import { useAppDispatch } from '../../../store/store';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Modal } from '../Modal/Modal';
import { Wrapper } from './styled';

interface Props {
	isOpen: boolean;
	onClose: () => void;
}

export const ModalAddBoard: FC<Props> = ({ isOpen, onClose }) => {
	const [value, setValue] = useState('');

	const dispatch = useAppDispatch();

	const handleClick = async () => {
		const response = await dispatch(createBoard({ title: value }));

		if (createBoard.fulfilled.match(response)) {
			onClose();
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} borderRadius="0.5rem">
			<Wrapper>
				<Input
					placeholder="Enter board name"
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
				<Button
					backgroundColor={COLORS.accent}
					color="#fff"
					onClick={handleClick}
					disabled={!(value.length > 0)}
				>
					Create new list
				</Button>
			</Wrapper>
		</Modal>
	);
};
