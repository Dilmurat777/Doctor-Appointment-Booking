'use client';
import GlobalApi from '@/app/_utils/Global.Api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import React, { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BookingList from './_components/BookingList';

function MyBooking() {
  const { user } = useKindeBrowserClient();
	const [booking, setBooking] = React.useState([]);
	
  useEffect(() => {
    user && getBooking();
  }, [user]);
  const getBooking = () => {
    GlobalApi.getMyBooking(user?.email).then((res) => {
		setBooking(res.data.data);
    });
	};
	
	const filterUserBooking = (type) => {
		const result = booking.filter((item) => type==='upcoming' ? new Date(item.Date) >= new Date() : new Date(item.Date) <= new Date());
		
		return result;
	};
  return (
    <div className="flex flex-col mt-10">
      <h2 className="text-2xl font-bold text-center">MyBooking</h2>
      <div>
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="expire">Expire</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming">
            <BookingList booking={filterUserBooking('upcoming')} expire={false} upDateRecord={() => getBooking()} setBooking={setBooking}/>
          </TabsContent>
          <TabsContent value="expire">
					  <BookingList booking={filterUserBooking('expire')} expire={true} upDateRecord={() => getBooking()} setBooking={setBooking} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default MyBooking;
