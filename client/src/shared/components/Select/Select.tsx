import { FC, useEffect, useRef, useState } from 'react';
import { Button } from './Button/Button';
import { useClickOutside } from '../../hooks/useClickOutside';
import { Container, Listbox, Option, WrapperOptions } from './styles';
import { IOption } from './types';

interface Props {
	optionList: IOption[];
	title: string;
	onSubmit: (option: IOption) => void;
	defaultSelectedOption?: IOption;
}

export const Select: FC<Props> = ({
	optionList,
	onSubmit,
	title,
	defaultSelectedOption,
}) => {
	const [isOpenDropdown, setIsOpenDropdown] = useState(false);
	const [buttomDOMRect, setButtomDOMRect] = useState<DOMRect | null>(null);
	const [selectedOption, setSelectedOption] = useState<IOption | null>(
		defaultSelectedOption || null,
	);
	const [heightListbox, setHeightListbox] = useState<number>(0);

	const refButton = useRef<HTMLButtonElement>(null);
	const refContainer = useClickOutside(() => setIsOpenDropdown(false));

	const handleClckButton = () => {
		setIsOpenDropdown((prev) => !prev);
	};

	const handleClickOption = (option: IOption) => {
		setSelectedOption(option);
		setIsOpenDropdown(false);
		onSubmit(option);
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
		<Container ref={refContainer} onSubmit={(e) => e.preventDefault()}>
			<Button
				selectedOption={selectedOption}
				handleClickButton={handleClckButton}
				isOpenDropdown={isOpenDropdown}
				ref={refButton}
				title={title}
			/>
			<Listbox
				role="listbox"
				id="listbox"
				tabIndex={-1}
				buttomDOMRect={buttomDOMRect}
				isOpenDropdown={isOpenDropdown}
				heightListbox={heightListbox}
			>
				{optionList.map((li) => (
					<WrapperOptions key={li.id}>
						{li.icon && <div>{li.icon}</div>}
						<Option
							role="option"
							aria-selected={li.value === selectedOption?.value}
							value={li.value}
							selectedOption={selectedOption}
							li={li}
							onClick={() => handleClickOption(li)}
							onKeyUp={() => handleClickOption(li)}
						>
							{li.content}
						</Option>
					</WrapperOptions>
				))}
			</Listbox>
		</Container>
	);
};
