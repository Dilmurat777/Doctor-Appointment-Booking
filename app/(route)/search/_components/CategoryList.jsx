'use client';
import GlobalApi from '@/app/_utils/Global.Api';
import React, { useEffect, useState } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandDialog,
  CommandShortcut,
} from '@/components/ui/command';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';

function CategoryList() {
  const [categoryList, setCategoryList] = useState([]);
  const params = useParams();
  const category = params?.cname;
  useEffect(() => {
    getCategory();
    console.log(category);
  }, []);
  const getCategory = () => {
    GlobalApi.getCategory().then((res) => setCategoryList(res.data.data));
  };
  return (
    <div className="h-screen mt-5 flex flex-col">
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList className="overflow-visible">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {categoryList &&
              categoryList.map((item, index) => {
                const name = item?.name;
                const imageUrl = item?.icon.url;
                return (
                  <CommandItem key={index}>
                    <Link
                      href={`/search/${item?.name}`}
                      className={`' p-2 flex gap-2 items-center cursor-pointer text-[14px] text-blue-600 w-full rounded-md'${
                        category == name && ' bg-blue-600 w-full text-white'
                      }`}>
                      <Image
                        src={imageUrl}
                        alt="category"
                        width={25}
                        height={25}
                        priority
                        className="w-auto h-auto"
                      />
                      <label>{name}</label>
                    </Link>
                  </CommandItem>
                );
              })}
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </Command>
    </div>
  );
}

export default CategoryList;
