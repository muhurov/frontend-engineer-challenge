import { z } from 'zod';

export const registerSchema = z
  .object({
    email: z.email('Недопустимый адрес'),
    password: z.string().min(8, 'Введенный пароль менее 8 символов в длину'),
    repeatPassword: z.string().min(1, 'Повторите пароль'),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Пароли не совпадают',
    path: ['repeatPassword'],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
