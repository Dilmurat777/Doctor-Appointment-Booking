import Image from 'next/image';
import Link from 'next/link';

function DoctorList({ doctorList, heading = 'Popular Doctors' }) {
  return (
    <div className="mt-10">
      <h2 className="fond-bold text-xl">{heading}</h2>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
        {doctorList.length > 0
          ? doctorList.map((item, index) => (
              <div
                key={index}
                className="border-[2px] border-gray-200 rounded-lg p-3 hover:border-primary cursor-pointer shadow-sm transition-all ease-in-out flex flex-col items-center gap-2 justify-between">
                <Image
                  src={item?.Image[0].url}
                  alt="doctor"
                  width={200}
                  height={280}
                  className="object-cover rounded-2xl w-full h-[280px]"
                  priority
                />

                <div className="mt-3 items-baseline flex flex-col gap-1 w-full">
                  <h2 className="text-[10px] bg-blue-200 rounded-full p-1 text-primary">
                    {item.category.name}
                  </h2>
                  <h2 className="font-bold">{item?.Name}</h2>
                  <h3 className="text-primary text-sm">{item?.Year_of_Experience}</h3>
                  <h3 className="text-gray-500 text-sm">{item?.Address}</h3>
                  <Link href={`/details/` + item?.id} className="w-full">
                    <h2 className="p-2 px-3 border-[1px] border-primary text-primary rounded-full w-full text-center text-[11px] mt-2 cursor-pointer hover:bg-primary hover:text-white">
                      Book now
                    </h2>
                  </Link>
                </div>
              </div>
            ))
          : [1, 2, 3, 4, 5, 6, 7].map((item, index) => (
              <div
                key={index}
                className="w-full h-[250px] bg-gray-100 animate-pulse rounded-lg"></div>
            ))}
      </div>
    </div>
  );
}

export default DoctorList;
