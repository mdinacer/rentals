import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Rent } from '../../models/rent';
import { RentStatus } from '../../models/RentStatus';

interface Props {
  rents: Rent[];
  onSelect: (item: Rent) => void;
}

export default function OperationsList({ rents, onSelect }: Props) {
  return (
    <>
      <OperationsListHeader />
      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='open'
        exit='exit'
        className='grid gap-5 mb-10'
      >
        {rents.map((rent) => (
          <OperationsListItem rent={rent} key={rent.id} onSelect={onSelect} />
        ))}
      </motion.div>
    </>
  );
}

const getStatusColor = (value: string) => {
  switch (value) {
    case 'request':
      return 'bg-orange-500';
    case 'operation':
      return 'bg-green-500';
    case 'cancelled':
      return 'bg-red-500';
  }
};

function OperationsListHeader() {
  const itemStyle = 'font-Oswald font-thin text-base capitalize px-5';
  return (
    <div className=' grid-cols-7 gap-5 dark:bg-gray-800 bg-gray-300 py-2 my-3 hidden lg:grid'>
      <small className={itemStyle}>Status</small>
      <small className={itemStyle}>Request Date</small>
      <small className={itemStyle}>House</small>
      <small className={itemStyle + ' col-span-2'}>Customer</small>
      <small className={itemStyle}>Start Date</small>
      <small className={itemStyle}>End Date</small>
    </div>
  );
}

interface ItemProps {
  rent: Rent;
  onSelect: (item: Rent) => void;
}

function OperationsListItem({ rent, onSelect }: ItemProps) {
  return (
    <motion.div
      layoutId={rent.id}
      onClick={() => onSelect(rent)}
      variants={itemVariants}
      layout
      className={`cursor-pointer grid lg:grid-cols-7 lg:gap-x-5 bg-gray-200 dark:bg-gray-800 ${
        rent.active === true && rent.accepted && rent.status === 'operation'
          ? 'border-2 border-green-500'
          : 'border-0'
      }`}
    >
      <div
        className={`${getStatusColor(
          rent.status
        )} text-white px-5 py-2 flex flex-row justify-between`}
      >
        <small className='font-Oswald font-thin text-base capitalize block lg:hidden'>
          Status
        </small>
        <p className=' font-Montserrat text-lg capitalize'>
          {rent.status === 'operation'
            ? rent.active
              ? 'Active'
              : 'Accepted'
            : RentStatus[rent.status as any]}
        </p>
      </div>
      <div className='px-5 py-2 flex flex-row justify-between'>
        <small className='font-Oswald font-thin text-base capitalize block lg:hidden'>
          Request date
        </small>
        <p className=' font-Montserrat text-lg capitalize'>
          {format(new Date(rent.creationDate), 'dd/MM/yyyy')}
        </p>
      </div>
      <div className='px-5 py-2 flex flex-row justify-between'>
        <small className='font-Oswald font-thin text-base capitalize block lg:hidden'>
          {rent.house.type}
        </small>
        <p className=' font-Montserrat text-lg capitalize'>
          {rent.house.title}
        </p>
      </div>
      <div className='px-5 py-2 lg:col-span-2 flex flex-row justify-between'>
        <small className='font-Oswald font-thin text-base capitalize block lg:hidden'>
          Customer
        </small>
        <p className=' font-Montserrat text-lg capitalize'>
          {rent.client.profile.fullName}
        </p>
      </div>

      <div className='px-5 py-2 flex flex-row justify-between'>
        <small className='font-Oswald font-thin text-base capitalize block lg:hidden'>
          Start date
        </small>
        <p className=' font-Montserrat text-lg capitalize'>
          {format(new Date(rent.startDate), 'dd/MM/yyyy')}
        </p>
      </div>
      <div className='px-5 py-2 flex flex-row justify-between'>
        <small className='font-Oswald font-thin text-base capitalize block lg:hidden'>
          End date
        </small>
        <p className=' font-Montserrat text-lg capitalize'>
          {format(new Date(rent.endDate), 'dd/MM/yyyy')}
        </p>
      </div>
    </motion.div>
  );
}

const containerVariants = {
  hidden: {},
  open: { transition: { staggerChildren: 0.38 } },
  exit: { transition: { staggerChildren: 0.38 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  open: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
};
