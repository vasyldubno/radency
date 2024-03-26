import { styled } from 'styled-components';

export const Wrapper = styled.div`
	display: flex;
	width: 80dvw;
	max-height: 80dvh;
	padding: 2rem 1.5rem;
`;

export const Form = styled.form`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

export const Right = styled.div`
	width: 40%;
	background-color: #f3f4f6;
	padding: 2rem 1.5rem;
`;

export const Title = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 1rem;
`;

export const Text = styled.p<{
	color?: string;
	fontWeight?: string;
	fontSize?: string;
}>`
	color: ${(props) => props.color || 'inherit'};
	font-weight: ${(props) => props.fontWeight || 'inherit'};
	font-size: ${(props) => props.fontSize || 'inherit'};
`;

export const Description = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.1rem;
`;

export const Grid = styled.div`
	display: grid;
	grid-template-columns: min-content auto;
	grid-template-rows: auto auto auto;
	gap: 0.5rem 1rem;
`;

export const GridItem = styled.div`
	white-space: nowrap;
	&:nth-child(2n-1) {
		align-self: center;
	}
`;
