'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { supabase } from '../supabase';
import {
  CreateRoleParams,
  DeleteRoleParams,
  GetRoleDataById,
  UpdateRoleParams,
} from './shared.types';
import { RoleType } from '@/types/collection';

async function deletePermissionsByRoleId(roleId: number) {
  await supabase.from('role_permissions').delete().eq('role', roleId);
}

async function createRolePermission(roleId: number, permissions: number[]) {
  // 1. create an array of rolePermission obj
  const rolePermissionsObjs =
    permissions?.map((permissionId) => ({
      role: roleId,
      action: permissionId,
    })) || [];

  // 2. create in DB
  const { error: permissionError } = await supabase
    .from('role_permissions')
    .insert(rolePermissionsObjs)
    .select();

  // 3. throw an error
  if (permissionError) {
    console.log(permissionError);
    throw new Error(`Error while creating the role permission.`);
  }
}

async function getRolePermissionsByRoleId(roleId: number) {
  const { data, error: permissionError } = await supabase
    .from('role_permissions')
    .select('action')
    .eq('role', roleId);

  if (permissionError) {
    console.log(permissionError);
    throw new Error('Error while getting role permission data');
  }

  return data.map((permission) => permission.action);
}

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
  if (rolePremissions) await createRolePermission(newRole.id, rolePremissions);

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
  const rolePermissions = await getRolePermissionsByRoleId(role.id);

  return {
    data: {
      ...role,
      rolePermissions,
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
  await deletePermissionsByRoleId(role.id);

  // TODO: DRY this.
  // 3. insert new role_permissions
  if (rolePremissions) await createRolePermission(role.id, rolePremissions);

  // 4. revalidate and ,redirect to roles page
  revalidatePath('/roles', 'layout');
  redirect('/roles');
}

export async function deleteRoleById({ id }: DeleteRoleParams) {
  // 1. delete all the role permission of the role
  await deletePermissionsByRoleId(id);

  // 2. delete the role data
  const { error } = await supabase.from('roles').delete().eq('id', id);

  if (error) {
    console.log(error);
    throw new Error('error while deleting roles data');
  }

  revalidatePath('/roles');
  revalidatePath('/users');
}
