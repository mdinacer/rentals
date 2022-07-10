import { HousePrice } from '../../models/housePrice';

interface Props {
  price: HousePrice;
  isEdit: boolean;
  busy?: boolean;
  onRequest: () => void;
}

export default function HouseDetailsPrice({
  price,
  isEdit = false,
  busy = false,
  onRequest,
}: Props) {
  return (
    <div className='bg-black text-white px-5 lg:px-10 w-full flex flex-row justify-between items-center py-5'>
      <p>
        <span className=' font-Primary text-2xl font-thin'>
          {price.price.toFixed(2)}
        </span>
        <span className=' font-Primary text-base font-thin'> DA</span>
        <span className=' font-Primary text-2xl font-thin'> / </span>
        <span className=' font-Raleway text-base uppercase'>
          {price.duration}
        </span>
      </p>

      <button
        disabled={busy}
        onClick={onRequest}
        className={
          'px-5 font-Secondary uppercase font-medium text-base rounded-md border transition-all  duration-200 hover:shadow-lg hover:scale-105 hover:text-black dark:hover:text-white  border-yellow-400 dark:border-indigo-400 text-yellow-500 dark:text-indigo-500 hover:bg-yellow-400 dark:hover:bg-indigo-400 hover:shadow-yellow-600 dark:hover:shadow-indigo-600 '
        }
      >
        {isEdit ? 'View Request' : 'Send Request'}
      </button>
    </div>
  );
}
