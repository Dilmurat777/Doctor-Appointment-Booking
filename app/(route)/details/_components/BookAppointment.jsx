import React, { useEffect, useRef, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CalendarDays, Clock } from 'lucide-react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import GlobalApi from '@/app/_utils/Global.Api';
import { toast } from 'sonner';

function BookAppointment({ doctor }) {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState();
  const [selectTimeSlot, setSelectTimeSlot] = useState();
  const [note, setNote] = useState('');

  const { user } = useKindeBrowserClient();
  const closeRef = useRef();
  useEffect(() => {
    getTime();
  }, []);
  // const saveBooking = () => {
  //   const data = {
  //     data: {
  //       UserName: user?.given_name+' '+user?.family_name,
  //       Email: user?.email,
  //       Time: selectTimeSlot,
  //       Date: date.toISOString().split('T')[0],
  //       // Note: note,
  //       doctor: doctor?.id,
  //       doctorName: doctor?.Name,
  //       doctorImage: doctor?.Image[0].url,
  //     },
  //   }
  //   console.log(data);

  //   GlobalApi.getAppointment(data).then((res) => {
  //     // if (res.status === 200) {
  //     //   alert('Booking Successful')
  //     // } else {
  //     //   alert('Booking Failed')
  //     // }
  //     if (res) {
  //       toast("Booking Successful sent to your email")
  //     }
  //     console.log(res);

  //   })
  // };

  const saveBooking = () => {
    const data = {
      data: {
        UserName: user?.given_name + ' ' + user?.family_name,
        Email: user?.email,
        Time: selectTimeSlot,
        Date: date.toISOString().split('T')[0],
        DoctorName: doctor?.Name,
        Note: note,
        doctors: [doctor?.id],
        // doctor: doctor?.id,
        // doctorName: doctor?.Name,
        // doctor: doctor?.Image[0]?.url,
      },
    };
    GlobalApi.getAppointment(data)
      .then((res) => {
        if (res) {
          GlobalApi.sentEmail(data).then((res) => {});
          toast('Booking Successful sent to your email');
          setDate(new Date());
          setSelectTimeSlot(null);
          setNote('');
          closeRef.current.click();
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error('Booking Failed: ' + err.response?.data?.error?.message || err.message);
      });
  };

  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({ time: i + `:00 AM` });
      timeList.push({ time: i + `:30 AM` });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({ time: i + `:00 PM` });
      timeList.push({ time: i + `:30 PM` });
    }
    setTimeSlot(timeList);
  };
  const pasDay = (day) => {
    return day <= new Date();
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-4 rounded-2xl cursor-pointer">Book Appointment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-col gap-4">
              <div className="sm:flex items-center justify-between w-full">
                {/* Calendar */}
                <div className="flex flex-col gap-4">
                  <h2 className="flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-primary" />
                    Select Date
                  </h2>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={pasDay}
                    className="w-full border-1 rounded-md"
                  />
                </div>
                {/* Time */}
                <div className="mt-5 sm:mt-0 flex flex-col gap-4">
                  <h2 className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Select Time
                  </h2>
                  <div className="grid grid-cols-3 gap-2 text-center border p-2 rounded-md">
                    {timeSlot &&
                      timeSlot.map((item, index) => (
                        <div key={index} className="">
                          <h2
                            onClick={() => setSelectTimeSlot(item.time)}
                            className={`p-2 border rounded-full hover:bg-primary hover:text-white cursor-pointer transition-all ease-in-out ${
                              selectTimeSlot === item.time
                                ? 'bg-primary text-white scale-105 border-2 border-primary'
                                : 'hover:border-primary'
                            }
                              `}>
                            {item.time}
                          </h2>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div>
                <textarea
                  name="note"
                  rows={4}
                  className="w-full border-1 mt-2 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Write your message here..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}></textarea>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              ref={closeRef}
              className="border-1 border-red-500 text-red-500"
              variant="outline">
              Close
            </Button>
          </DialogClose>
          <Button
            onClick={saveBooking}
            type="submit"
            disabled={!selectTimeSlot || !date || note.trim() === ''}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default BookAppointment;
