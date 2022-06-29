import { useTranslation } from 'react-i18next';
import { HouseDetails } from '../../models/houseDetails';

interface Props {
  houseType: string;
  houseDetails: HouseDetails;
}

export default function HouseDetailsList({ houseType, houseDetails }: Props) {
  const { t } = useTranslation('shared');
  return (
    <div className='grid grid-flow-col w-auto gap-3 snap-start  lg:gap-5 py-5 '>
      {/* <HouseDetailsListItem value={houseType} /> */}
      {houseDetails.rooms > 0 && (
        <HouseDetailsListItem
          title={t('room', { count: houseDetails.rooms })}
          value={houseDetails.rooms}
        />
      )}

      {houseDetails.beds > 0 && (
        <HouseDetailsListItem
          title={t('bed', { count: houseDetails.beds })}
          value={houseDetails.beds}
        />
      )}

      {houseDetails.baths > 0 && (
        <HouseDetailsListItem
          title={t('bath', { count: houseDetails.baths })}
          value={houseDetails.baths}
        />
      )}

      {houseDetails.parking > 0 && (
        <HouseDetailsListItem
          title={t('parking', { count: houseDetails.parking })}
          value={houseDetails.parking}
        />
      )}

      <HouseDetailsListItem
        title={t('smoke_free')}
        value={houseDetails.smokingFree ? t('yes') : t('no')}
      />

      <HouseDetailsListItem
        title={t('pets_allowed')}
        value={houseDetails.petsAllowed ? t('yes') : t('no')}
      />
    </div>
  );
}

interface ItemProps {
  title: string;
  value?: string | number | boolean;
}

function HouseDetailsListItem({ value, title }: ItemProps) {
  return (
    <>
      {/* <div className='py-2 px-10 bg-gradient-to-br from-gray-600 to-gray-900 text-white rounded-md drop-shadow-lg '>
        <div className='flex flex-row  justify-between items-end w-full'>
          {title && (
            <p className='font-Oswald text-lg font-thin uppercase'>{title}</p>
          )}
          <p className=' font-Oswald text-base lg:text-3xl font-thin'>
            {value}
          </p>
        </div>
      </div> */}
      <div className='snap-center flex flex-col lg:flex-row w-full lg:min-w-[11rem] min-w-[8rem] drop-shadow-lg border border-gray-300 dark:border-gray-900 rounded-md overflow-hidden'>
        <div className='flex-auto py-2 px-5 lg:pl-5 lg:pr-2 bg-gradient-to-b from-gray-200 to-gray-300   dark:from-gray-700 dark:to-gray-900 dark:text-white  flex items-center justify-center lg:justify-start '>
          {title && (
            <p className='font-Oswald text-base text-center lg:text-left lg:text-lg font-thin uppercase'>
              {title}
            </p>
          )}
        </div>
        <div className='flex-initial lg:py-2 py-1 px-5 bg-gradient-to-b from-sky-400 to-sky-500 dark:from-indigo-500 dark:to-indigo-900 text-white   flex items-center justify-center '>
          <p className=' font-Oswald capitalize text-lg lg:text-3xl font-thin text-center lg:text-left'>
            {value}
          </p>
        </div>
      </div>
    </>
  );
}
