import { format } from 'date-fns';
import { House } from '../../models/house';
import DetailsList from './DetailsList';
import DetailsListItem from './DetailsListItem';
import HousePrices from './HousePrices';

interface Props {
  house: House;
}

export default function HouseDescription({ house }: Props) {
  return (
    <>
      <div className='grid grid-cols-1 gap-4  border-inherit w-full max-w-md ml-auto'>
        <DetailsListItem title='Host' value={house.owner.fullName} />
        <DetailsListItem
          title='Address'
          value={`${house.address.country}, ${house.address.province}, ${house.address.city}`}
        />
        <DetailsListItem
          title='Availability'
          value={
            house.available
              ? 'Available'
              : house.availableFrom &&
                format(new Date(house.availableFrom), 'dd/MM/yyyy')
          }
        />
      </div>

      <div className='grid grid-cols-1 border-inherit gap-4 w-full max-w-md ml-auto'>
        {house.details && <DetailsList house={house} />}
      </div>
      <div className='grid grid-cols-1 border-inherit gap-4 w-full max-w-md ml-auto'>
        {house.prices && <HousePrices prices={house.prices} />}
      </div>
    </>
  );
}
