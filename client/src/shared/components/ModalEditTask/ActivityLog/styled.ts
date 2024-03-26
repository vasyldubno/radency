import { styled } from 'styled-components';

export const Span = styled.span`
	font-weight: 700;
	color: var(--color-text-primary);
`;

export const Date = styled.p`
	font-style: italic;
	font-size: 0.8rem;
	color: var(--color-text-secondary);
	white-space: nowrap;
`;

export const Wrapper = styled.div`
	display: flex;
	gap: 1rem;
	justify-content: space-between;
`;

export const Message = styled.p`
	color: var(--color-text-secondary);
`;
