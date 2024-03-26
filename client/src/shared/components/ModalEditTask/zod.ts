import { z } from 'zod';

export const schemaForm = z.object({
	title: z
		.string({ errorMap: () => ({ message: 'Title is required' }) })
		.min(1)
		.optional(),
	description: z.string().optional(),
	priority: z
		.string({ errorMap: () => ({ message: 'Priority is required' }) })
		.min(1)
		.optional(),
	status: z
		.string({ errorMap: () => ({ message: 'Status is required' }) })
		.min(1)
		.optional(),
	date: z
		.date({ errorMap: () => ({ message: 'Date is required' }) })
		.optional(),
});
