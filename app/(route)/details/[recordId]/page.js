'use client';
import GlobalApi from '@/app/_utils/Global.Api';
import Image from 'next/image';
import React, { use, useEffect, useState } from 'react';
import DoctorDetails from '../_components/DoctorDetails';
import DoctorSuggestion from '../_components/DoctorSuggestion';

function Details({ params }) {
  const [doctor, setDoctor] = useState([]);
  const [doctorList, setDoctorList] = useState([]);
  const paramsId = use(params);

  useEffect(() => {
    getSingleDoctor();
  }, []);

  const getSingleDoctor = () => {
    GlobalApi.getDoctorByID(paramsId.recordId).then((res) => setDoctor(res.data.data[0]));
  };
  if (!doctor || !doctor.Image || !Array.isArray(doctor.Image)) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="text-2xl font-bold">Loading...</h2>
      </div>
    );
  }

  // if (!doctor || !doctor.Image || !Array.isArray(doctor.Image)) {
  // 	return <div>Loading doctor info...</div>;
  //   }

  return (
    <div className="p-5 md:px-7">
      <h2 className="font-bold text-[22px]">Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-5">
        {/* Doctor Details */}
        <div className="col-span-3">
          {
            doctor &&  <DoctorDetails doctor={doctor} />
         }
        </div>
        {/* Doctor Suggestion */}
        <div className="col-span-1">
         <DoctorSuggestion doctorList={doctorList} setDoctorList={setDoctorList} />
        </div>
      </div>
    </div>
  );
}

export default Details;
