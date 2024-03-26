import { FC, useEffect, useRef, useState } from 'react';
import { Button } from './Button/Button';
import { useClickOutside } from '../../hooks/useClickOutside';
import { Container, Listbox, Option, WrapperOptions } from './styles';
import { IOption } from './types';

interface Props {
	optionList: IOption[];
	title: string;
	styles?: {
		backgroundColor?: string;
		borderColor?: string;
		color?: string;
	};
}

export const DropdownMenu: FC<Props> = ({ optionList, title, styles }) => {
	const [isOpenDropdown, setIsOpenDropdown] = useState(false);
	const [buttomDOMRect, setButtomDOMRect] = useState<DOMRect | null>(null);
	const [selectedOption, setSelectedOption] = useState<IOption | null>(null);
	const [heightListbox, setHeightListbox] = useState<number>(0);

	const refButton = useRef<HTMLButtonElement>(null);
	const refContainer = useClickOutside(() => setIsOpenDropdown(false));

	const handleClickButton = () => {
		setIsOpenDropdown((prev) => !prev);
	};

	const handleClickOption = (option: IOption) => {
		setSelectedOption(option);
		setIsOpenDropdown(false);
	};

	useEffect(() => {
		if (refButton.current) {
			setButtomDOMRect(refButton.current.getBoundingClientRect());

			setHeightListbox(
				document.documentElement.clientHeight -
					refButton.current.getBoundingClientRect().bottom,
			);
		}
	}, [refButton]);

	return (
		<Container ref={refContainer}>
			<Button
				handleClckButton={handleClickButton}
				isOpenDropdown={isOpenDropdown}
				ref={refButton}
				title={title}
				styles={styles}
			/>
			<Listbox
				role="listbox"
				id="listbox"
				tabIndex={-1}
				buttomDOMRect={buttomDOMRect}
				isOpenDropdown={isOpenDropdown}
				heightListbox={heightListbox}
			>
				{optionList.map((option) => (
					<WrapperOptions key={option.id}>
						{option.icon && <div>{option.icon}</div>}
						<Option
							role="option"
							// aria-selected={li.value === selectedOption?.value}
							// value={li.value}
							selectedOption={selectedOption}
							li={option}
							onClick={() => {
								handleClickOption(option);
								option.onClick();
							}}
							onKeyUp={() => handleClickOption(option)}
						>
							{option.content}
						</Option>
					</WrapperOptions>
				))}
			</Listbox>
		</Container>
	);
};
