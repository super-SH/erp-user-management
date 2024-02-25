'use server';

import { UserWithRole } from '@/types/collection';
import { supabase } from '../supabase';
import {
  CreateUserParams,
  GetUserById,
  UpdateUserParams,
} from './shared.types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createUser({ newUser }: CreateUserParams) {
  const { error } = await supabase
    .from('users')
    .insert([newUser])
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error('Error while creating a user');
  }

  revalidatePath('/users');
  redirect('/users');
}

export async function getUsers() {
  const { data: users, error } = await supabase
    .from('users')
    .select('*, role(*)')
    .order('username')
    .returns<UserWithRole[]>();

  if (error) {
    console.log(error);
    throw new Error('Error while loading users');
  }

  return {
    data: users,
  };
}

export async function getUserById({ id }: GetUserById) {
  const { data: user, error } = await supabase
    .from('users')
    .select('*, role(*)')
    .eq('id', id)
    .returns<UserWithRole>()
    .single();

  if (error) {
    console.log(error);
    throw new Error('Error while getting user data');
  }

  return { data: user };
}

export async function updateUser({ id, updatedUser }: UpdateUserParams) {
  const { error } = await supabase
    .from('users')
    .update(updatedUser)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error('error while updating user data');
  }

  revalidatePath('/users', 'layout');
  redirect('/users');
}
