import { z } from 'zod';

export const roleSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Role name should be at least 3 charatars long' })
    .max(20, { message: 'Role name should be 20 charatars at most' }),

  rolePermissions: z.array(z.number()),
});
