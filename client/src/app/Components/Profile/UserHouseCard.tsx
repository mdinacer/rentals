import { EyeIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { House } from '../../models/house';
import DetailsListItem from '../House/DetailsListItem';

interface Props {
  house: House;
}

export default function UserHouseCard({ house }: Props) {
  return (
    <div className='h-full  text-black bg-white flex flex-col lg:flex-row rounded-md overflow-hidden w-full h-full'>
      <div className='inline-flex items-center bg-gray-300 flex-initial w-full  lg:max-w-[300px] lg:max-h-[200px]'>
        <img
          src={house.cover.pictureUrl}
          alt=''
          className='    object-fill h-full w-full object-center'
        />
      </div>

      <div className=' px-5 py-3 flex flex-col flex-auto h-full'>
        <p className=' flex-auto font-Oswald text-2xl mb-5 lg:text-3xl font-thin'>
          {house.title}
        </p>
        <div className='h-full'>
          <DetailsListItem
            title='Created'
            value={format(new Date(house.creationDate), 'dd/MM/yyy')}
          />

          <DetailsListItem title='Rating' value={`${house.rating} / 5`} />

          <DetailsListItem
            title='available'
            value={house.available ? 'Yes' : 'No'}
          />

          {!house.available && house.availableFrom && (
            <DetailsListItem
              title='availability date'
              value={format(new Date(house.availableFrom), 'dd/MM/yyy')}
            />
          )}
        </div>
      </div>
      <div className='flex lg:flex-col justify-evenly'>
        <Link
          to={`/houses/${house.slug}`}
          title='Edit house'
          className={`px-2 bg-green-500 flex items-center justify-center  py-3 w-full text-white  h-full`}
        >
          <EyeIcon className='h-6 w-6' />
        </Link>
        <Link
          to={`/houses/edit/${house.slug}`}
          title='Edit house'
          className={`px-2 bg-orange-500 flex items-center justify-center  py-3 w-full text-white  h-full`}
        >
          <PencilAltIcon className='h-6 w-6' />
        </Link>
        <button
          className={` bg-red-700  px-2 py-3 w-auto flex items-center justify-center  h-full w-full text-white hfu`}
        >
          <TrashIcon className='h-6 w-6' />
        </button>
      </div>
    </div>
  );
}
