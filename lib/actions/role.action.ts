'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { supabase } from '../supabase';
import {
  CreateRoleParams,
  GetRoleDataById,
  UpdateRoleParams,
} from './shared.types';
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

export async function getRoleDataById({ id }: GetRoleDataById) {
  // 1. get the role data by given id
  const { data: role, error } = await supabase
    .from('roles')
    .select('*')
    .eq('id', id)
    .single();

  //  1. b)  throw an error
  if (error) {
    console.log(error);
    throw new Error('Error while getting role data');
  }

  // 2. get all the role permission of the id

  const { data: rolePermissions, error: permissionError } = await supabase
    .from('role_permissions')
    .select('action')
    .eq('role', id);

  //  2. b) throw an error for permission
  if (permissionError) {
    console.log(permissionError);
    throw new Error('Error while getting role permission data');
  }

  return {
    data: {
      ...role,
      rolePermissions: rolePermissions.map((permission) => permission.action),
    },
  };
}

export async function updateRole({
  id,
  rolename,
  rolePremissions,
}: UpdateRoleParams) {
  //  1. update the role name by id
  const { data: role, error } = await supabase
    .from('roles')
    .update({ name: rolename })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error('error while updating role data');
  }

  // 2. Delete all the previous role_permissions
  await supabase.from('role_permissions').delete().eq('role', role.id);

  // TODO: DRY this.
  // 3. insert new role_permissions
  const rolePermissionsObjs =
    rolePremissions?.map((permissionId) => ({
      role: role.id,
      action: permissionId,
    })) || [];

  const { error: permissionError } = await supabase
    .from('role_permissions')
    .insert(rolePermissionsObjs)
    .select();

  if (permissionError) {
    console.log(permissionError);
    throw new Error(
      `Error while creating the permission for the ${role.name} role.`
    );
  }

  // 4. revalidate and ,redirect to roles page
  revalidatePath('/roles', 'layout');
  redirect('/roles');
}
