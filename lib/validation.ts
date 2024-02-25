import { z } from 'zod';

export const roleSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Role name should be at least 3 charatars long' })
    .max(20, { message: 'Role name should be 20 charatars at most' }),

  rolePermissions: z.array(z.number()),
});

export const userSchema = z.object({
  firstname: z.string().min(3).max(20),
  lastname: z
    .union([z.string().length(0), z.string().min(3).max(20)])
    .optional(),
  email: z.string().email(),
  isActive: z.boolean(),
  username: z.string().min(3).max(30),
  role: z.number(), // Role id
});
