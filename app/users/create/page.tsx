import React from 'react';
import UserForm from '../../ui/form/user-form';

function Page() {
  return (
    <>
      <h1 className='font-bold mb-4'>Create User</h1>

      <div className='px-6 py-3 bg-white rounded-md shadow-md'>
        <UserForm />
      </div>
    </>
  );
}

export default Page;
