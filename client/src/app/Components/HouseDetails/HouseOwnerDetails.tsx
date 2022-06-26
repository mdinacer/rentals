import { Link } from 'react-router-dom';
import { UserProfile } from '../../models/profile';

interface Props {
  owner: UserProfile;
  isOwner: boolean;
  slug: string;
}

export default function HouseOwnerDetails({
  owner,
  slug,
  isOwner = false,
}: Props) {
  return (
    <div className='flex flex-col lg:flex-row justify-start items-center lg:mb-5'>
      <div className='border-4 border-sky-500 dark:border-indigo-500  rounded-xl overflow-hidden mb-2 lg:mb-0  my-auto'>
        <img
          src={owner.image}
          alt=''
          className=' object-cover object-center  h-16 w-16'
        />
      </div>

      <div className='px-2 lg:px-5  '>
        <p className=' font-Oswald text-2xl lg:text-3xl font-thin'>
          {owner.fullName}
        </p>
        <p className=' font-Montserrat text-base text-center lg:text-left text-gray-400'>
          Property Owner
        </p>
      </div>

      <div className='lg:ml-auto flex flex-row justify-evenly gap-x-3 mt-4 lg:mt-0'>
        {owner.mobile && (
          <a
            href={`tel:${owner.mobile}`}
            className=' bg-gray-200 dark:bg-slate-500 p-2 rounded-full dark:hover:bg-indigo-500 hover:bg-sky-500 transition-all duration-200'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path d='M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z' />
            </svg>
          </a>
        )}
        {owner.email && (
          <a
            href={`mailto:${owner.email}`}
            className=' bg-gray-200 dark:bg-slate-500 p-2 rounded-full dark:hover:bg-indigo-500 hover:bg-sky-500 transition-all duration-200'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
              <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
            </svg>
          </a>
        )}

        <button
          title='Book a rent date'
          className=' bg-green-500 text-white  p-2 rounded-full'
        >
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
              d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
            />
          </svg>
        </button>

        {isOwner && (
          <Link
            to={`/houses/edit/${slug}`}
            title='Edit house'
            className=' bg-orange-500 text-white ml-5  p-2 rounded-full'
          >
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
          </Link>
        )}
      </div>
    </div>
  );
}
