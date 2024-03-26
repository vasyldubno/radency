import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { COLORS } from '../../../config/colors';
import { updateBoard } from '../../../store/board/operations/updateBoard';
import { useAppDispatch } from '../../../store/store';
import { Board } from '../../types';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Modal } from '../Modal/Modal';
import { Form, Text, Title, Wrapper } from './styled';
import { schemaForm } from './zod';

interface Props {
	isOpen: boolean;
	onClose: () => void;
	board: Board;
}

type FormSchema = z.infer<typeof schemaForm>;

export const ModalEditBoard: FC<Props> = ({ isOpen, onClose, board }) => {
	const [isEditMode, setIsEditMode] = useState(false);

	const dispatch = useAppDispatch();

	const { handleSubmit, control, reset } = useForm<FormSchema>({
		mode: 'onBlur',
		resolver: zodResolver(schemaForm),
		defaultValues: {
			title: board.title,
		},
	});

	const onSubmit: SubmitHandler<FormSchema> = async (data) => {
		const response = await dispatch(
			updateBoard({ title: data.title, boardId: board.id }),
		);

		if (updateBoard.fulfilled.match(response)) {
			onClose();
			reset();
			setIsEditMode(false);
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
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Title>
						{isEditMode ? (
							<Controller
								control={control}
								name="title"
								render={({ field }) => <Input {...field} />}
							/>
						) : (
							<Text fontSize="1.5rem" fontWeight="700">
								{board.title}
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
				</Form>
			</Wrapper>
		</Modal>
	);
};
