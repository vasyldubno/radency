import { forwardRef } from 'react';
import { Combobox } from './styles';

interface Props {
	isOpenDropdown: boolean;
	handleClckButton: () => void;
	title: string;
	styles?: {
		backgroundColor?: string;
		borderColor?: string;
		color?: string;
	};
}

export const Button = forwardRef<HTMLButtonElement, Props>(
	({ handleClckButton, isOpenDropdown, title, styles }, ref) => {
		return (
			<Combobox
				style={styles}
				role="combobox"
				id="select"
				value="Select"
				aria-controls="listbox"
				aria-haspopup="listbox"
				tabIndex={0}
				aria-expanded={isOpenDropdown}
				onClick={handleClckButton}
				ref={ref}
			>
				<p>{title}</p>
			</Combobox>
		);
	},
);
