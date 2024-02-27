'use client';

import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { isActive, roles } from './data/constant';

import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { CrossIcon, PlusIcon } from '@/app/ui/icons';
import Link from 'next/link';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <Input
          placeholder='Search username...'
          value={
            (table.getColumn('username')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('username')?.setFilterValue(event.target.value)
          }
          className='max-w-sm'
        />
        <div className='hidden md:flex space-x-2'>
          {table.getColumn('role') && (
            <DataTableFacetedFilter
              column={table.getColumn('role')}
              title='Role'
              options={roles}
            />
          )}
          {table.getColumn('isActive') && (
            <DataTableFacetedFilter
              column={table.getColumn('isActive')}
              title='Account status'
              options={isActive}
            />
          )}
          {isFiltered && (
            <Button
              variant='ghost'
              onClick={() => table.resetColumnFilters()}
              className='h-8 px-2 lg:px-3'
            >
              Reset
              <CrossIcon className='ml-2 h-4 w-4' />
            </Button>
          )}
        </div>
      </div>
      <Button asChild>
        <Link
          href={'/users/create'}
          className='flex justify-between items-center gap-2 w-fit'
        >
          <PlusIcon className='h-4 w-4 invert' /> Create User
        </Link>
      </Button>
    </div>
  );
}
