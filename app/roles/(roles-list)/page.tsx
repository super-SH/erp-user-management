import { Heading1 } from '@/app/ui/typography';
import { getRoles } from '@/lib/actions/role.action';
import React from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';

async function Page() {
  const { data } = await getRoles();

  return (
    <>
      <Heading1 additionalStyles='mb-4'>Roles List</Heading1>

      <div className='rounded-md border bg-slate-100 dark:bg-slate-800 shadow-md px-4 py-6'>
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}

export default Page;
