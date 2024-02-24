import React from 'react';
import { Heading1 } from '@/app/ui/typography';
import RoleForm from '@/app/ui/form/role-form';
import { getRoleDataById } from '@/lib/actions/role.action';

async function Page({ params }: { params: { id: string } }) {
  const { data } = await getRoleDataById({ id: Number(params.id) });

  return (
    <>
      <Heading1 additionalStyles='mb-4'>Edit Role</Heading1>

      <div className='px-6 py-3 bg-slate-100 rounded-md shadow-md'>
        <RoleForm roleData={data} isEditingSession />
      </div>
    </>
  );
}

export default Page;
