import { styled } from 'styled-components';
import { IOption } from './types';

export const Container = styled.div`
	position: relative;
	width: 100%;
`;

// export const Combobox = styled.div`
// 	margin: 0;
// 	padding: 0.5rem;
// 	cursor: pointer;
// 	border: 1px solid var(--color-border);
// 	border-radius: 0.3rem;
// 	background-color: transparent;
// 	width: 100%;
// `;

export const Listbox = styled.ul<{
	buttomDOMRect: DOMRect | null;
	isOpenDropdown: boolean;
	heightListbox: number;
}>`
	margin: 0;
	padding: 0;
	position: absolute;
	top: ${(props) =>
		props.buttomDOMRect ? `${props.buttomDOMRect.height}px` : 0};
	left: 0;
	background-color: #ffffff;
	transform-origin: top left;
	transition: all 0.3s ease-in;
	pointer-events: none;
	width: 100%;
	overflow-y: auto;
	opacity: ${(props) => (props.isOpenDropdown ? 1 : 0)};
	transform: ${(props) =>
		props.isOpenDropdown ? 'scale(1, 1)' : 'scale(1,0)'};
	pointer-events: ${(props) => (props.isOpenDropdown ? 'auto' : 'none')};
	max-height: ${(props) => `${props.heightListbox - 10}px`};
	z-index: 5;
`;

export const Option = styled.li<{
	selectedOption: IOption | null;
	li: IOption;
}>`
	list-style-type: none;
	transition: all 0.3s ease-in;
	padding: 0.5rem;
	cursor: pointer;
`;

// export const Item = styled.div`
// 	font-size: 0.9rem;
// 	font-family: var(--font);
// 	&::selection {
// 		background-color: red;
// 	}
// `;

// export const Select = styled.div`
// 	color: var(--color-text-active);
// 	font-size: 0.9rem;
// 	font-family: var(--font);
// 	padding: 0rem;
// `;

export const WrapperOptions = styled.div`
	display: flex;
	align-items: center;
	padding-left: 0.5rem;
`;
