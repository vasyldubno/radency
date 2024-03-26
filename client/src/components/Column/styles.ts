import { styled } from 'styled-components';

export const Header = styled.p`
	font-size: 1rem;
	color: var(--color-text-primary);
	border-top: 1px solid var(--color-border);
	border-bottom: 1px solid var(--color-border);
	position: relative;
	display: flex;
	align-items: center;
`;

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	width: 250px;
`;

export const WrapperTasks = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;
