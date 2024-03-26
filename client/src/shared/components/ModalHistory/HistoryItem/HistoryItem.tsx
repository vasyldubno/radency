import { FC, useEffect, useState } from 'react';
import { IHistory } from '../../../types';
import { format } from 'date-fns';
import { Span, Date, Message } from './styled';

interface Props {
	history: IHistory;
}

export const HistoryItem: FC<Props> = ({ history }) => {
	const [message, setMessage] = useState<JSX.Element>(<></>);

	useEffect(() => {
		if (history.type === 'create') {
			setMessage(
				<Message>
					You created task <Span>{history.taskTitle}</Span>
				</Message>,
			);
		}

		if (history.type === 'rename') {
			setMessage(
				<Message>
					You renamed <Span>{history.taskTitle}</Span> from{' '}
					<Span>{history.from}</Span> to <Span>{history.to}</Span>
				</Message>,
			);
		}

		if (history.type === 'moved') {
			setMessage(
				<Message>
					You moved <Span>{history.taskTitle}</Span> from{' '}
					<Span>{history.from}</Span> to <Span>{history.to}</Span>
				</Message>,
			);
		}

		if (history.type === 'delete') {
			setMessage(
				<Message>
					You deleted <Span>{history.taskTitle}</Span> from{' '}
					<Span>{history.from}</Span>
				</Message>,
			);
		}

		if (history.type === 'change_status') {
			setMessage(
				<Message>
					You changes the status <Span>{history.taskTitle}</Span> from{' '}
					<Span>{history.from}</Span> to <Span>{history.to}</Span>
				</Message>,
			);
		}

		if (history.type === 'change_prioriry') {
			setMessage(
				<Message>
					You changes the priority <Span>{history.taskTitle}</Span> from{' '}
					<Span>{history.from}</Span> to <Span>{history.to}</Span>
				</Message>,
			);
		}

		if (history.type === 'change_due_date') {
			setMessage(
				<Message>
					You changes the due date <Span>{history.taskTitle}</Span> from{' '}
					<Span>{format(history.from, 'iii, dd MMM')}</Span> to{' '}
					<Span>{format(history.to, 'iii, dd MMM')}</Span>
				</Message>,
			);
		}

		if (history.type === 'change_description') {
			setMessage(
				<Message>
					You changes the description <Span>{history.taskTitle}</Span>
				</Message>,
			);
		}
	}, []);

	return (
		<div>
			{message}
			<Date>
				{format(history.createdAt, 'MMM dd')} at{' '}
				{format(history.createdAt, 'HH:mm')}
			</Date>
		</div>
	);
};
