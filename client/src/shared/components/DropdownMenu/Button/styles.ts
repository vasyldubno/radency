import { styled } from 'styled-components';

export const Combobox = styled.button<{
	styles?: {
		backgroundColor?: string;
		borderColor?: string;
		color?: string;
	};
}>`
	margin: 0;
	padding: 0.5rem;
	cursor: pointer;
	border: 1px solid var(--color-border);
	border-radius: 0.3rem;
	border-color: ${(props) => props.styles?.borderColor || 'transparent'};
	background-color: ${(props) =>
		props.styles?.backgroundColor || 'transparent'};
	width: 100%;
	font-size: 1rem;
	color: ${(props) => props.styles?.color || 'inherit'};
`;
