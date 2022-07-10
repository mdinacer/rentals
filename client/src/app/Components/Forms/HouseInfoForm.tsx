import { useFormContext } from 'react-hook-form';
import AppDropDownInput from './DropDownInput';
import AppTextArea from './TextArea';
import TextInput from './TextInput';

export default function HouseInfoForm() {
  const { control } = useFormContext();
  return (
    <div className='grid grid-flow-row gap-4'>
      <AppDropDownInput
        autoComplete='type'
        type='text'
        control={control}
        label='House Type'
        initial='house'
        name='type'
        items={[
          { title: 'House', value: 'house' },
          { title: 'Apartment', value: 'apartment' },
        ]}
      />

      <TextInput
        autoComplete='title'
        type='text'
        control={control}
        label={'Title'}
        name='title'
        placeholder={'Title'}
      />
      <AppTextArea
        autoComplete='catchPhrase'
        type='text'
        rows={6}
        control={control}
        label={'Description'}
        name='catchPhrase'
        placeholder={'Description'}
      />
    </div>
  );
}
