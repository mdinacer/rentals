import {
  ArrowsExpandIcon,
  LocationMarkerIcon,
  OfficeBuildingIcon,
  StarIcon,
} from '@heroicons/react/solid';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { House } from '../../models/house';

interface Props {
  house: House;
}

export default function HousesListItem({ house }: Props) {
  return (
    <AnimatePresence exitBeforeEnter>
      {house && (
        <motion.div
          variants={CardVariants}
          initial='initial'
          animate='animate'
          whileHover={'hover'}
          exit='exit'
        >
          <Link
            to={`/houses/${house.slug}`}
            className='relative bg-black min-h-[24vh]  rounded-md overflow-hidden flex text-white lg:hover:shadow-xl lg:transition-all  lg:duration-300'
          >
            <motion.img
              variants={CardImageVariants}
              src={house.cover.pictureUrl}
              alt={house.slug}
              className='absolute h-full w-full top-0 left-0 '
            />
            <div className='absolute top-0 left-0 right-0 bottom-0 h-full w-full bg-gradient-to-b from-black via-transparent  to-black opacity-90 ' />

            <div className='relative  flex-1 w-full  flex flex-col justify-between items-start py-4 px-3'>
              <div className='w-full inline-flex items-start justify-between'>
                <div className='flex flex-row items-center gap-x-2'>
                  <LocationMarkerIcon className='h-4 w-4' />

                  <p>
                    {house.address.province} - {house.address.city}
                  </p>
                </div>
                {house.rating > 0 && (
                  <div className=' flex flex-row items-end lg:px-5'>
                    <StarIcon className='h-7 w-7 mr-2 text-yellow-400' />
                    <p className=' font-Primary text-xl lg:text-3xl font-thin'>
                      {house.rating.toFixed(1)}
                    </p>
                  </div>
                )}
              </div>
              <div className='w-full flex flex-col gap-y-2 px-2 '>
                <p className=' font-Primary font-thin text-xl lg:text-3xl '>
                  {house.title}
                </p>
                <div className=' inline-flex w-full justify-between items-center font-Secondary text-sm'>
                  <div className='flex flex-row items-center gap-x-2'>
                    <ArrowsExpandIcon className='h-4 w-4' />
                    <p className=' font-Secondary text-base'>{house.area} m²</p>
                  </div>
                  <div className='flex flex-row items-center gap-x-2'>
                    <OfficeBuildingIcon className='h-4 w-4' />
                    <p className=' font-Secondary text-base'>
                      {house.details.rooms} rooms
                    </p>
                  </div>
                  <div className='flex flex-row items-center gap-x-2 font-Primary font-thin'>
                    <p>
                      <span className='  text-lg '>
                        {house.price.price.toFixed(2)}
                      </span>
                      <span> Da</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const CardVariants = {
  initial: {},
  hover: {},
  animate: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
  exit: { opacity: 0, x: -200 },
};

const CardImageVariants = {
  initial: { scale: 1, transition: { duration: 1, ease: 'easeInOut' } },
  hover: { scale: 1.2, transition: { duration: 1, ease: 'easeInOut' } },
  animate: { scale: 1, transition: { duration: 1, ease: 'easeInOut' } },
  exit: {},
};
