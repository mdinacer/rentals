import { useFormContext } from 'react-hook-form';
import AppCheckbox from './CheckBox';
import AppNumberInput from './NumberInput';

export default function HouseDetailsForm() {
  const { control, setValue } = useFormContext();
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 '>
      <div className=' lg:col-span-2'>
        <AppNumberInput
          autoComplete='off'
          control={control}
          min={0}
          label='Area'
          name='details.area'
          prefix='m²'
        />
      </div>
      <AppNumberInput
        initial={0}
        autoComplete='off'
        control={control}
        label='Floors'
        min={0}
        name='details.floors'
      />
      <AppNumberInput
        initial={0}
        autoComplete='off'
        control={control}
        label='Rooms'
        min={1}
        name='details.rooms'
      />

      <AppNumberInput
        initial={0}
        autoComplete='off'
        control={control}
        min={1}
        label='Beds'
        name='details.beds'
      />
      <AppNumberInput
        initial={0}
        autoComplete='off'
        control={control}
        label='Baths'
        min={0}
        name='details.baths'
      />
      <AppNumberInput
        initial={0}
        autoComplete='off'
        control={control}
        label='Kitchens'
        min={0}
        name='details.kitchens'
      />
      <AppNumberInput
        initial={0}
        autoComplete='off'
        control={control}
        label='Gardens'
        min={0}
        name='details.garden'
      />
      <AppNumberInput
        initial={0}
        autoComplete='off'
        control={control}
        label='Parking'
        min={0}
        name='details.parking'
      />
      <AppNumberInput
        initial={0}
        autoComplete='off'
        control={control}
        label='Pools'
        min={0}
        name='details.pool'
      />

      <AppCheckbox
        name='details.smokingFree'
        control={control}
        label='Smoke Free'
      />
      <AppCheckbox
        name='details.petsAllowed'
        control={control}
        label='Pets Allowed'
      />
    </div>
  );
}
