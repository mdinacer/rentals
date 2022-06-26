import { HousePrice } from '../../models/housePrice';

interface Props {
  prices: HousePrice[];
}

export default function HouseDetailsPrices({ prices }: Props) {
  return (
    <div className='grid gap-4 lg:grid-cols-4  lg:gap-3'>
      {prices.map((price, index) => (
        <HouseDetailsPriceItem key={index} price={price} />
      ))}
    </div>
  );
}

interface ItemProps {
  price: HousePrice;
}

function HouseDetailsPriceItem({ price }: ItemProps) {
  return (
    <div className='py-3 px-5 border border-sky-200 dark:border-indigo-900 bg-gradient-to-br from-sky-400 to-sky-600 dark:from-indigo-500 dark:to-indigo-800 text-white rounded-2xl drop-shadow-lg '>
      {price.title && (
        <p className='font-Montserrat text-base uppercase mb-2'>
          {price.title}
        </p>
      )}

      <div className='flex flex-row  justify-between items-end w-full'>
        <p>
          <span className=' font-Oswald text-base lg:text-xl font-thin'>
            {price.duration}
          </span>
          <span className='uppercase'>
            {` ${price.durationType}${price.duration > 1 ? 's' : ''}`}
          </span>
        </p>
        <p>
          <span className=' font-Oswald text-base lg:text-2xl font-thin'>
            {price.price.toFixed(2)}
          </span>
          <span className='uppercase'> DA</span>
        </p>
      </div>
    </div>
  );
}
