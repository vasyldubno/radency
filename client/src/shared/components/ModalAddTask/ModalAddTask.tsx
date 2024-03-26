import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ZodError, z } from 'zod';
import { COLORS } from '../../../config/colors';
import { PRIORITY, STATUS } from '../../../config/consts';
import { createTask } from '../../../store/board/operations/createTask';
import { useAppDispatch } from '../../../store/store';
import { schemaPriority, schemaStatus } from '../../schema';
import { Board } from '../../types';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { InputDatePicker } from '../InputDatePicker/InputDatePicker';
import { Modal } from '../Modal/Modal';
import { Select } from '../Select/Select';
import { TextArea } from '../TextArea/TextArea';
import { ErrorMessage } from './ErrorMessage/ErrorMessage';
import { Wrapper } from './styled';
import { schemaForm } from './zod';

interface Props {
	isOpen: boolean;
	onClose: () => void;
	board: Board;
}

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

type FormSchema = z.infer<typeof schemaForm>;

export const ModalAddTask: FC<Props> = ({ isOpen, onClose, board }) => {
	const [errorMessage, setErrorMessage] = useState<string>('');

	const dispatch = useAppDispatch();

	const {
		formState: { errors },
		setValue,
		handleSubmit,
		control,
		reset,
	} = useForm<FormSchema>({
		mode: 'onBlur',
		resolver: zodResolver(schemaForm),
		defaultValues: { description: '' },
	});

	const onSubmit: SubmitHandler<FormSchema> = async (data) => {
		try {
			const status = schemaStatus.parse(data.status, {
				errorMap: () => ({ message: 'Invalid status' }),
			});
			const priority = schemaPriority.parse(data.priority, {
				errorMap: () => ({ message: 'Invalid priority' }),
			});

			const response = await dispatch(
				createTask({
					title: data.title,
					description: data.description,
					priority,
					dueDate: data.date.toISOString(),
					status,
					boardId: board.id,
				}),
			);

			if (createTask.fulfilled.match(response)) {
				onClose();
				reset();
			}
		} catch (error) {
			if (error instanceof ZodError) {
				console.log(error);
				setErrorMessage(error.errors[0].message);
			}
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={() => {
				onClose();
				reset();
			}}
			borderRadius="0.5rem"
		>
			<Wrapper onSubmit={handleSubmit(onSubmit)}>
				<div>
					<Controller
						name="title"
						control={control}
						render={({ field }) => (
							<Input placeholder="Enter task name" {...field} />
						)}
					/>
					{errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
				</div>
				<div>
					<Controller
						name="description"
						control={control}
						render={({ field }) => (
							<TextArea placeholder="Enter task description" {...field} />
						)}
					/>
					{errors.description && (
						<ErrorMessage>{errors.description.message}</ErrorMessage>
					)}
				</div>
				<div>
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
							/>
						)}
					/>
					{errors.priority && (
						<ErrorMessage>{errors.priority.message}</ErrorMessage>
					)}
				</div>
				<div>
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
							/>
						)}
					/>
					{errors.status && (
						<ErrorMessage>{errors.status.message}</ErrorMessage>
					)}
				</div>
				<div>
					<InputDatePicker
						onChange={(date) => {
							setValue('date', date);
						}}
					/>
					{errors.date && <ErrorMessage>{errors.date.message}</ErrorMessage>}
				</div>
				{errorMessage && (
					<p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>
				)}
				<Button backgroundColor={COLORS.accent} color="#fff" type="submit">
					Add new card
				</Button>
			</Wrapper>
		</Modal>
	);
};
