import { format } from 'date-fns';
import { FC } from 'react';
import { updateTask } from '../../../store/board/operations/updateTask';
import { selectBoards } from '../../../store/board/selector';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { ITask } from '../../types';
import { DropdownMenu } from '../DropdownMenu/DropdownMenu';
import { Popover } from './Popover/Popover';
import { Description, Priority, PriorityText, Title, Wrapper } from './styled';

interface Props {
	task: ITask;
}

export const Task: FC<Props> = ({ task }) => {
	const boards = useAppSelector(selectBoards);
	const dispatch = useAppDispatch();

	return (
		<Wrapper>
			<Popover task={task} />
			<Title>{task.title}</Title>
			{task.description && <Description>{task.description}</Description>}
			<p>{format(task.dueDate, 'iii, dd MMM')}</p>
			<Priority>
				<PriorityText>{task.priority}</PriorityText>
			</Priority>
			{boards && (
				<DropdownMenu
					title="Move to:"
					optionList={boards.map((board) => ({
						id: board.id.toString(),
						content: board.title,
						onClick: () => {
							dispatch(
								updateTask({
									updateTaskDto: { boardId: board.id },
									taskId: task.id,
								}),
							);
						},
					}))}
					styles={{ backgroundColor: '#e2e3eb' }}
				/>
			)}
		</Wrapper>
	);
};
