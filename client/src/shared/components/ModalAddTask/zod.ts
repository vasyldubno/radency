import { z } from 'zod';

export const schemaForm = z.object({
	title: z
		.string({ errorMap: () => ({ message: 'Title is required' }) })
		.min(1),
	description: z.string(),
	priority: z
		.string({ errorMap: () => ({ message: 'Priority is required' }) })
		.min(1),
	status: z
		.string({ errorMap: () => ({ message: 'Status is required' }) })
		.min(1),
	date: z.date({ errorMap: () => ({ message: 'Date is required' }) }),
});
