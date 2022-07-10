import { FieldValues, useForm } from 'react-hook-form';
import useHouses from '../../hooks/useHouses';
import { setHouseParams } from '../../slices/housesSlice';
import { useAppDispatch } from '../../store/configureStore';
import Collapsible from '../Common/Collapsible';
import AppCheckbox from './CheckBox';
import AppDropDownInput from './DropDownInput';
import AppNumberInput from './NumberInput';

export default function HouseFiltersForm() {
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
      className='w-full h-full flex-1 flex flex-col gap-2 max-h-screen'
    >
      <div className=' flex-1 overflow-y-auto '>
        <div className='flex flex-col h-auto'>
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
            initial={houseParams.province || ''}
            items={provinces}
          />
          <AppDropDownInput
            autoComplete='city'
            type='search'
            control={control}
            label='City'
            name='city'
            initial={houseParams.city || ''}
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

          <Collapsible title='Services' className='bg-gray-800 text-white mt-5'>
            <div className='grid grid-cols-1 gap-4 py-5'>
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
          </Collapsible>
        </div>
      </div>

      <div className=' w-full flex flex-row justify-around items-center gap-x-2 my-3 flex-initial'>
        <input type='submit' value='Filter' className={buttonStyle} />
        <input type='button' value='Reset' className={buttonStyle} />
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
