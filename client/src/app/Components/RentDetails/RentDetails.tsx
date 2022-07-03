import { XIcon } from '@heroicons/react/solid';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import agent from '../../api/agent';
import { Rent } from '../../models/rent';
import { useAppSelector } from '../../store/configureStore';
import { useOutsideClick } from '../../util/outsideClick';
import LoadingComponent from '../Common/LoadingComponent';
import PaymentsList from './PaymentsList';
import PeriodDetails from './PeriodDetails';
import PersonDetails from './PersonDetails';
import PricesDetails from './PriceDetails';
import PropertyDetails from './PropertyDetails';

interface Props {
  rentId: string;
  onClose: () => void;
}

export default function RentDetails({ rentId, onClose }: Props) {
  const [rent, setRent] = useState<Rent | undefined>(undefined);
  const node = useRef(null);
  const { user } = useAppSelector((state) => state.account);
  const [loading, setLoading] = useState(false);
  const [rentType, setRentType] = useState('');

  const fetchOperation = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const result = await agent.Rents.details(id);
      console.log(result);

      setRent(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (rentId) {
      fetchOperation(rentId);
    }

    return () => {
      setRent(undefined);
    };
  }, [fetchOperation, rentId]);

  useEffect(() => {
    if (user && rent) {
      const item = rent.client._id === user.id ? 'sent' : 'received';
      setRentType(item);
    }
    return () => {
      setRentType('');
    };
  }, [rent, user]);

  useOutsideClick(node, onClose);

  if (loading) return <LoadingComponent />;
  if (!rent) return <div>No Data</div>;

  return (
    <motion.div
      ref={node}
      layoutId={rent.id}
      className='relative bg-white dark:bg-gray-900 lg:rounded-lg overflow-hidden   mx-auto  w-auto flex flex-col '
    >
      <button
        title='Close'
        className='absolute top-0 right-0 m-3'
        onClick={onClose}
      >
        <XIcon className='h-6 w-6' />
      </button>
      <div className='bg-white dark:bg-gray-900 shadow-md lg:shadow-none flex flex-col lg:flex-row'>
        <div className=' px-5 lg:pt-10 pt-5 grid gap-y-10 min-w-[32rem] w-full'>
          <PropertyDetails house={rent.house} />
          <PersonDetails
            profile={
              rentType === 'sent' ? rent.owner.profile : rent.client.profile
            }
            title={rentType === 'sent' ? 'Owner' : 'Client'}
          />
          <PeriodDetails startDate={rent.startDate} endDate={rent.endDate} />
        </div>

        {rent.accepted && rent.status === 'operation' && (
          <div className=' px-5 lg:pt-10  py-5 bg-gray-300 dark:bg-gray-800 min-w-[28rem] w-full flex flex-col gap-y-10 '>
            <PricesDetails price={rent.price} paid={rent.paid} />
            <div className=''>
              <p
                className=' font-Oswald text-2xl uppercase opacity-70 font-thin mb-3 border-b dark:border-b-white
              '
              >
                Payments
              </p>
              {rent.payments && rent.payments.length > 0 && (
                <PaymentsList payments={rent.payments} />
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
