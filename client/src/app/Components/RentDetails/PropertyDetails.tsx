import { House } from '../../models/house';

interface Props {
  house: House;
}

export default function PropertyDetails({ house }: Props) {
  return (
    <div>
      <p className=' font-Oswald text-2xl uppercase opacity-70 font-thin mb-3 border-b dark:border-b-white'>
        Property
      </p>
      <div className=' flex flex-row gap-x-5'>
        <div className='h-full w-[120px] rounded-md overflow-hidden hidden lg:block'>
          <img
            src={house.cover.pictureUrl}
            alt=''
            className='h-full w-full object-cover object-center'
          />
        </div>
        <div className='flex-auto flex flex-col justify-center'>
          <p className=' font-Oswald text-3xl font-thin'>{house.title}</p>
          <p className=' font-Montserrat text-base'>
            {house.address?.country}, {house.address?.province}
            {', '}
            {house.address?.city}
          </p>
        </div>
      </div>
    </div>
  );
}
