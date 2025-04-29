'use client';
import DoctorList from '@/app/_components/DoctorList';
import GlobalApi from '@/app/_utils/Global.Api';
import React, { use, useEffect, useState } from 'react';
function Search({ params }) {
  const getParams = use(params);
  const [doctorList, setDoctorList] = useState([]);
  
  useEffect(() => {
	  getDoctorList();
	  console.log(getParams.cname);
	  
  }, []);

  const getDoctorList = () => {
    GlobalApi.getDoctorByCategory(getParams.cname).then((res) => setDoctorList(res.data.data));
  };
  return (
    <div className='mt-5'>
      <DoctorList heading={getParams.cname} doctorList={doctorList} />
    </div>
  );
}

export default Search;
