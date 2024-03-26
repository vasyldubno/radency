import { FC, useState } from 'react';
import { COLORS } from '../../../config/colors';
import { Button } from '../../../shared/components/Button/Button';
import { useClickOutside } from '../../../shared/hooks/useClickOutside';
import { Board } from '../../../shared/types';
import { deleteBoard } from '../../../store/board/operations/deleteBoard';
import { useAppDispatch } from '../../../store/store';
import { Content, Icon, Wrapper } from './styled';
import { ModalEditBoard } from '../../../shared/components/ModalEditBoard/ModalEditBoard';
import { ModalAddTask } from '../../../shared/components/ModalAddTask/ModalAddTask';

interface Props {
	board: Board;
}

export const Popover: FC<Props> = ({ board }) => {
	const [isShow, setIsShow] = useState(false);
	const [isShowModal, setIsShowModal] = useState(false);
	const [isShowModalAddNewTask, setIsShowModalAddNewTask] = useState(false);

	const dispatch = useAppDispatch();
	const ref = useClickOutside(() => setIsShow(false));

	return (
		<>
			<Wrapper ref={ref}>
				<Icon src="/dots-more.svg" onClick={() => setIsShow((prev) => !prev)} />
				{isShow && (
					<Content>
						<Button padding="0" onClick={() => setIsShowModal(true)}>
							Edit
						</Button>

						<Button padding="0" onClick={() => setIsShowModalAddNewTask(true)}>
							Add New Task
						</Button>

						<Button
							padding="0"
							color={COLORS.text.errorMessage}
							onClick={() => dispatch(deleteBoard({ boardId: board.id }))}
						>
							Delete
						</Button>
					</Content>
				)}
			</Wrapper>
			<ModalEditBoard
				isOpen={isShowModal}
				onClose={() => setIsShowModal(false)}
				board={board}
			/>
			<ModalAddTask
				board={board}
				isOpen={isShowModalAddNewTask}
				onClose={() => setIsShowModalAddNewTask(false)}
			/>
		</>
	);
};
