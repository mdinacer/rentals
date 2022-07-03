import { LocationMarkerIcon } from '@heroicons/react/solid';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import usePositions from '../../hooks/usePositions';
import TextInput from './TextInput';

export default function HouseAddressForm() {
  const { control, setValue } = useFormContext();
  const { busy, serviceState, getCurrentLocation } = usePositions();
  const { t } = useTranslation(['shared']);

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
          label={t('country_one')}
          name='address.country'
          placeholder={t('country_one')}
        />
        <TextInput
          autoComplete='province'
          type='text'
          control={control}
          label={t('province_one')}
          name='address.province'
          placeholder={t('province_one')}
        />
        <TextInput
          autoComplete='city'
          type='text'
          control={control}
          label={t('city_one')}
          name='address.city'
          placeholder={t('city_one')}
        />
      </div>
      <TextInput
        autoComplete='address'
        type='text'
        control={control}
        label={t('address_one')}
        name='address.address1'
        placeholder={t('address_one')}
      />
      <TextInput
        autoComplete='address2'
        type='text'
        control={control}
        label={`${t('address_one')} 2`}
        name='address.address2'
        placeholder={`${t('address_one')} 2`}
      />

      <button
        disabled={busy}
        type='button'
        className={`${
          busy ? 'bg-orange-500' : 'bg-gray-400 dark:bg-indigo-500'
        } inline-flex justify-center font-Montserrat text-white py-1 rounded-sm items-center gap-x-1 first-letter:capitalize`}
        onClick={() => getBrowserLocation()}
      >
        <LocationMarkerIcon className='h-5 w-5' />
        {busy ? t('loading') : t('gps')}
      </button>
      <p className=' font-Montserrat text-sm text-center text-gray-600'>
        {serviceState?.message}
      </p>
    </div>
  );
}
