import { ButtonHTMLAttributes, FC } from 'react';
import { Wrapper } from './styled';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	borderColor?: string;
	borderStyle?: string;
	backgroundColor?: string;
	color?: string;
	padding?: string;
	isFullWidth?: boolean;
}

export const Button: FC<Props> = ({
	borderColor,
	borderStyle,
	backgroundColor,
	color,
	padding,
	isFullWidth,
	children,
	...props
}) => {
	return (
		<Wrapper
			{...props}
			borderColor={borderColor}
			borderStyle={borderStyle}
			backgroundColor={backgroundColor}
			color={color}
			padding={padding}
			isFullWidth={isFullWidth}
		>
			{children}
		</Wrapper>
	);
};
