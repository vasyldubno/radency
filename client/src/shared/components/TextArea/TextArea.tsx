import { FC, TextareaHTMLAttributes } from 'react';
import { Wrapper } from './styles';

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea: FC<Props> = (props) => {
	return <Wrapper {...props} />;
};
