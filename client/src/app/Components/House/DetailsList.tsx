import { House } from '../../models/house';
import DetailsListItem from './DetailsListItem';

interface Props {
  house: House;
}

export default function DetailsList({ house }: Props) {
  return (
    <>
      <DetailsListItem title='Type' value={house.type} />

      {house.type.toString() === 'appartement' && (
        <DetailsListItem title='Floor' value={house.details.floors} />
      )}
      <DetailsListItem title='Area (sq. ft.)' value={house.details.area} />

      {house.details.rooms > 0 && (
        <DetailsListItem title='Rooms' value={house.details.rooms} />
      )}

      {house.details.baths > 0 && (
        <DetailsListItem title='Bathrooms' value={house.details.baths} />
      )}

      {house.details.parking && (
        <DetailsListItem
          title='Parking'
          value={house.details.parking <= 0 ? 'Yes' : house.details.parking}
        />
      )}

      {house.details.pool && (
        <DetailsListItem
          title='Swimming Pool'
          value={house.details.pool <= 0 ? 'Yes' : house.details.pool}
        />
      )}

      {house.details.petsAllowed && (
        <DetailsListItem
          title='Pets Allowed'
          value={house.details.petsAllowed ? 'Yes' : 'No'}
        />
      )}

      {house.details.smokingFree && (
        <DetailsListItem
          title='Smoke Free'
          value={house.details.smokingFree ? 'No' : 'Yes'}
        />
      )}
    </>
  );
}
