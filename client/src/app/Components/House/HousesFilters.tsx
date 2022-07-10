import { XIcon } from '@heroicons/react/solid';
import { useForm, FieldValues } from 'react-hook-form';
import useHouses from '../../hooks/useHouses';
import { setHouseParams } from '../../slices/housesSlice';
import { useAppDispatch } from '../../store/configureStore';
import AppCheckbox from '../Forms/CheckBox';
import AppDropDownInput from '../Forms/DropDownInput';
import AppNumberInput from '../Forms/NumberInput';

interface Props {
  province?: string | null;
  city?: string | null;
  onExit: () => void;
}

export default function HousesFilters({ province, city, onExit }: Props) {
  const { houseParams } = useHouses();
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid, isDirty },
  } = useForm({
    mode: 'all',
  });

  async function handleSubmitData(data: FieldValues) {
    dispatch(setHouseParams(data));
  }

  return (
    <form
      onSubmit={handleSubmit(handleSubmitData)}
      className='w-full max-h-screen flex-auto flex flex-col gap-2 overflow-auto bg-gradient-to-br from-gray-300 to-gray-50 dark:from-slate-800 dark:to-slate-900 py-5'
    >
      <div className='relative w-full inline-flex justify-between items-center flex-initial px-5'>
        <p className='font-Primary text-3xl font-thin uppercase'>filters</p>
        <button
          className=' inline-flex gap-x-1 items-center py-1 px-2 rounded-md'
          onClick={onExit}
        >
          <XIcon className='h-6 w-6' />
        </button>
      </div>

      <div className='overflow-y-auto flex-auto'>
        <div className='grid gap-y-3  h-auto'>
          <div className=' px-5 grid gap-y-3'>
            <AppDropDownInput
              autoComplete='type'
              type='text'
              control={control}
              label='House Type'
              initial={houseParams.type || ''}
              name='type'
              items={[
                { title: 'All', value: '' },
                { title: 'House', value: 'house' },
                { title: 'Apartment', value: 'apartment' },
              ]}
            />

            <AppDropDownInput
              autoComplete='province'
              type='search'
              control={control}
              label='Province'
              name='province'
              initial={province || houseParams.province || ''}
              items={provinces}
            />
            <AppDropDownInput
              autoComplete='city'
              type='search'
              control={control}
              label='City'
              name='city'
              initial={city || houseParams.city || ''}
              items={cities}
            />

            <AppNumberInput
              autoComplete='rooms'
              control={control}
              initial={houseParams.rooms || 0}
              label='Rooms'
              name='rooms'
            />

            <AppNumberInput
              autoComplete='minPrice'
              control={control}
              label='Price Minimum'
              initial={houseParams.minPrice || 0}
              name='minPrice'
            />

            <AppNumberInput
              autoComplete='maxPrice'
              control={control}
              label='Price Maximum'
              name='maxPrice'
              initial={houseParams.maxPrice || 0}
            />
          </div>
          <div className='grid grid-cols-1 gap-4 py-5 px-5'>
            <AppCheckbox
              control={control}
              name='services.accessibility'
              label='Accessibility'
            />

            <AppCheckbox
              control={control}
              name='services.airConditioner'
              label='Air Conditioner'
            />

            <AppCheckbox
              control={control}
              name='services.elevator'
              label='Elevator'
            />

            <AppCheckbox
              control={control}
              name='services.furniture'
              label='Furniture'
            />

            <AppCheckbox
              control={control}
              name='services.cityGas'
              label='City Gas'
            />

            <AppCheckbox
              control={control}
              name='services.heater'
              label='Heater'
            />
            <AppCheckbox
              control={control}
              name='services.hotWater'
              label='Hot Water'
            />

            <AppCheckbox
              control={control}
              name='services.internet'
              label='Internet'
            />

            <AppCheckbox
              control={control}
              name='services.petsAllowed'
              label='Pets Allowed'
            />

            <AppCheckbox
              control={control}
              name='services.smokingFree'
              label='Smoke Free'
            />
          </div>

          {/* <Collapsible
            title='Services'
            className='bg-gradient-to- bg-yellow-500 to-yellow-600 dark:from-indigo-500 dark:to-indigo-700   mt-0'
          ></Collapsible> */}
        </div>
      </div>

      <div className=' w-full flex flex-row justify-around items-center gap-x-2  flex-initial px-5'>
        <input
          disabled={isSubmitting || !isValid}
          type='submit'
          value='Filter'
          className={buttonStyle}
        />
        <input
          disabled={isSubmitting || !isDirty}
          type='button'
          value='Reset'
          className={buttonStyle}
        />
      </div>
    </form>
  );
}

const buttonStyle =
  'py-1 bg-gray-900 text-white w-full font-Primary text-lg font-thin uppercase cursor-pointer';

const provinces = [
  { title: 'All', value: '' },
  { title: 'Oran', value: 'Oran' },
];
const cities = [
  { title: 'All', value: '' },
  { title: 'Arzew', value: 'Arzew' },
];
