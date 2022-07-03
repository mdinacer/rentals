import { useTranslation } from 'react-i18next';
import { HousePrice } from '../../models/housePrice';

interface Props {
  prices: HousePrice[];
}

export default function HouseDetailsPrices({ prices }: Props) {
  return (
    <div className='grid gap-4 lg:grid-cols-2  lg:gap-3'>
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
  const { t } = useTranslation(['prices_form']);
  return (
    <div className='w-full flex flex-col lg:flex-row items-center justify-between pb-1 px-5 lg:bg-black text-white'>
      <p className=' inline-flex items-end gap-x-1'>
        <span className=' font-Oswald text-3xl'>{price.price.toFixed(2)}</span>
        <span className=' font-Oswald text-lg font-thin'> DA</span>

        <span className=' font-Oswald text-4xl font-thin'> / </span>

        <span className=' font-Oswald text-2xl font-thin uppercase'>
          {price.durationType}
        </span>
      </p>
      <p className='font-Montserrat text-xs uppercase mt-2 text-center'>
        {price.installment ? 'easy payment' : 'Full payment'}
      </p>
    </div>
  );
}
