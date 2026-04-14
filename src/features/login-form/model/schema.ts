import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email('Недопустимый адрес'),
  password: z.string(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
