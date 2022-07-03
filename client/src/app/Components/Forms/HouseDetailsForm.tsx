import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import AppCheckbox from './CheckBox';
import AppNumberInput from './NumberInput';

export default function HouseDetailsForm() {
  const { t } = useTranslation(['shared']);
  const { control } = useFormContext();
  return (
    <div className='grid grid-cols-2 lg:grid-cols-2 gap-4 '>
      <div className=' lg:col-span-2'>
        <AppNumberInput
          autoComplete='off'
          control={control}
          min={0}
          label={t('area')}
          name='details.area'
          prefix='m²'
        />
      </div>
      <AppNumberInput
        initial={0}
        autoComplete='off'
        control={control}
        label={t('floors')}
        min={0}
        name='details.floors'
      />
      <AppNumberInput
        initial={0}
        autoComplete='off'
        control={control}
        label={t('room_other')}
        min={1}
        name='details.rooms'
      />

      <AppNumberInput
        initial={0}
        autoComplete='off'
        control={control}
        min={1}
        label={t('bed_other')}
        name='details.beds'
      />
      <AppNumberInput
        initial={0}
        autoComplete='off'
        control={control}
        label={t('bath_other')}
        min={0}
        name='details.baths'
      />
      <AppNumberInput
        initial={0}
        autoComplete='off'
        control={control}
        label={t('kitchen_other')}
        min={0}
        name='details.kitchens'
      />
      <AppNumberInput
        initial={0}
        autoComplete='off'
        control={control}
        label={t('garden_other')}
        min={0}
        name='details.garden'
      />
      <AppNumberInput
        initial={0}
        autoComplete='off'
        control={control}
        label={t('parking_other')}
        min={0}
        name='details.parking'
      />
      <AppNumberInput
        initial={0}
        autoComplete='off'
        control={control}
        label={t('pool_other')}
        min={0}
        name='details.pool'
      />

      <div className=' grid col-span-2 lg:grid-cols-2 gap-4'>
        <AppCheckbox
          name='details.smokingFree'
          control={control}
          label={t('smoke_free')}
        />
        <AppCheckbox
          name='details.petsAllowed'
          control={control}
          label={t('pets_allowed')}
        />
      </div>
    </div>
  );
}
