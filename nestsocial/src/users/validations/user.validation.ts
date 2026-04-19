import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

export const LoginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

export const UpdateUserSchema = CreateUserSchema.partial().omit({ password: true });

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type LoginDto = z.infer<typeof LoginSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
