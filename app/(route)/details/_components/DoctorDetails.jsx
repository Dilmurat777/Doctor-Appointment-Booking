import { Button } from '@/components/ui/button';
import { GraduationCap, MapPin } from 'lucide-react';
import Image from 'next/image';
import  BookAppointment  from './BookAppointment';

function DoctorDetails({ doctor }) {
  const socialLinks = [
    {
      id: 1,
      icon: '/facebook.png',
      link: 'https://www.facebook.com/',
    },
    {
      id: 2,
      icon: '/instagram.png',
      link: 'https://www.facebook.com/',
    },
    {
      id: 3,
      icon: '/twitter.png',
      link: 'https://www.facebook.com/',
    },
    {
      id: 4,
      icon: '/linkedin.png',
      link: 'https://www.facebook.com/',
    },
  ];
  return (
	  <>
	   <div className="grid grid-cols-1 md:grid-cols-3 border-[1px] border-gray-200 rounded-lg p-5 gap-5 shadow-sm">
      {/* Doctor img */}
      <div>
        <Image
          src={doctor?.Image[0].url}
          alt="doctor"
          width={220}
          height={200}
          className="rounded-2xl h-[260px] object-cover w-auto"
          priority
        />
      </div>
      {/* Doctor info */}
      <div className="col-span-2 mt-5 md:mt-0 flex flex-col gap-2 items-baseline md:px-10 justify-between">
        <h2 className="text-2xl font-bold">{doctor?.Name}</h2>
        <h2 className="text-sm font-bold flex items-center gap-2 text-gray-500">
          <GraduationCap />
          <span>{doctor?.Year_of_Experience}</span>
        </h2>
        <h2 className="flex items-center gap-2 text-sm font-bold text-gray-500">
          <MapPin />
          <span>{doctor?.Address}</span>
        </h2>
        <h2 className="text-[10px] bg-blue-200 rounded-full p-1 text-primary px-2">
          {doctor.category.name}
        </h2>
        <div className="flex items-center gap-2 mt-2">
          {socialLinks.map((link) => (
            <a key={link.id} href={link.link} target="_blank" rel="noopener noreferrer">
              <Image
                src={link.icon}
                alt="social"
                width={30}
                height={30}
                className="mr-2 w-6 h-6"
                priority
              />
            </a>
          ))}
        </div>
          
          <BookAppointment doctor={doctor}/>
		  </div>
		
		  </div>
		    {/* About Doctor */}
			<div className='mt-2 px-3 border-[1px] border-gray-200 rounded-lg p-5 shadow-sm'>
			  <h2 className='font-bold text-[20px]'>About Me</h2>
			  <p className="text-sm text-gray-500 mt-2 tracking-wider">{doctor?.About}</p>
		  </div>
	  </>
  );
}

export default DoctorDetails;
