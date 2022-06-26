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
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z'
                clipRule='evenodd'
              />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' />
            </svg>
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
          <button className={`px-2 bg-gray-700  p-1 w-auto  text-white`}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
              />
            </svg>
          </button>
          <button className={`px-2 bg-red-700  p-1 w-auto  text-white`}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </div>
      </div>
    </Link>
  );
}
