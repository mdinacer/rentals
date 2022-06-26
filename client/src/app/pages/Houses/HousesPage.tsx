import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import AppPagination from '../../Components/Common/AppPagination';
import LoadingComponent from '../../Components/Common/LoadingComponent';
import HouseFiltersForm from '../../Components/Forms/HouseFiltersForm';
import HousesList from '../../Components/House/HousesList';
import useHouses from '../../hooks/useHouses';
import { setPageNumber } from '../../slices/housesSlice';
import { useAppDispatch } from '../../store/configureStore';

export default function HousesPage() {
  const dispatch = useAppDispatch();
  const [filtersVisible, setFiltersVisible] = useState(false);
  const { houses, housesLoaded, metaData } = useHouses();

  if (!housesLoaded) return <LoadingComponent />;

  if (houses.length < 1)
    return (
      <div className=' h-full w-full flex items-center justify-center flex-auto'>
        <p className=' font-Oswald text-3xl lg:text-9xl opacity-40 '>
          No houses
        </p>
      </div>
    );
  return (
    <div className='relative w-full flex-1 flex flex-row '>
      <AnimatePresence exitBeforeEnter>
        {filtersVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.4 } }}
            transition={{ staggerChildren: 0.34, delayChildren: 1 }}
            className='fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-70 z-20'
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{
                x: filtersVisible ? 0 : '-100%',
                transition: { delay: 0.4, stiffness: 250 },
              }}
              transition={{
                stiffness: 250,
                duration: 0.2,
              }}
              exit={{ x: '-100%' }}
              className=' absolute top-0 left-0 bottom-0 z-10  bg-slate-800 dark:bg-slate-600 lg:max-w-sm w-full  lg:block drop-shadow-md px-5 py-5'
            >
              <div className='relative w-full inline-flex justify-between items-center mb-5'>
                <p className='font-Oswald text-white  text-3xl font-thin uppercase'>
                  filters
                </p>
                <button
                  className=' inline-flex gap-x-1 items-center py-1 px-2 rounded-md text-white'
                  onClick={() => setFiltersVisible(false)}
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
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>

              <div>
                <HouseFiltersForm />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className=' flex-auto flex flex-col lg:px-5'>
        <div className='pt-5 flex-initial w-full inline-flex items-center justify-between px-5 '>
          <p className=' font-Oswald text-3xl lg:text-5xl'>Houses</p>
          {!filtersVisible && (
            <button
              className=' inline-flex gap-x-1 items-center font-Oswald uppercase font-thin text-base bg-teal-500 py-1 px-2 rounded-md text-white'
              onClick={() => setFiltersVisible(true)}
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
                  d='M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4'
                />
              </svg>
              filters
            </button>
          )}
        </div>
        <div className='flex-1 flex items-start'>
          <HousesList houses={houses} />
        </div>
        {metaData && (
          <div className='  flex-initial'>
            <AppPagination
              metaData={metaData}
              onPageChange={(page: number) =>
                dispatch(setPageNumber({ pageNumber: page + 1 }))
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
