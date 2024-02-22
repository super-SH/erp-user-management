'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const links = [
  { name: 'Home', href: '/' },
  { name: 'Users', href: '/users' },
  { name: 'Roles', href: '/roles' },
  // { name: 'Services', href: '/services' },
];

function NavLink() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={clsx(
            'flex items-center h-10 text-sm font-medium rounded-md hover:bg-indigo-300/50 dark:hover:bg-indigo-800/50 px-2',
            {
              'bg-indigo-300/50  dark:bg-indigo-800/50': pathname === link.href,
            }
          )}
        >
          {link.name}
        </Link>
      ))}
    </>
  );
}

export default NavLink;
