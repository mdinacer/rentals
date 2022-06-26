import { useCallback, useEffect, useState } from 'react';
import agent from '../../api/agent';
import { House } from '../../models/house';
import { User } from '../../models/user';
import UserHouseCard from './UserHouseCard';

interface Props {
  user: User;
}
export default function UserHouses({ user }: Props) {
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const loadHouses = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const result = await agent.Houses.listByUser();
      setHouses(result);
      setLoaded(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      loadHouses(user.id);
    }

    return () => {
      setHouses([]);
    };
  }, []);

  return (
    <div className=' w-full'>
      <p className=' text-5xl font-Oswald font-thin mb-5'>Hosted Houses</p>
      <div className='grid  lg:grid-cols-5 w-full gap-5 lg:px-5 '>
        {houses.map((house, index) => (
          <UserHouseCard key={index} house={house} />
        ))}
      </div>
    </div>
  );
}
