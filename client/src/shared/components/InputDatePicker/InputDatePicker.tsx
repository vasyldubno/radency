import 'react-day-picker/dist/style.css';
import { FC, useEffect, useRef, useState } from 'react';
import { Input } from '../Input/Input';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { Wrapper } from './styled';
import { useClickOutside } from '../../hooks/useClickOutside';

interface Props {
	onChange: (date: Date) => void;
	defaultSelectedDate?: Date;
}

export const InputDatePicker: FC<Props> = ({
	onChange,
	defaultSelectedDate,
}) => {
	const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);
	const [selectedDate, setSelectedDate] = useState<Date>(
		defaultSelectedDate || new Date(),
	);
	const [inputBounding, setInputBounding] = useState<DOMRect | null>(null);

	const refInput = useRef<HTMLInputElement>(null);
	const refWrapper = useClickOutside(() => setIsOpenDatePicker(false));

	useEffect(() => {
		if (refInput.current) {
			const bounding = refInput.current.getBoundingClientRect();
			setInputBounding(bounding);
		}
	}, [refInput]);

	useEffect(() => {
		onChange(selectedDate);
	}, [selectedDate]);

	return (
		<Wrapper ref={refWrapper}>
			<Input
				ref={refInput}
				value={format(selectedDate, 'dd.MM.yyyy')}
				onClick={() => {
					setIsOpenDatePicker((prev) => !prev);
				}}
			/>
			{isOpenDatePicker && (
				<DayPicker
					style={{
						position: 'absolute',
						backgroundColor: '#ffffff',
						border: '1px solid var(--color-border)',
						borderRadius: '0.3rem',
						zIndex: 5,
						bottom: inputBounding ? `${inputBounding.height}px` : '0',
						margin: '0',
					}}
					mode="single"
					selected={selectedDate}
					onSelect={(date) => {
						if (date) {
							setSelectedDate(date);
							setIsOpenDatePicker(false);
						}
					}}
				/>
			)}
		</Wrapper>
	);
};
