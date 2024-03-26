import { z } from 'zod';

export const schemaForm = z.object({
	title: z
		.string({ errorMap: () => ({ message: 'Title is required' }) })
		.min(1)
		.optional(),
});
