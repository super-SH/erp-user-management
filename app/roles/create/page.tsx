import React from 'react';
import { Heading1 } from '@/app/ui/typography';
import RoleForm from '@/app/ui/form/role-form';

function Page() {
  return (
    <>
      <Heading1 additionalStyles='mb-4'>Create Role</Heading1>

      <div className='px-6 py-3 bg-slate-100 rounded-md shadow-md'>
        <RoleForm />
      </div>
    </>
  );
}

export default Page;
