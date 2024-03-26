import { FC, useEffect, useState } from 'react';
import { IActivityLog } from '../../../types';
import { Date, Message, Span, Wrapper } from './styled';
import { format } from 'date-fns';

interface Props {
	activityLog: IActivityLog;
}

export const ActivityLog: FC<Props> = ({ activityLog }) => {
	const [message, setMessage] = useState<JSX.Element>(<></>);

	useEffect(() => {
		if (activityLog.type === 'change_due_date') {
			console.log(format(activityLog.from, 'iii, dd MMM'));
			setMessage(
				<Message>
					You changes due date from{' '}
					<Span>{format(activityLog.from, 'iii, dd MMM')}</Span> to{' '}
					<Span>{format(activityLog.to, 'iii, dd MMM')}</Span>
				</Message>,
			);
		}

		if (activityLog.type === 'change_description') {
			setMessage(<p>You changes description this task</p>);
		}

		if (activityLog.type === 'change_prioriry') {
			setMessage(
				<Message>
					You changes priority from <Span>{activityLog.from}</Span> to{' '}
					<Span>{activityLog.to}</Span>
				</Message>,
			);
		}

		if (activityLog.type === 'change_status') {
			setMessage(
				<Message>
					You changes status from <Span>{activityLog.from}</Span> to{' '}
					<Span>{activityLog.to}</Span>
				</Message>,
			);
		}

		if (activityLog.type === 'moved') {
			setMessage(
				<Message>
					You moved this task from <Span>{activityLog.from}</Span> to{' '}
					<Span>{activityLog.to}</Span>
				</Message>,
			);
		}

		if (activityLog.type === 'rename') {
			setMessage(
				<Message>
					You renamed this task from <Span>{activityLog.from}</Span> to
					<Span>{activityLog.to}</Span>
				</Message>,
			);
		}

		if (activityLog.type === 'create') {
			setMessage(<Message>You created this task</Message>);
		}
	}, []);

	return (
		<Wrapper>
			{message}
			<Date>
				{format(activityLog.createdAt, 'MMM dd')} at{' '}
				{format(activityLog.createdAt, 'HH:mm')}
			</Date>
		</Wrapper>
	);
};
