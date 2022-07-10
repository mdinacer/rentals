import { EyeIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { House } from '../../models/house';

interface Props {
  house: House;
}

export default function UserHouseCard({ house }: Props) {
  return (
    <div className='relative text-white rounded-md overflow-hidden w-full h-full'>
      <img
        src={house.cover.pictureUrl}
        alt=''
        className='absolute top-0 left-0 right-0 bottom-0 object-fill h-full w-full object-center'
      />
      <div className='absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 backdrop-blur-sm'></div>

      <div className='relative px-5 py-5  w-full h-full flex flex-col justify-between '>
        <p className=' flex-auto font-Primary text-2xl mb-5 lg:text-3xl font-thin'>
          {house.title}
        </p>
        <div className='grid font-Raleway w-full'>
          <ListItem
            title='Created:'
            value={format(new Date(house.creationDate), 'dd/MM/yyy')}
          />

          <ListItem title='Rating:' value={`${house.rating} / 5`} />
          <ListItem title='Available:' value={house.available ? 'Yes' : 'No'} />
        </div>
        <div className='flex flex-row justify-around mt-3'>
          <Link
            to={`/houses/${house.slug}`}
            title='Edit house'
            className={`px-2 hover:text-green-500 flex items-center justify-center   w-full   h-full`}
          >
            <EyeIcon className='h-6 w-6' />
          </Link>
          <Link
            to={`/houses/edit/${house.slug}`}
            title='Edit house'
            className={`px-2 hover:text-orange-500 flex items-center justify-center   w-full   h-full`}
          >
            <PencilAltIcon className='h-6 w-6' />
          </Link>
          <button
            className={` hover:text-red-700  px-2  flex items-center justify-center  h-full w-full`}
          >
            <TrashIcon className='h-6 w-6' />
          </button>
        </div>
      </div>
    </div>
  );
}

interface ItemProps {
  title: string;
  value: string;
}

function ListItem({ title, value }: ItemProps) {
  return (
    <div className='flex flex-row w-full justify-between items-center'>
      <p className=' uppercase font-Primary text-lg font-thin'>{title}</p>
      <p className=' uppercase font-Primary text-lg font-thin'>{value}</p>
    </div>
  );
}
