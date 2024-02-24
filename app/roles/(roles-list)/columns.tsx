'use client';

import { RoleType } from '@/types/collection';
import { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AscArrowIcon,
  DeleteIcon,
  DescArrowIcon,
  EditIcon,
  ThreeDotsVertical,
} from '@/app/ui/icons';
import Link from 'next/link';

// This type is used to define the shape of our data.

export const columns: ColumnDef<RoleType>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className='text-md p-0 items-center font-medium text-slate-500  dark:text-slate-400'
      >
        ROLENAME
        {column.getIsSorted() === 'asc' && (
          <AscArrowIcon className='ml-2 h-4 w-4' />
        )}
        {column.getIsSorted() === 'desc' && (
          <DescArrowIcon className='ml-2 h-4 w-4' />
        )}
      </Button>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const role = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className='flex-grow-0'>
              <Button variant='ghost' className='h-8 w-8 p-0 justify-end '>
                <span className='sr-only'>Open menu</span>
                <ThreeDotsVertical className='h-6 w-6' />
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='py-2'>
            <DropdownMenuItem asChild>
              <Button
                variant='ghost'
                className='w-full cursor-pointer justify-start gap-2 rounded-sm'
                asChild
              >
                <Link href={`/roles/${role.id}/edit`}>
                  <span className='sr-only'>Edit Button</span>
                  <EditIcon className='h-4 w-4' />
                  Edit
                </Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Button
                variant='ghost'
                className='w-full cursor-pointer justify-start gap-2 rounded-sm'
              >
                <span className='sr-only'>Delete Button</span>
                <DeleteIcon className='h-4 w-4' />
                Delete
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
