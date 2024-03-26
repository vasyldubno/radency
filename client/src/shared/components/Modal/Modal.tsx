import { FC, PropsWithChildren } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';
import { Children, Content, Header, Icon, Overlay, Title } from './styled';

interface Props extends PropsWithChildren {
	isOpen: boolean;
	onClose: () => void;
	placement?: 'center' | 'right';
	isFullHeight?: boolean;
	borderRadius: string;
	title?: string;
}

export const Modal: FC<Props> = ({
	isOpen,
	onClose,
	children,
	borderRadius,
	isFullHeight,
	placement,
	title,
}) => {
	const refContent = useClickOutside(onClose);

	return (
		<>
			{isOpen && (
				<Overlay>
					<Content
						ref={refContent}
						placement={placement}
						isFullHeight={isFullHeight}
						borderRadius={borderRadius}
					>
						<Header borderRadius={`${borderRadius} ${borderRadius} 0 0`}>
							<Title>{title}</Title>
							<Icon src="/close.svg" onClick={onClose} />
						</Header>
						<Children>{children}</Children>
					</Content>
				</Overlay>
			)}
		</>
	);
};
