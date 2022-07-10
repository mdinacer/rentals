import { House } from '../../models/house';

interface Props {
  house: House;
}

export default function PropertyDetails({ house }: Props) {
  return (
    <div>
      <p className='font-Primary text-2xl uppercase font-thin mb-2 border-b dark:border-b-white pb-1'>
        Property
      </p>
      <div className=' flex flex-row gap-x-5'>
        <div className='h-full w-[120px] rounded-md overflow-hidden '>
          <img
            src={house.cover.pictureUrl}
            alt=''
            className='h-full w-full object-cover object-center'
          />
        </div>
        <div className='flex-auto flex flex-col justify-center'>
          <p className=' font-Primary text-3xl font-thin'>{house.title}</p>
          <p className=' font-Secondary text-base'>
            {house.address?.country}, {house.address?.province}
            {', '}
            {house.address?.city}
          </p>
        </div>
      </div>
    </div>
  );
}
