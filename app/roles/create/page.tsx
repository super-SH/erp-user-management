import React from 'react';
import { Heading1 } from '@/app/ui/typography';
import RoleForm from '@/app/ui/form/role-form';
import { getAllActions } from '@/lib/actions/actionType.action';

async function Page() {
  const { data: featureActions } = await getAllActions();

  return (
    <>
      <Heading1 className='mb-4'>Create Role</Heading1>

      <div className='px-6 py-3 bg-slate-100 rounded-md shadow-md'>
        <RoleForm featureActions={featureActions} />
      </div>
    </>
  );
}

export default Page;
