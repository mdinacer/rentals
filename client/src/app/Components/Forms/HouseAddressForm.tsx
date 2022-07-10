import { LocationMarkerIcon } from '@heroicons/react/solid';
import { useFormContext } from 'react-hook-form';
import usePositions from '../../hooks/usePositions';
import TextInput from './TextInput';

export default function HouseAddressForm() {
  const { control, setValue } = useFormContext();
  const { busy, serviceState, getCurrentLocation } = usePositions();

  async function getBrowserLocation() {
    const location = await getCurrentLocation();

    if (location) {
      if (location.country)
        setValue('address.country', location.country, {
          shouldDirty: true,
          shouldTouch: true,
        });
      if (location.state)
        setValue('address.province', location.state, {
          shouldDirty: true,
          shouldTouch: true,
        });
      if (location.town || location.suburb || location.county)
        setValue(
          'address.city',
          location.town || location.suburb || location.county,
          { shouldDirty: true, shouldTouch: true }
        );

      setValue(
        'address.address1',
        location.road || location.neighbourhood || location.suburb,
        { shouldDirty: true, shouldTouch: true }
      );

      setValue('address.location.long', location.longitude, {
        shouldDirty: true,
        shouldTouch: true,
      });
      setValue('address.location.lat', location.latitude, {
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  }

  return (
    <div className='grid grid-cols-1 gap-4'>
      <div className='grid lg:grid-cols-3 gap-4'>
        <TextInput
          autoComplete='country'
          type='text'
          control={control}
          label={'Country'}
          name='address.country'
          placeholder={'Country'}
        />
        <TextInput
          autoComplete='province'
          type='text'
          control={control}
          label={'Province'}
          name='address.province'
          placeholder={'Province'}
        />
        <TextInput
          autoComplete='city'
          type='text'
          control={control}
          label={'City'}
          name='address.city'
          placeholder={'City'}
        />
      </div>
      <TextInput
        autoComplete='address'
        type='text'
        control={control}
        label={'Address'}
        name='address.address1'
        placeholder={'Address'}
      />
      <TextInput
        autoComplete='address2'
        type='text'
        control={control}
        label={'Address 2'}
        name='address.address2'
        placeholder={'Address 2 (optional)'}
      />

      <button
        disabled={busy}
        type='button'
        className={`${
          busy ? 'bg-orange-500' : 'bg-gray-400 dark:bg-indigo-500'
        } inline-flex justify-center font-Secondary text-white py-1 rounded-sm items-center gap-x-1 first-letter:capitalize`}
        onClick={() => getBrowserLocation()}
      >
        <LocationMarkerIcon className='h-5 w-5' />
        {busy ? 'Loading' : 'GPS Location'}
      </button>
      <p className=' font-Secondary text-sm text-center text-gray-600'>
        {serviceState?.message}
      </p>
    </div>
  );
}
