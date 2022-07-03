import { useTranslation } from 'react-i18next';
import { HouseDetails } from '../../models/houseDetails';

interface Props {
  houseDetails: HouseDetails;
}

export default function HouseDetailsList({ houseDetails }: Props) {
  const { t } = useTranslation('shared');
  return (
    <div className='grid lg:grid-cols-2  gap-3 snap-start py-5 lg:py-0  lg:gap-3 lg:rounded-md  min-w-max     '>
      <HouseDetailsListItem title='floors' value={houseDetails.floors} />
      <HouseDetailsListItem title='rooms' value={houseDetails.rooms} />
      <HouseDetailsListItem title='beds' value={houseDetails.beds} />
      <HouseDetailsListItem title='baths' value={houseDetails.baths} />
      <HouseDetailsListItem title='kitchens' value={houseDetails.kitchens} />
      <HouseDetailsListItem
        title='gardens'
        value={houseDetails.gardens || 'No'}
      />
      <HouseDetailsListItem title='parking' value={houseDetails.parking} />
      <HouseDetailsListItem title='pool' value={houseDetails.pool} />
      <HouseDetailsListItem
        title='smoking'
        value={houseDetails.smokingFree ? 'No' : 'Yes'}
      />
      <HouseDetailsListItem
        title='pets'
        value={houseDetails.petsAllowed ? 'Yes' : 'No'}
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
    <div className='inline-flex justify-between items-center marker:snap-center lg:border-r dark:border-r-white odd:border-r-gray-400 lg:px-5  '>
      <p className=' font-Oswald uppercase font-thin text-lg min-w-[6rem]'>
        {title}
      </p>
      <p className=' font-Montserrat text-2xl font-bold'>{value || 'No'}</p>
    </div>
  );
}
