import { Heading1 } from '@/app/ui/typography';
import React from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';
import { getUsers } from '@/lib/actions/user.action';

async function Page() {
  const { data } = await getUsers();

  return (
    <>
      <Heading1 className='mb-4'>Users List</Heading1>

      <div className='rounded-md border bg-slate-100 dark:bg-slate-800 shadow-md px-4 py-6'>
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}

export default Page;
