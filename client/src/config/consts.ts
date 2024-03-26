import { Priority } from '../shared/types';

export const STATUS = {
	IN_PROGRESS: 'in_progress',
	COMPLETED: 'completed',
	TO_DO: 'to_do',
} as const;

export const PRIORITY: Priority[] = ['high', 'low', 'medium'];
