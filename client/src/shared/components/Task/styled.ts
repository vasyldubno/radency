import { styled } from 'styled-components';

export const Wrapper = styled.div`
	border: 1px solid var(--color-border);
	border-radius: 0.3rem;
	padding: 0.5rem;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	position: relative;
`;

export const Title = styled.p`
	color: var(--color-text-primary);
`;

export const Description = styled.p`
	color: var(--color-text-secondary);
`;

export const Priority = styled.div`
	background-color: #f3f4f6;
	width: fit-content;
	padding: 0.3rem 0.9rem;
	border-radius: 0.9rem;
`;

export const PriorityText = styled.p`
	color: #8c91a5;
	display: flex;
	align-items: center;
	gap: 0.5rem;
	&::before {
		content: '';
		display: block;
		width: 0.5rem;
		height: 0.5rem;
		background-color: #8c91a5;
		border-radius: 100%;
	}
`;
