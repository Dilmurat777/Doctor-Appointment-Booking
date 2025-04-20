import { Button } from '@/components/ui/button';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function Header() {
  const Menu = [
    {
      id: 1,
      name: 'Home',
      path: '/',
    },
    {
      id: 2,
      name: 'Explore',
      path: '/explore',
    },
    {
      id: 3,
      name: 'Contact Us',
      path: '/contact',
    },
  ];
  return (
    <div className="flex items-center justify-between p-4 shadow-sm">
      <div className="flex items-center gap-10">
        <Image src="/logo.svg" alt="logo" width={130} height={80} className="w-auto h-auto" />
        <ul className="md:flex gap-8 hidden">
          {Menu.map((item) => (
            <Link href={item.path} key={item.id}>
              <li className="hover:text-primary cursor-pointer hover:scale-110 transition-all ease-in-out">
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <Button>Get started</Button>
    </div>
  );
}

export default Header;
