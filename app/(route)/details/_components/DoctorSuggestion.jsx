'use client';
import GlobalApi from '@/app/_utils/Global.Api';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

function DoctorSuggestion({doctorList, setDoctorList}) {

  useEffect(() => {
    getDoctorList();
  }, []);
  const getDoctorList = () => {
    GlobalApi.getDoctorList().then((res) => setDoctorList(res.data.data));
  };

  return (
    <div className="border-[1px] border-gray-200 rounded-lg p-2 shadow-sm items-baseline">
      <h2 className="text-lg font-bold">Suggestion</h2>

      <div className="flex flex-col overflow-y-scroll h-auto max-h-[400px] gap-2">
        {doctorList.map((doctor) => (
          <Link key={doctor.id} href={`/details/` + doctor.id}>
            <div className="flex items-center gap-2 mt-3 border-b-[1px] border-gray-200 pb-2 cursor-pointer hover:bg-gray-200 transition-all ease-in-out">
              <div className="relative w-[80px] h-[80px]">
                <Image
                  src={doctor?.Image[0].url}
                  alt="doctor"
                  fill
                  className="rounded-full object-cover"
                  priority
                  sizes="(max-width: 768px) 100px, 80px"
                />
              </div>
              <div className="flex flex-col gap-1">
						<h2 className="text-[10px] bg-blue-200 rounded-full p-1 text-primary text-center">{ doctor?.category.name}</h2>
                <h2 className="text-sm font-bold">{doctor?.Name}</h2>
                <h2 className="text-xs text-blue-500">{doctor?.Year_of_Experience}</h2>
					</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DoctorSuggestion;
