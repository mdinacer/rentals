import { useFormContext } from 'react-hook-form';
import AppCheckbox from './CheckBox';

export default function HouseServicesForm() {
  const { control } = useFormContext();
  return (
    <div className='grid grid-cols-2 lg:grid-cols-2 gap-4 '>
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

      <AppCheckbox control={control} name='services.cityGas' label='City Gas' />

      <AppCheckbox control={control} name='services.heater' label='Heater' />
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
  );
}
