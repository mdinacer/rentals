import {
  HomeIcon,
  OfficeBuildingIcon,
  PencilAltIcon,
  TrashIcon,
} from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import { House } from '../../models/house';
import { HouseType } from '../../models/houseType';
import DetailsListItem from '../House/DetailsListItem';

interface Props {
  house: House;
}

export default function UserHouseCard({ house }: Props) {
  return (
    <Link
      to={`/houses/${house.slug}`}
      className='h-full lg:w-64 text-black bg-white flex flex-col rounded-md overflow-hidden'
    >
      <div className='inline-flex items-center bg-gray-300 flex-initial'>
        <div className={` bg-gray-700 rounded-br-md p-1 w-auto  text-white`}>
          {house.type === HouseType.house ? (
            <HomeIcon className='h-6 w-6' />
          ) : (
            <OfficeBuildingIcon className='h-6 w-6' />
          )}
        </div>
        <p className='uppercase font-Oswald text-base font-thin ml-2'>
          {house.type}
        </p>
      </div>

      <div className=' px-5 py-3 flex-auto h-full'>
        <p className=' flex-auto font-Oswald text-lg mb-5 lg:text-xl font-thin'>
          {house.title}
        </p>
        <div className='h-full'>
          <DetailsListItem title='Requests' value={50} />
          <DetailsListItem title='Rating' value={'7.5/10'} />

          <DetailsListItem title='Wishlist' value={36} />
        </div>
      </div>
      <div className='inline-flex items-center bg-gray-400 flex-initial justify-between'>
        <div className=' flex-auto'>
          <p className='uppercase font-Oswald text-base font-thin ml-2'>
            23/12/2022
          </p>
        </div>
        <div className=' inline-flex'>
          <button
            title='Edit house'
            className={`px-2 bg-gray-700  p-1 w-auto  text-white`}
          >
            <PencilAltIcon className='h-6 w-6' />
          </button>
          <button className={`px-2 bg-red-700  p-1 w-auto  text-white`}>
            <TrashIcon className='h-6 w-6' />
          </button>
        </div>
      </div>
    </Link>
  );
}
