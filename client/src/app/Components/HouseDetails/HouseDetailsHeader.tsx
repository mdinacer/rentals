import { useState } from 'react';
import { Link } from 'react-router-dom';
import { House } from '../../models/house';

interface Props {
  house: House;
}

export default function HouseDetailsHeader({ house }: Props) {
  const [inWhishList, setInWhishList] = useState(false);
  return (
    <div className='relative h-[50vh]  lg:h-[45vh] w-full text-white  lg:pb-5 drop-shadow-lg'>
      <img
        src={house.cover.pictureUrl}
        alt={house.slug}
        className='absolute  top-0 left-0 bottom-0 right-0  h-full w-full object-cover lg:object-fill object-center'
      />
      <div className='absolute top-0 left-0 right-0 bottom-0  bg-gradient-to-b from-transparent to-black ' />

      <div className='relative w-full h-full justify-between flex flex-col px-5 lg:px-10 pb-5 lg:py-10'>
        <div className='flex flex-row justify-between items-center py-5 lg:py-2 '>
          <Link to={'/houses/'}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-7 w-7'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </Link>
          <button onClick={() => setInWhishList((prev) => !prev)}>
            {inWhishList ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-7 w-7 text-yellow-400'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path d='M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z' />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-7 w-7'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                />
              </svg>
            )}
          </button>
        </div>
        <div className='flex flex-col items-start gap-y-1'>
          <div className='w-full flex flex-row justify-between items-center'>
            <div className=' flex flex-col items-start'>
              <p
                className={` bg-sky-500 dark:bg-indigo-500 uppercase font-Oswald  font-thin text-xs lg:text-base mb-1  py-0 px-2  rounded-sm`}
              >
                {house.type}
              </p>
              <p className=' font-Oswald text-3xl lg:text-5xl mb-2 capitalize'>
                {house.title}
              </p>
            </div>

            <div className=' inline-flex items-center lg:px-5'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-7 w-7 mr-2 text-yellow-400'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
              </svg>
              <p className=' font-Oswald text-xl lg:text-3xl font-thin'>
                {house.rating.toFixed(1)}
              </p>
            </div>
          </div>

          <div className='font-Montserrat text-base lg:text-lg flex flex-row justify-between items-center w-full'>
            <div className='flex flex-row items-center gap-x-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-4 w-4'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
                  clipRule='evenodd'
                />
              </svg>

              <p>
                {house.address.province} - {house.address.city}
              </p>
            </div>
            <div className='flex flex-row items-center gap-x-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-4 w-4'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4'
                />
              </svg>
              <p>{house.details.area} sq. ft.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
