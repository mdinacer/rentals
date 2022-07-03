import {
  ArrowsExpandIcon,
  BellIcon,
  ChevronLeftIcon,
  CubeIcon,
  LocationMarkerIcon,
  StarIcon,
} from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation('shared');

  const setFavorite = async () => {
    try {
      const result = await agent.Houses.addFav(house.id);
      console.log('Result Fav: ', result.isFav);

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
    <div className='relative h-[50vh]  lg:h-[45vh] w-full text-white pt-[44px] lg:pt-0  lg:pb-5 drop-shadow-lg'>
      <img
        src={house.cover.pictureUrl}
        alt={house.slug}
        className='absolute  top-0 left-0 bottom-0 right-0  h-full w-full object-cover lg:object-fill object-center'
      />

      <div className='absolute top-0 left-0 right-0 bottom-0  bg-gradient-to-t from-black ' />
      <div className='absolute top-0 left-0 right-0 bottom-0  bg-gradient-to-t from-black    ' />

      <div className='relative w-full h-full justify-between flex flex-col px-5 lg:px-10 pb-5 lg:py-10'>
        <div className='flex flex-row justify-between items-center py-5 lg:py-2 '>
          <Link to={'/houses/'}>
            <ChevronLeftIcon className='h-7 w-7' />
          </Link>
          {user && !house.isOwner && (
            <button onClick={setFavorite}>
              <BellIcon
                className={`h-7 w-7 ${
                  isFavorite ? 'text-yellow-400' : 'text-gray-400'
                }`}
              />
            </button>
          )}
        </div>
        <div className='flex flex-col items-start gap-y-1'>
          <div className=' flex flex-col items-start'>
            <p
              className={` bg-sky-500 dark:bg-indigo-500 uppercase font-Montserrat   text-sm lg:text-base mb-1  py-0 px-2  rounded-sm`}
            >
              {t(house.type)}
            </p>
            <p className=' font-Oswald text-2xl font-thin lg:font-normal lg:text-5xl mb-2 capitalize'>
              {house.title}
            </p>
          </div>

          <div className='font-Montserrat text-base lg:text-lg flex flex-row justify-between items-center w-full'>
            <div className='flex flex-row items-center gap-x-2'>
              <LocationMarkerIcon className='h-4 w-4' />

              <p>
                {house.address.province} - {house.address.city}
              </p>
            </div>
            <div className='flex flex-row items-center gap-x-2'>
              <CubeIcon className='h-6 w-6' />
              <p>{house.details.area} m²</p>
            </div>
            {house.rating > 0 && (
              <div className=' inline-flex items-center lg:px-5'>
                <StarIcon className='h-7 w-7 mr-2 text-yellow-400' />
                <p className=' font-Oswald text-xl lg:text-3xl font-thin'>
                  {Math.ceil(house.rating)}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
