import { AdjustmentsIcon } from '@heroicons/react/solid';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import AppPagination from '../../Components/Common/AppPagination';
import HousesFilters from '../../Components/House/HousesFilters';
import HousesList from '../../Components/House/HousesList';
import useHouses from '../../hooks/useHouses';
import Layout from '../../layout/Layout';
import { setPageNumber } from '../../slices/housesSlice';
import { useAppDispatch } from '../../store/configureStore';
import { useOutsideClick } from '../../util/outsideClick';

export default function HousesPage() {
  const node = useRef(null);
  const dispatch = useAppDispatch();
  const [filtersVisible, setFiltersVisible] = useState(false);
  const { houses, metaData } = useHouses();

  const handleCloseMenu = () => {
    setFiltersVisible(false);
  };

  useOutsideClick(node, handleCloseMenu);
  return (
    <Layout className='relative w-full flex-1 flex flex-row'>
      <AnimatePresence exitBeforeEnter>
        {filtersVisible && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.4 } }}
            transition={{ staggerChildren: 0.34, delayChildren: 1 }}
            className='fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-70 z-20 '
          >
            <motion.div
              ref={node}
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
              className=' absolute top-0 left-0 bottom-0 z-10 overflow-y-auto max-h-screen  bg-gray-200 dark:bg-slate-900 lg:max-w-sm w-full  lg:flex drop-shadow-md  py-5  flex-col'
            >
              <HousesFilters
                onExit={() => {
                  setFiltersVisible(false);
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className=' flex-auto flex flex-col lg:px-5'>
        <div className='pt-5 flex-initial w-full inline-flex items-center justify-between px-5 '>
          <p className=' font-Primary text-3xl lg:text-5xl'>Browse Houses</p>
          {!filtersVisible && (
            <button
              className=' inline-flex gap-x-1 items-center font-Primary uppercase font-thin text-base bg-black text-white hover:text-yellow-400 dark:hover:text-indigo-400 py-1 px-5 transition-all duration-300'
              onClick={() => setFiltersVisible(true)}
            >
              <AdjustmentsIcon className='h-6 w-6' />
              filters
            </button>
          )}
        </div>
        {houses.length > 0 ? (
          <>
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
          </>
        ) : (
          <div className=' h-full w-full flex items-center justify-center flex-auto'>
            <p className=' font-Primary text-3xl lg:text-9xl opacity-40 '>
              No houses
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
