"use client"
import CategorySearch from "./_components/CategorySearch";
import DoctorList from "./_components/DoctorList";
import Hero from "./_components/Hero";

import { useEffect, useState } from "react";
import GlobalApi from "./_utils/Global.Api";

export default function Home() {
  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
		getDoctorList();
	}, [])

	const getDoctorList = () => {
    GlobalApi.getDoctorList().then((res) => setDoctorList(res.data.data));
  }
  
  return (
    <div>
      {/* 'hero'section */}
      <Hero />
      {/* category search section */}
      <CategorySearch />
      {/* Doctors List */}
      <DoctorList doctorList={doctorList} />
    </div>
  );
}
