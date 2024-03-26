import { FC, useState } from 'react';
import { Board } from '../../shared/types';
import { Header, Wrapper, WrapperTasks } from './styles';
import { Button } from '../../shared/components/Button/Button';
import { COLORS } from '../../config/colors';
import { ModalAddTask } from '../../shared/components/ModalAddTask/ModalAddTask';
import { Task } from '../../shared/components/Task/Task';
import { Popover } from './Popover/Popover';

interface Props {
	board: Board;
}

export const Column: FC<Props> = ({ board }) => {
	const [isOpenAddTask, setIsOpenAddTask] = useState(false);

	return (
		<>
			<Wrapper>
				<Header>
					<p>{board.title}</p>
					<Popover board={board} />
				</Header>
				<Button
					borderStyle="dashed"
					borderColor={COLORS.border}
					onClick={() => setIsOpenAddTask(true)}
					isFullWidth
				>
					Add new card
				</Button>
				<WrapperTasks>
					{board.tasks?.map((task) => (
						<Task key={task.id} task={task} />
					))}
				</WrapperTasks>
			</Wrapper>
			<ModalAddTask
				isOpen={isOpenAddTask}
				onClose={() => setIsOpenAddTask(false)}
				board={board}
			/>
		</>
	);
};
