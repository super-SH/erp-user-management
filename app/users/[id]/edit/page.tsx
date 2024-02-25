import React from 'react';
import { Heading1 } from '@/app/ui/typography';
import { getUserById } from '@/lib/actions/user.action';
import { getRoles } from '@/lib/actions/role.action';
import UserForm from '@/app/ui/form/user-form';

async function Page({ params }: { params: { id: string } }) {
  const { data: roles } = await getRoles();
  const { data } = await getUserById({ id: Number(params.id) });

  return (
    <>
      <Heading1 className='mb-4'>Edit Role</Heading1>

      <UserForm roles={roles} isEditingSession userData={data} />
    </>
  );
}

export default Page;
