import { styled } from 'styled-components';

export const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.3);
	z-index: 5;
`;

export const Content = styled.div<{
	placement?: 'center' | 'right';
	isFullHeight?: boolean;
	borderRadius: string;
}>`
	position: absolute;
	top: ${(props) => (props.placement === 'right' ? '' : '50%')};
	left: ${(props) => (props.placement === 'right' ? '' : '50%')};
	right: ${(props) => (props.placement === 'right' ? '0' : '')};
	transform: ${(props) =>
		props.placement === 'right' ? 'translate(0, 0)' : 'translate(-50%, -50%)'};
	border-radius: ${(props) => props.borderRadius};
	background-color: #ffffff;
	max-height: 100dvh;
	height: ${(props) => (props.isFullHeight ? '100%' : 'auto')};
`;

export const Header = styled.div<{ borderRadius: string }>`
	background-color: var(--color-accent);
	width: 100%;
	border-radius: ${(props) => props.borderRadius};
	padding: 0.5rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const Children = styled.div``;

export const Icon = styled.img`
	width: 1rem;
	height: 1rem;
	padding: 0;
	cursor: pointer;
`;

export const Title = styled.p`
	color: #fff;
	font-weight: 700;
`;
