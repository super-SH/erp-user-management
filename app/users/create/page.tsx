import React from 'react';
import UserForm from '../../ui/form/user-form';
import { Heading1 } from '@/app/ui/typography';

function Page() {
  return (
    <>
      <Heading1 className='mb-4'>Create User</Heading1>

      <UserForm />
    </>
  );
}

export default Page;
