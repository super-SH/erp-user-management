'use server';

import { ActionWithFeature } from '@/types/collection';
import { supabase } from '../supabase';

export async function getAllActions() {
  const { data, error } = await supabase
    .from('actions')
    .select('*,feature(*)')
    .returns<ActionWithFeature[]>();

  if (error) {
    console.log(error);
    throw new Error('Error while loading actions');
  }

  return {
    data,
  };
}
