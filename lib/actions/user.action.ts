'use server';

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
