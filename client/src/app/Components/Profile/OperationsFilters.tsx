import { useEffect } from 'react';
import { setRentParams } from '../../slices/rentsSlice';
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import AppDropDown from '../Common/AppDropDown';

export default function OperationsFilters() {
  const { user } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();

  async function handleResetData() {
    const item = {
      orderBy: 'creationDate',
      status: '',
      owner: user?.id,
      client: null,
    };

    dispatch(setRentParams(item));
  }

  useEffect(() => {
    dispatch(
      setRentParams({
        orderBy: 'creationDate',
        status: '',
        owner: user?.id,
      })
    );
  }, [dispatch, user?.id]);

  const handleTypeChange = (value: string) => {
    const owner = value === 'received' ? user?.id : '';
    const client = value === 'sent' ? user?.id : '';
    dispatch(setRentParams({ owner, client }));
  };

  const handleSortChange = (orderBy: string) => {
    dispatch(setRentParams({ orderBy }));
  };

  const handleStatusChange = (status: string) => {
    dispatch(setRentParams({ status }));
  };

  return (
    <div className='flex flex-col lg:flex-row lg:items-end lg:justify-between gap-y-5 gap-x-0 lg:gap-y-0 lg:gap-x-10'>
      <div className='flex flex-col lg:flex-row gap-5 w-full flex-auto '>
        <AppDropDown
          className='  w-full lg:max-w-[14rem]'
          label='Type'
          items={typeItems}
          onChange={handleTypeChange}
        />
        <AppDropDown
          className='  w-full lg:max-w-[14rem]'
          label='Sort'
          items={sortItems}
          onChange={handleSortChange}
        />

        <AppDropDown
          className='  w-full lg:max-w-[14rem]'
          label='Status'
          items={statusItems}
          onChange={handleStatusChange}
        />
      </div>

      <div className=' inline-flex lg:items-center justify-evenly gap-x-5 flex-initial'>
        <button
          type='button'
          onClick={handleResetData}
          className='rounded-md w-full lg:w-auto cursor-pointer bg-red-700 text-white font-Oswald text-xl font-thin px-5 py-1'
        >
          Reset
        </button>
      </div>
    </div>
  );
}

const typeItems = [
  { title: 'Received', value: 'received' },
  { title: 'Sent', value: 'sent' },
];

const sortItems = [
  { title: 'Date', value: 'creationDate' },
  { title: 'Status', value: 'status' },
  { title: 'Start Date', value: 'startDate' },
  { title: 'End Date', value: 'endDate' },
];

const statusItems = [
  { title: 'All', value: '' },
  { title: 'Pending', value: 'request' },
  { title: 'Accepted', value: 'operation' },
  { title: 'Cancelled', value: 'cancelled' },
];
