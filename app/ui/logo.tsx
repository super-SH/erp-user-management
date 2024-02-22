import Link from 'next/link';
import React from 'react';

function Logo() {
  return (
    <Link className='flex items-center h-10' href='/'>
      <span className='ml-2 text-lg font-bold'>Pico SBS</span>
    </Link>
  );
}

export default Logo;
