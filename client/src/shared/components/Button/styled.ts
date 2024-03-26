import { styled } from 'styled-components';

export const Wrapper = styled.button<{
	borderColor?: string;
	borderStyle?: string;
	backgroundColor?: string;
	color?: string;
	padding?: string;
	isFullWidth?: boolean;
}>`
	background-color: ${(props) => props.backgroundColor || 'transparent'};
	border: ${(props) =>
		`1px ${props.borderStyle || 'solid'} ${
			props.borderColor || 'transparent'
		}`};
	color: ${(props) => props.color || 'inherit'};
	padding: ${(props) => props.padding || '0.5rem 1rem'};
	border-radius: 0.3rem;
	cursor: pointer;
	font-size: 1rem;
	white-space: nowrap;
	width: ${(props) => (props.isFullWidth ? '100%' : 'fit-content')};
	&:disabled {
		cursor: not-allowed;
		opacity: 0.7;
	}
`;
