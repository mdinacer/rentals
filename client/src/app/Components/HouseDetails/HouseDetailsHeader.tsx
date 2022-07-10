import {
  ArrowLeftIcon,
  ArrowsExpandIcon,
  HeartIcon,
  StarIcon,
  ViewGridIcon,
} from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import agent from '../../api/agent';
import { House } from '../../models/house';
import { useAppSelector } from '../../store/configureStore';

interface Props {
  house: House;
}

export default function HouseDetailsHeader({ house }: Props) {
  const { user } = useAppSelector((state) => state.account);
  const [isFavorite, setIsFavorite] = useState(false);

  const setFavorite = async () => {
    try {
      const result = await agent.Houses.addFav(house.id);
      setIsFavorite(result.isFav);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user && user.profile) {
      const isFav =
        (user && user.profile.favorites.includes(house.id)) || false;
      setIsFavorite(isFav);
    }
  }, [house.id, user]);
  return (
    <div className='relative h-[45vh] w-full text-white'>
      <img
        src={house.cover.pictureUrl}
        alt={house.slug}
        className='absolute top-0 left-0 right-0 bottom-0 h-full w-full object-cover object-center'
      />

      <div className='absolute top-0 left-0 right-0 bottom-0 h-full w-full bg-gradient-to-b from-black via-transparent to-black' />

      <div className='relative h-full w-full flex flex-col justify-between px-5 py-5'>
        <div className='w-full flex flex-row justify-between items-center '>
          <Link to={'/houses'}>
            <ArrowLeftIcon className='h-6 w-6' />
          </Link>

          <button type='button' onClick={setFavorite}>
            <HeartIcon
              className={` h-6 w-6 transition-all duration-300  ${
                isFavorite ? 'text-red-600' : 'text-white'
              }`}
            />
          </button>
        </div>

        <div className=' w-full '>
          <p className='text-3xl lg:text-5xl font-Primary font-thin capitalize mb-2'>
            {house.title}
          </p>

          <p className=' inline-flex gap-x-1 items-center font-Raleway mb-3 '>
            {house.address.country && <span>{house.address.country},</span>}
            {house.address.province && <span>{house.address.province},</span>}
            {house.address.city && <span>{house.address.city},</span>}
          </p>

          <div className='w-full rounded-md flex flex-row justify-around bg-white bg-opacity-20 backdrop-blur-md py-1'>
            <div className='inline-flex items-center gap-x-2'>
              <ArrowsExpandIcon className='h-5 w-5' />
              <p>{house.area} m²</p>
            </div>
            <div className='inline-flex items-center gap-x-2'>
              <ViewGridIcon className='h-5 w-5' />
              <p>{house.details.rooms}</p>
            </div>
            <div className='inline-flex items-center gap-x-2'>
              <StarIcon className='h-5 w-5' />
              <p>{house.rating}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
