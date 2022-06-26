import { FieldValues, useForm } from 'react-hook-form';
import AppCheckbox from './CheckBox';
import AppDropDown from './DropDown';
import AppNumberInput from './NumberInput';
import TextInput from './TextInput';

export default function HouseFiltersForm() {
  const {
    control,

    handleSubmit,
    formState: { isSubmitting, isValid, isDirty },
  } = useForm({
    mode: 'all',
  });

  async function handleSubmitData(data: FieldValues) {}
  return (
    <form
      onSubmit={handleSubmit(handleSubmitData)}
      className='w-full h-full flex-1 grid grid-flow-row gap-2 '
    >
      <AppDropDown
        autoComplete='type'
        type='text'
        control={control}
        label='House Type'
        initial='all'
        name='type'
        placeholder='House Type'
        items={[
          { title: 'All', value: 'all' },
          { title: 'House', value: 'house' },
          { title: 'Apartment', value: 'apartment' },
        ]}
      />

      <TextInput
        autoComplete='title'
        type='search'
        control={control}
        label='Search'
        name='title'
        placeholder='Find a house'
      />
      <TextInput
        autoComplete='province'
        type='search'
        control={control}
        label='Province'
        name='province'
        placeholder='Province'
      />
      <TextInput
        autoComplete='city'
        type='search'
        control={control}
        label='City'
        name='city'
        placeholder='City'
      />

      <AppNumberInput
        autoComplete='rooms'
        control={control}
        label='Rooms'
        name='rooms'
      />

      <div className='grid grid-cols-2 gap-4'>
        <AppNumberInput
          autoComplete='minPrice'
          control={control}
          label='Price Minimum'
          name='minPrice'
        />

        <AppNumberInput
          autoComplete='maxPrice'
          control={control}
          label='Price Maximum'
          name='maxPrice'
        />

        <AppNumberInput
          autoComplete='minRating'
          control={control}
          label='Rating Minimum'
          name='minRating'
        />

        <AppNumberInput
          autoComplete='maxRating'
          control={control}
          label='Rating Maximum'
          name='maxRating'
        />

        <div className='grid col-span-2 grid-cols-2 gap-4'>
          <AppCheckbox control={control} label='Parking' name='parking' />
          <AppCheckbox control={control} label='Swimming Pool' name='pool' />
          <AppCheckbox
            control={control}
            label='Pets Allowed'
            name='petsAllowed'
          />
          <AppCheckbox
            control={control}
            label='Smoke Free'
            name='smokingFree'
          />
        </div>
      </div>
    </form>
  );
}
