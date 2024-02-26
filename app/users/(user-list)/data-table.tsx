'use client';

import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { LeftArrowIcon, PlusIcon, RightArrowIcon } from '@/app/ui/icons';
import { useState } from 'react';
import Link from 'next/link';
import CommonDataTable from '@/app/ui/common-data-table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className='rounded-md bg-slate-100 dark:bg-slate-800'>
      {/* Operations like filter , create new role */}
      <div className='flex flex-col md:flex-row justify-between gap-3 md:items-center py-4'>
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
        <Button asChild>
          <Link
            href={'/users/create'}
            className='flex justify-between items-center gap-2 w-fit'
          >
            <PlusIcon className='h-4 w-4 invert' /> Create User
          </Link>
        </Button>
      </div>

      {/* Table , which display data */}
      <div>
        <CommonDataTable table={table} columns={columns} />
      </div>

      {/* Pagination */}
      <div className='flex items-center justify-end space-x-2 py-4'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <LeftArrowIcon className='h-5 w-5' />
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <RightArrowIcon className='h-5 w-5' />
        </Button>
      </div>
    </div>
  );
}
