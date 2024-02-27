import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { HumburgerMenu } from '../icons';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import NavLink from './nav-links';
import Logo from '../logo';

function Topnav() {
  return (
    <div className='flex h-16 items-center px-4 border-b lg:hidden bg-slate-50'>
      <Link className='flex mr-auto items-center text-lg font-bold' href='#'>
        Pico SBS
      </Link>

      <Sheet>
        <SheetTrigger asChild>
          <Button size='icon' variant='outline'>
            <HumburgerMenu className='h-6 w-6' />
            <span className='sr-only'>Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left'>
          <nav className='flex-1 overflow-y-auto pb-4'>
            <div className='px-4 py-3'>
              <Logo />
            </div>

            <div className='flex flex-col gap-1 px-4'>
              <NavLink asSheet/>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Topnav;
