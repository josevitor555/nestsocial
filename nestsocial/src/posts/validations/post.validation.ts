import { z } from 'zod';

export const createPostSchema = z.object({
  content: z.string().min(1, 'O conteúdo não pode estar vazio').max(280, 'O conteúdo é muito longo'),
});

export const updatePostSchema = z.object({
  content: z.string().min(1, 'O conteúdo não pode estar vazio').max(280, 'O conteúdo é muito longo'),
}).partial();

export type CreatePostDto = z.infer<typeof createPostSchema>;
export type UpdatePostDto = z.infer<typeof updatePostSchema>;
