import { z } from 'zod';

export const schemaPriority = z.union([
	z.literal('high'),
	z.literal('medium'),
	z.literal('low'),
]);

export const schemaStatus = z.union([
	z.literal('in_progress'),
	z.literal('completed'),
	z.literal('to_do'),
]);
