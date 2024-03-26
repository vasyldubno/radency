import { FC } from 'react';
import { selectHistoryList } from '../../../store/board/selector';
import { useAppSelector } from '../../../store/store';
import { Modal } from '../Modal/Modal';
import { HistoryItem } from './HistoryItem/HistoryItem';
import { HistoryList, Wrapper } from './styled';

interface Props {
	isOpen: boolean;
	onClose: () => void;
}

export const ModalHistory: FC<Props> = ({ isOpen, onClose }) => {
	const historyList = useAppSelector(selectHistoryList);

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			borderRadius="0"
			placement="right"
			isFullHeight
			title="History"
		>
			<Wrapper>
				<HistoryList>
					{historyList?.length ? (
						historyList.map((history) => (
							<HistoryItem key={history.id} history={history} />
						))
					) : (
						<p>History is empty.</p>
					)}
				</HistoryList>
			</Wrapper>
		</Modal>
	);
};
