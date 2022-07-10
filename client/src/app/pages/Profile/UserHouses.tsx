import { useCallback, useEffect, useState } from 'react';
import agent from '../../api/agent';
import UserHousesList from '../../Components/Profile/UserHouses';
import { House } from '../../models/house';
import { useAppSelector } from '../../store/configureStore';

export default function UserHouses() {
  const { user } = useAppSelector((state) => state.account);
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
  }, [loadHouses, user]);

  return (
    <div>
      <div className='container mx-auto px-5'>
        <p className=' font-Primary text-4xl font-thin my-10'>Properties</p>
        <UserHousesList houses={houses} />
      </div>
    </div>
  );
}
