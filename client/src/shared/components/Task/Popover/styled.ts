import { styled } from 'styled-components';

export const Icon = styled.img`
	width: 1rem;
	height: 1rem;
	cursor: pointer;
`;

export const Wrapper = styled.div`
	position: absolute;
	top: 0.5rem;
	right: 0.5rem;
`;

export const Content = styled.div`
	position: absolute;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	padding: 0.5rem;
	border-radius: 0.3rem;
	border: 1px solid var(--color-border);
	background-color: #ffffff;
`;
