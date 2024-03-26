import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { FC, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ZodError, z } from 'zod';
import { COLORS } from '../../../config/colors';
import { PRIORITY, STATUS } from '../../../config/consts';
import { updateTask } from '../../../store/board/operations/updateTask';
import { useAppDispatch } from '../../../store/store';
import { schemaPriority, schemaStatus } from '../../schema';
import { ITask } from '../../types';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { InputDatePicker } from '../InputDatePicker/InputDatePicker';
import { Modal } from '../Modal/Modal';
import { Select } from '../Select/Select';
import { TextArea } from '../TextArea/TextArea';
import { ActivityLog } from './ActivityLog/ActivityLog';
import {
	ActivityLogList,
	Description,
	Grid,
	GridItem,
	Left,
	Right,
	Text,
	Title,
	Wrapper,
} from './styled';
import { schemaForm } from './zod';

interface Props {
	isOpen: boolean;
	onClose: () => void;
	task: ITask;
}

type FormSchema = z.infer<typeof schemaForm>;

const optionsPriority = PRIORITY.map((priority, index) => ({
	id: index.toString(),
	content: priority,
	value: priority,
}));

const optionsStatus = Object.values(STATUS).map((status, index) => ({
	id: index.toString(),
	content: status.replace('_', ' '),
	value: status,
}));

export const ModalEditTask: FC<Props> = ({ isOpen, onClose, task }) => {
	const [isEditMode, setIsEditMode] = useState(false);

	const dispatch = useAppDispatch();

	const { handleSubmit, control, reset } = useForm<FormSchema>({
		mode: 'onChange',
		resolver: zodResolver(schemaForm),
		defaultValues: {
			description: task.description,
			title: task.title,
			priority: task.priority,
			status: task.status,
		},
	});

	const onSubmit: SubmitHandler<FormSchema> = async (data) => {
		try {
			const status = schemaStatus.parse(data.status, {
				errorMap: () => ({ message: 'Invalid status' }),
			});
			const priority = schemaPriority.parse(data.priority, {
				errorMap: () => ({ message: 'Invalid priority' }),
			});

			const updateTaskData = {
				title: data.title === task.title ? undefined : data.title,
				description:
					data.description === task.description ? undefined : data.description,
				priority: priority === task.priority ? undefined : priority,
				status: status === task.status ? undefined : status,
				dueDate:
					data.date?.toISOString() === task.dueDate
						? undefined
						: data.date?.toISOString(),
			};

			const response = await dispatch(
				updateTask({
					updateTaskDto: updateTaskData,
					taskId: task.id,
				}),
			);

			if (updateTask.fulfilled.match(response)) {
				onClose();
				reset();
				setIsEditMode(false);
			}
		} catch (error) {
			if (error instanceof ZodError) {
				console.log(error.errors[0].message);
			}
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={() => {
				onClose();
				reset();
				setIsEditMode(false);
			}}
			borderRadius="0.5rem"
		>
			<Wrapper>
				<Left onSubmit={handleSubmit(onSubmit)}>
					<Title>
						{isEditMode ? (
							<Controller
								control={control}
								name="title"
								render={({ field }) => <Input {...field} />}
							/>
						) : (
							<Text fontSize="1.5rem" fontWeight="700">
								{task.title}
							</Text>
						)}
						<Button
							borderColor={COLORS.border}
							onClick={(e) => {
								setIsEditMode(true);
								e.preventDefault();
							}}
						>
							Edit Task
						</Button>
					</Title>

					<Grid>
						<GridItem>
							<p>Status:</p>
						</GridItem>
						<GridItem>
							{isEditMode ? (
								<Controller
									control={control}
									name="status"
									render={({ field }) => (
										<Select
											title="Select status"
											optionList={optionsStatus}
											onSubmit={(option) => {
												field.onChange(option.value);
											}}
											defaultSelectedOption={optionsStatus.find(
												(option) => option.value === task.status,
											)}
										/>
									)}
								/>
							) : (
								<p>{task.status}</p>
							)}
						</GridItem>

						<GridItem>
							<p>Priority:</p>
						</GridItem>
						<GridItem>
							{isEditMode ? (
								<Controller
									control={control}
									name="priority"
									render={({ field }) => (
										<Select
											title="Select priority"
											optionList={optionsPriority}
											onSubmit={(option) => {
												field.onChange(option.value);
											}}
											defaultSelectedOption={optionsPriority.find(
												(option) => option.value === task.priority,
											)}
										/>
									)}
								/>
							) : (
								<p>{task.priority}</p>
							)}
						</GridItem>

						<GridItem>
							<p>Due date:</p>
						</GridItem>
						<GridItem>
							{isEditMode ? (
								<Controller
									control={control}
									name="date"
									render={({ field }) => (
										<InputDatePicker
											defaultSelectedDate={new Date(task.dueDate)}
											onChange={(date) => {
												field.onChange(date);
											}}
										/>
									)}
								/>
							) : (
								<p>{format(task.dueDate, 'iii, dd MMM')}</p>
							)}
						</GridItem>
					</Grid>

					<Description>
						<Text fontSize="1.2rem" fontWeight="700">
							Description
						</Text>
						{isEditMode ? (
							<Controller
								control={control}
								name="description"
								render={({ field }) => <TextArea {...field} />}
							/>
						) : (
							<Text color={COLORS.text.secondary}>{task.description}</Text>
						)}
					</Description>

					{isEditMode && (
						<Button
							style={{ alignSelf: 'center' }}
							backgroundColor={COLORS.accent}
							color="#ffffff"
							type="submit"
						>
							Save
						</Button>
					)}
				</Left>
				<Right>
					<Text fontSize="1.1rem" fontWeight="700">
						Activity
					</Text>
					<ActivityLogList>
						{task.activityLogs.map((activityLog) => (
							<ActivityLog activityLog={activityLog} key={activityLog.id} />
						))}
					</ActivityLogList>
				</Right>
			</Wrapper>
		</Modal>
	);
};
