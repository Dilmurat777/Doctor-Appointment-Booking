'use client';
'use client';
import { LoginLink, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';

import { Button } from '@/components/ui/button';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useKindeAuth } from '@kinde-oss/kinde-auth-nextjs';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

function Header() {
  const { user, isLoading, isAuthenticated } = useKindeAuth();

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
        <Image src="/logo.svg" alt="logo" width={130} height={80} className="w-auto h-auto" priority />
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

      <div className="flex items-center gap-5">
        {!isAuthenticated ? (
          <LoginLink>
            <Button>Sign in</Button>
          </LoginLink>
        ) : (
          <div className="flex items-center gap-5">
            <h2 className="text-sm font-bold">{`Hi, ${user?.given_name}`}</h2>

            <Popover>
              <PopoverTrigger>
                <Image
                  src={!user ? '/logo.svg' : user?.picture}
                  alt="profile"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-blue-100 bg-blue-50"
                />
              </PopoverTrigger>
              <PopoverContent className="flex flex-col gap-2 w-40 p-2">
                <Link href="/profile">
                  <Button variant={'outline'} className="border-0">
                    Profile
                  </Button>
                </Link>
                <Link href="/my-booking">
                  <Button variant={'outline'} className="border-0">
                    My booking
                  </Button>
                </Link>
                <LogoutLink>
                  <Button variant={'outline'} className="border-0">
                    Log out
                  </Button>
                </LogoutLink>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
