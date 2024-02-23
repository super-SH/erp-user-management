'use server';

import { supabase } from '../supabase';
import { CreateRoleParams } from './shared.types';

export async function createRole({ rolename }: CreateRoleParams) {
  const createdRole = await supabase.from('roles').insert([{ name: rolename }]);

  console.log(createdRole);
}
