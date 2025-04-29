import { Calendar, Clock, MapPin } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import React from 'react';
import CancelAppointment from './CancelAppointment';
import GlobalApi from '@/app/_utils/Global.Api';
import { toast } from 'sonner';

function BookingList({ booking, expire, upDateRecord, setBooking }) {
  const deleteBooking = (item) => {
    console.log(item);
	console.log(booking)
    GlobalApi.cancelBooking(item.id)
      .then((res) => {
        console.log('Booking cancelled successfully:', res);
        toast('Booking Cancelled');
        //   setBooking((prev) => prev.filter((book) => book.id !== item.id));
        upDateRecord();
      })
      .catch((error) => {
        console.error('Failed to cancel booking:', error);
        toast.error('Failed to cancel booking');
      });
  };

  return (
    <div className="mt-5 flex flex-col gap-5">
      {booking &&
        booking.map((item, index) => (
          <div
            key={index}
            className="flex gap-5 items-center border-[1px] border-gray-200 shadow-blue-500 p-5 rounded-md">
            <Image
              src={item?.doctors[0]?.Image[0].url}
              width={100}
              height={100}
              alt="doctor"
              className="rounded-full w-[100px] h-[100px] object-contain"
              priority
			  />
            <div className="flex flex-col gap-2 w-full">
              <h2 className="text-lg font-semibold flex items-center gap-2 justify-between ">
                {item?.DoctorName}
                {!expire && <CancelAppointment handleContinue={() => deleteBooking(item)} />}
              </h2>
              <h2 className="flex items-center gap-2">
                {' '}
                <MapPin className="w-4 h-4 text-primary" />
                From: {item?.doctors[0]?.Address}
              </h2>
              <h2 className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" /> Appointment On:{' '}
                <b className={new Date(item?.Date) < new Date() ? 'text-red-700' : 'text-blue-700'}>
                  {' '}
                  {moment(item?.Date).format('DD MMMM YYYY')}
                </b>
              </h2>
              <h2 className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" /> Appointment Time:{' '}
                <b className={new Date(item?.Date) < new Date() ? 'text-red-700' : 'text-blue-700'}>
                  {item?.Time}
                </b>
              </h2>
            </div>
          </div>
        ))}
    </div>
  );
}

export default BookingList;
