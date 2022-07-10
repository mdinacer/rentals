import { useFormContext } from 'react-hook-form';
import AppCheckbox from './CheckBox';
import AppDropDownInput from './DropDownInput';
import AppNumberInput from './NumberInput';

export default function HousePricesForm() {
  const { control } = useFormContext();

  const durations = [
    { title: 'Day', value: 'day' },
    { title: 'Week', value: 'week' },
    { title: 'Month', value: 'month' },
    { title: 'Year', value: 'year' },
  ];

  return (
    <div className=''>
      <div className='lg:max-h-[60vh] max-h-[60vh] overflow-y-auto'>
        <div className=' w-full  flex flex-col-reverse px-3 py-5 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden shadow-md '>
          <div className='grid grid-flow-row  gap-4 flex-auto'>
            <AppDropDownInput
              //autoComplete='durationType'
              items={durations}
              control={control}
              label={'Duration'}
              name={`price.durationType`}
              initial={'day'}
            />
            <AppNumberInput
              autoComplete='price'
              min={0}
              control={control}
              label={'Price'}
              name={`price.price`}
              prefix='DA'
            />
            <AppCheckbox name={`price.installment`} label={'Easy payment'} />
          </div>
        </div>
      </div>
    </div>
  );
}
