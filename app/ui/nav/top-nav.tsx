import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { ChevronLeftIcon } from '../icons';

function Topnav() {
  return (
    <div className='flex h-16 items-center px-4 border-b lg:hidden'>
      <Link className='flex mr-auto items-center text-lg font-bold' href='#'>
        Pico SBS
      </Link>
      <Button size='icon' variant='outline'>
        <ChevronLeftIcon className='h-6 w-6' />
        <span className='sr-only'>Toggle navigation menu</span>
      </Button>
    </div>
  );
}

export default Topnav;
