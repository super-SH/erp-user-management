import React from 'react';
import { Heading1 } from '@/app/ui/typography';
import CreateRoleForm from '@/app/ui/form/create-role-form';

function Page() {
  return (
    <>
      <Heading1 additionalStyles='mb-4'>Create Role</Heading1>

      <div className='px-6 py-3 bg-white rounded-md shadow-md'>
        <CreateRoleForm />
      </div>
    </>
  );
}

export default Page;
