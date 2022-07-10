import { House } from '../../models/house';
import UserHouseCard from './UserHouseCard';

interface Props {
  houses: House[];
}
export default function UserHousesList({ houses = [] }: Props) {
  return (
    <div className='grid  lg:grid-cols-3 w-full gap-5 lg:px-5 '>
      {houses.map((house, index) => (
        <UserHouseCard key={index} house={house} />
      ))}
    </div>
  );
}
