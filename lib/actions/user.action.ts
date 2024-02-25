'use server';

import { UserType, UserWithRole } from '@/types/collection';
import { supabase } from '../supabase';
import { CreateUserParams } from './shared.types';
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
