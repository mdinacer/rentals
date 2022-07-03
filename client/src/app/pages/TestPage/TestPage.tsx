import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import agent from '../../api/agent';
import Layout from '../../layout/Layout';
import { House } from '../../models/house';
import { HouseReview } from '../../models/houseReview';
import { useAppSelector } from '../../store/configureStore';

export default function TestPage() {
  const { user } = useAppSelector((state) => state.account);
  const { slug } = useParams<{ slug: string }>();
  const [loading, setLoading] = useState(true);
  const [house, setHouse] = useState<House | undefined>(undefined);
  const [detailsVisible, setDetailsVisible] = useState(false);

  const fetchHouse = useCallback(
    async (slug: string) => {
      try {
        setLoading(true);
        const result = await agent.Houses.details(slug);
        const isOwner = result?.owner.id === user?.id;
        setHouse({ ...result, isOwner });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [user?.id]
  );

  useEffect(() => {
    if (slug) {
      fetchHouse(slug);
    }
    return () => {
      setHouse(undefined);
    };
  }, [fetchHouse, slug]);

  if (!house) return <div>No data</div>;
  return (
    <Layout className='flex flex-col-reverse lg:flex-row-reverse bg-black'>
      <img
        src={house.cover.pictureUrl}
        alt={house.slug}
        className='absolute top-0 left-0 right-0 bg-cover  bg-center w-full h-full bottom-0 '
      />
      <div className='absolute top-0 left-0 right-0 bg-black bg-opacity-80 w-full bottom-0 ' />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 0.7, stiffness: 300, duration: 1 },
        }}
        className='relative w-full  lg:w-1/3  flex-auto '
      ></motion.div>
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: 0, transition: { stiffness: 300, delay: 0.4 } }}
        className='relative px-5 py-10  bg-gray-200 dark:bg-gray-800 scrollbar-hide overflow-auto lg:w-1/3 lg:flex-initial shadow-xl flex flex-col items-center justify-center'
      >
        <motion.div layout layoutScroll className='flex flex-col gap-y-10'>
          <HouseDetailHeader key='header' house={house} />
          <HouseDetailsPrices house={house} />
          <AnimatePresence exitBeforeEnter>
            {detailsVisible && (
              <motion.div
                key={'info'}
                initial={{ y: '-100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ x: '-100%', opacity: 0 }}
                className='grid gap-y-10'
              >
                <HouseDetailsInfo house={house} />
              </motion.div>
            )}
          </AnimatePresence>

          <div className=' py-2 w-full flex items-center justify-center mt-10 gap-x-5'>
            <button
              onClick={() => setDetailsVisible((prev) => !prev)}
              type='button'
              className='inline-flex items-center justify-center uppercase dark:border-white border-black border-2 rounded-full max-w-xs w-full py-1 flex-auto hover:bg-black dark:hover:bg-white hover:text-gray-200 dark:hover:text-gray-800 font-Montserrat text-lg  '
            >
              {detailsVisible ? (
                <ChevronUpIcon className=' h-6 w-6 mr-2' />
              ) : (
                <ChevronDownIcon className=' h-6 w-6 mr-2' />
              )}
              details
            </button>

            <button
              onClick={() => setDetailsVisible((prev) => !prev)}
              type='button'
              className='uppercase rounded-full py-1 px-10 dark:hover:bg-[#FAC213] hover:bg-[#FAC213] hover:text-white border-2 border-[#FAC213] dark:border-[#FAC213]  font-Montserrat text-lg  '
            >
              apply
            </button>
          </div>
        </motion.div>
        <div className='lg:absolute bottom-0 right-0 bg-[#FAC213] dark:bg-[#FAC213] translate-x-1 px-10 py-5 mb-10 shadow-md rounded-sm text-black'>
          <div className='grid grid-flow-col gap-5'>
            <div className='py-2 px-5 flex flex-col items-center justify-center'>
              <p className=' font-Oswald text-base font-thin'>ROOMS</p>
              <p className=' font-Montserrat text-5xl font-bold'>
                {house.details.rooms}
              </p>
            </div>

            <div className='py-2 px-5 flex flex-col items-center justify-center'>
              <p className=' font-Oswald text-base font-thin'>BEDS</p>
              <p className=' font-Montserrat text-5xl font-bold'>
                {house.details.beds}
              </p>
            </div>

            <div className='py-2 px-5 flex flex-col items-center justify-center'>
              <p className=' font-Oswald text-base font-thin'>AREA</p>
              <p>
                <span className=' font-Montserrat text-5xl font-bold'>
                  {house.details.area}
                </span>
                <span className=' font-Montserrat text-lg '> m²</span>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}

function HouseDetailHeader({ house }: { house: House }) {
  return (
    <div>
      <div className='grid grid-flow-row gap-y-5'>
        <div className=''>
          <p className=' font-Oswald text-7xl mb-1'>{house.title}</p>
          <p className=' font-Montserrat uppercase text-base text-gray-500 dark:text-gray-400'>
            {house.address.city}, {house.address.province}
          </p>
        </div>
        <p className=' font-Montserrat text-lg max-w-lg w-full '>
          {house.catchPhrase}
        </p>

        {/* <div className=' py-2 w-full flex items-center justify-center'>
          <button
            type='button'
            className='border-black border rounded-full max-w-xs w-full py-2 flex-auto font-Montserrat hover:bg-black hover:text-gray-200 '
          >
            More details
          </button>
        </div> */}
      </div>
    </div>
  );
}

function HouseDetailsPrices({ house }: { house: House }) {
  return (
    <div>
      <p className=' font-Oswald uppercase font-thin text-3xl mb-3'>Prices</p>
      <div className='grid lg:grid-cols-2 gap-3 bg-black text-white rounded-md w-full'>
        {house.prices.map((item, index) => (
          <div
            key={index}
            className='w-full inline-flex items-center justify-between pb-1 px-5'
          >
            <p className=' inline-flex items-end gap-x-1'>
              <span className=' font-Oswald text-3xl'>
                {item.price.toFixed(2)}
              </span>
              <span className=' font-Oswald text-lg font-thin'> DA</span>

              <span className=' font-Oswald text-4xl font-thin'> / </span>

              <span className=' font-Oswald text-2xl font-thin uppercase'>
                {item.durationType}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function HouseDetailsInfo({ house }: { house: House }) {
  return (
    <div>
      <p className=' font-Oswald uppercase font-thin text-3xl mb-3'>
        Characteristics
      </p>
      <div className='grid grid-cols-2  gap-x-10  w-full'>
        <InfoItem title='floors' value={house.details.floors} />
        <InfoItem title='rooms' value={house.details.rooms} />
        <InfoItem title='beds' value={house.details.beds} />
        <InfoItem title='baths' value={house.details.baths} />
        <InfoItem title='kitchens' value={house.details.kitchens} />
        <InfoItem title='gardens' value={house.details.gardens} />
        <InfoItem title='parking' value={house.details.parking} />
        <InfoItem title='pool' value={house.details.pool} />

        <div className=' col-span-2 lg:col-span-1 grid grid-cols-1 lg:grid-cols-2'>
          <InfoItem
            title='smoking allowed'
            value={house.details.smokingFree ? 'No' : 'Yes'}
          />
          <InfoItem
            title='pets allowed'
            value={house.details.petsAllowed ? 'Yes' : 'No'}
          />
        </div>
      </div>
    </div>
  );
}

function InfoItem({ title, value }: { title: string; value: any | null }) {
  return (
    <div className='inline-flex justify-between items-center '>
      <p className=' font-Oswald uppercase font-thin text-lg'>{title}</p>
      <p className=' font-Montserrat text-2xl font-bold'>{value || 'No'}</p>
    </div>
  );
}

function HouseDetailsReviews({
  house,
  reviews,
}: {
  house: House;
  reviews: HouseReview[];
}) {
  return (
    <div className='py-10 bg-gray-200'>
      <div className=' flex flex-col'>
        <p className=' font-Oswald uppercase font-thin text-3xl mb-3'>
          Reviews
        </p>
        <div className='grid grid-flow-row gap-5'>
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <div
              key={index}
              className='bg-gray-300 rounded-xl py-5 px-10  shadow-md max-w-lg'
            >
              <p className=' font-Oswald text-2xl font-thin'>
                Abdenasser Mohammedi
              </p>
              <small className=' font-Montserrat uppercase text-gray-500'>
                Algeria
              </small>
              <p className=' font-Montserrat'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
                molestias velit unde autem praesentium quo! Non quod aliquam
                omnis vel?
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
