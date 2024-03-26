import { Axios } from '../../config/axios';
import { IHistory } from '../../shared/types';

export class HistoryService {
	static async getAll() {
		return await Axios.get<IHistory[]>('/history');
	}
}
