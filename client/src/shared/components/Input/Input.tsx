import { InputHTMLAttributes, forwardRef } from 'react';
import { Wrapper } from './styled';

type Props = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
	return <Wrapper {...props} ref={ref} />;
});
