import React from 'react';
import UserForm from '../../ui/form/user-form';
import { Heading1 } from '@/app/ui/typography';

function Page() {
  return (
    <>
      <Heading1 additionalStyles='mb-4'>Create User</Heading1>

      <div className='px-6 py-3 bg-white rounded-md shadow-md'>
        <UserForm />
      </div>
    </>
  );
}

export default Page;
