import { FC, useState } from 'react';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { ITask } from '../../../types';
import { Button } from '../../Button/Button';
import { ModalEditTask } from '../../ModalEditTask/ModalEditTask';
import { Content, Icon, Wrapper } from './styled';
import { COLORS } from '../../../../config/colors';
import { useAppDispatch } from '../../../../store/store';
import { deleteTask } from '../../../../store/board/operations/deleteTask';

interface Props {
	task: ITask;
}

export const Popover: FC<Props> = ({ task }) => {
	const [isShow, setIsShow] = useState(false);
	const [isShowModal, setIsShowModal] = useState(false);

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
						<Button
							padding="0"
							color={COLORS.text.errorMessage}
							onClick={() => dispatch(deleteTask({ taskId: task.id }))}
						>
							Delete
						</Button>
					</Content>
				)}
			</Wrapper>
			<ModalEditTask
				isOpen={isShowModal}
				onClose={() => setIsShowModal(false)}
				task={task}
			/>
		</>
	);
};
