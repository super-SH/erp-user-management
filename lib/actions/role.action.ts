'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { supabase } from '../supabase';
import { CreateRoleParams } from './shared.types';
import { RoleType } from '@/types/collection';

export async function createRole({
  rolename,
  rolePremissions,
}: CreateRoleParams) {
  //  1. create the role in db
  const { data: newRole } = await supabase
    .from('roles')
    .insert([{ name: rolename }])
    .select()
    .single();

  if (!newRole) {
    throw new Error('Error while creating role');
  }

  // 2. make the role_permissions array with the given array
  const newRolePermissionsObjs =
    rolePremissions?.map((permissionId) => ({
      role: newRole.id,
      action: permissionId,
    })) || [];

  // 3. inset the role_permission array into db
  const { error } = await supabase
    .from('role_permissions')
    .insert(newRolePermissionsObjs)
    .select();

  if (error) {
    console.log(error);
    throw new Error(
      `Error while creating the permission for the ${newRole.name} role.`
    );
  }

  revalidatePath('/roles');
  redirect('/roles');
}

export async function getRoles() {
  const { data: roles, error } = await supabase
    .from('roles')
    .select('*')
    .order('name')
    .returns<RoleType[]>();

  if (error) {
    console.log(error);
    throw new Error('Error while loading roles');
  }

  return {
    data: roles,
  };
}
