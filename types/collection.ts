import { Tables } from './supabase';

export type RoleType = Tables<'roles'>;
export type UserType = Tables<'users'>;
export type ActionsType = Tables<'actions'>;
export type FeatureType = Tables<'features'>;

export interface UserWithRole extends Omit<UserType, 'role'> {
  role: RoleType;
}

interface ActionWithFeatureCreatedAt extends Omit<ActionsType, 'feature'> {
  feature: FeatureType;
}

export interface ActionWithFeature
  extends Omit<ActionWithFeatureCreatedAt, 'created_at'> {
  created_at?: string;
}
