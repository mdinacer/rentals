import { HousePrice } from '../../models/housePrice';

interface Props {
  prices: HousePrice[];
}
export default function HousePrices({ prices = [] }: Props) {
  return (
    <>
      {prices.map((price, index) => (
        <div
          key={index}
          className=' border-b border-b-inherit flex flex-row gap-x-10 items-end pb-1 bg-gray-100 px-4 py-1 rounded-md '
        >
          <div className=' w-full flex flex-row justify-between items-end'>
            <p className=' font-Oswald text-2xl font-thin'>{price.title}</p>
            <div className=' flex flex-col items-end'>
              <p>
                <span className=' font-Oswald text-lg font-thin'>
                  {price.duration}
                </span>
                <span className='uppercase'>
                  {' '}
                  {price.duration > 1 ? ' days' : ' day'}
                </span>
              </p>
              <p>
                <span className=' font-Oswald text-lg lg:text-xl font-thin'>
                  {price.price.toFixed(2)}
                </span>
                <span className='uppercase'> DA</span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
