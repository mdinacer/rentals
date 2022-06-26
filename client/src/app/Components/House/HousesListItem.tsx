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

            <div className='relative  flex-1 w-full  flex flex-col justify-between items-start py-2 px-3'>
              <div className='w-full inline-flex items-start justify-between'>
                <p
                  className={` bg-black bg-opacity-40 text-white uppercase font-Montserrat text-xs lg:text-sm mb-1  py-1 px-2  rounded-sm`}
                >
                  {house.type}
                </p>
                {house.rating > 0 && (
                  <div className=' flex flex-row items-end lg:px-5'>
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
                )}
              </div>
              <div className='w-full'>
                <div className='w-full flex flex-col gap-y-2 px-2 py-2'>
                  <p className=' font-Oswald font-thin text-xl lg:text-3xl '>
                    {house.title}
                  </p>
                  <div className=' inline-flex w-full justify-between items-center font-Montserrat text-sm'>
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
                      <p className=' font-Montserrat text-base'>
                        {house.details.area} sq. ft.
                      </p>
                    </div>
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
