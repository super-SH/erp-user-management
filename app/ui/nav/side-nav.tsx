import React from 'react';
import NavLink from './nav-links';
import Logo from '../logo';

function SideNav() {
  return (
    <div className='hidden lg:flex flex-col bg-slate-50 w-56 border-r min-h-[640px] pt-4'>
      <nav className='flex-1 overflow-y-auto pb-4'>
        <div className='px-4 py-3'>
          <Logo />
        </div>
        <div className='grid gap-1 px-4'>
          <NavLink />
        </div>
      </nav>
    </div>
  );
}

export default SideNav;
