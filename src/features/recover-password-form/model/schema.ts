import { z } from 'zod';

export const recoverPasswordSchema = z.object({
  email: z.email('Недопустимый адрес'),
});

export type RecoverPasswordSchema = z.infer<typeof recoverPasswordSchema>;
