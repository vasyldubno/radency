import { FC, PropsWithChildren } from 'react';
import { Text } from './styled';

export const ErrorMessage: FC<PropsWithChildren> = ({ children }) => {
	return <Text>{children}</Text>;
};
