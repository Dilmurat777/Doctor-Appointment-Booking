'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import GlobalApi from '../_utils/Global.Api';
import Image from 'next/image';
import Link from 'next/link';

function CategorySearch() {
  const [category, setCategory] = useState([]);


  useEffect(() => {
    getCategory();
  }, []);
  const getCategory = () => {
    GlobalApi.getCategory().then((res) => setCategory(res.data.data));
  };

  return (
    <div className="mt-10 flex flex-col items-center gap-2">
      <h2 className="tracking-wide font-bold text-4xl">
        Search <span className="text-primary">Doctor</span>
      </h2>
      <h2 className="text-gray-500 text-xl">
        Search Your Doctor and Book Appointment in one clinic
      </h2>
      <div className="flex w-full max-w-sm items-center space-x-2 mt-3">
        <Input type="email" placeholder="Email" />
        <Button type="submit">
          <Search /> Subscribe
        </Button>
      </div>
      {/* Display list of category */}
      <div className="grid grid-cols-3 mt-5 gap-1 md:grid-cols-4 lg:grid-cols-6">
        {category.length > 0 ?
          category.map((item, index) => {
            if (index < 6 && index >= 0) {
              const name = item?.name;
              const imageUrl = item?.icon.url;
  
              return (
                <Link href={'/search/' + name} 
                  key={index}
                  className="flex flex-col text-center p-4 rounded-lg m-2 bg-blue-50 cursor-pointer items-center background-blue-100 hover:scale-110 transition-all ease-in-out">
                  <Image
                    src={imageUrl}
                    alt="category"
                    width={50}
                    height={50}
                    priority
                    className="w-auto h-auto"
                  />
  
                  <label className="text-blue-600 text-[10px] sm:text-sm font-semibold">{name}</label>
                </Link>
              );
            }
         
          })
          : [1, 2, 3, 4, 5, 6].map((item, index) => (
          <div key={index} className='w-[138px] h-[138px] bg-slate-200 rounded-lg animate-pulse'></div>
        ))
        }
      </div>
    </div>
  );
}

export default CategorySearch;
