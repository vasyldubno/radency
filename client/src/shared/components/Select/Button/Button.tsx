import { forwardRef } from 'react';
import { Combobox, Wrapper } from './styles';

interface Option {
	id: string;
	content: string;
	value: string;
	icon?: JSX.Element;
}

interface Props {
	isOpenDropdown: boolean;
	handleClickButton: () => void;
	selectedOption: Option | null;
	title: string;
}

export const Button = forwardRef<HTMLButtonElement, Props>(
	({ handleClickButton, isOpenDropdown, selectedOption, title }, ref) => {
		return (
			<Combobox
				role="combobox"
				id="select"
				value="Select"
				aria-controls="listbox"
				aria-haspopup="listbox"
				tabIndex={0}
				aria-expanded={isOpenDropdown}
				onClick={(e) => {
					e.preventDefault();
					handleClickButton();
				}}
				ref={ref}
			>
				{selectedOption ? (
					<Wrapper>
						{selectedOption.icon && <div>{selectedOption.icon}</div>}
						<p>{selectedOption.content}</p>
					</Wrapper>
				) : (
					<p>{title}</p>
				)}
			</Combobox>
		);
	},
);
