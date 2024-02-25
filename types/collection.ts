import { Tables } from './supabase';

export type RoleType = Tables<'roles'>;
export type UserType = Tables<'users'>;

export interface UserWithRole extends Omit<UserType, 'role'> {
  role: RoleType;
}
