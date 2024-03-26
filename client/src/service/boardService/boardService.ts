import { Axios } from '../../config/axios';
import { Board } from '../../shared/types';
import { CreateDto, UpdateDto } from './types';

export class BoardService {
	static async create(dto: CreateDto) {
		return await Axios.post<Board>('/board', dto);
	}

	static async getAll() {
		return await Axios.get<Board[]>('/board');
	}

	static async update(dto: UpdateDto, boardId: number) {
		return await Axios.patch(`/board/${boardId}`, dto);
	}

	static async delete(boardId: number) {
		return await Axios.delete(`/board/${boardId}`);
	}
}
