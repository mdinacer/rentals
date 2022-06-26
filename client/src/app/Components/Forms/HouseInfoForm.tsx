import { useFormContext } from 'react-hook-form';
import AppDropDown from './DropDown';
import AppTextArea from './TextArea';
import TextInput from './TextInput';

export default function HouseInfoForm() {
  const { control, setValue } = useFormContext();
  return (
    <div className='grid grid-flow-row gap-4'>
      <AppDropDown
        autoComplete='type'
        type='text'
        control={control}
        label='House Type'
        initial='house'
        name='type'
        placeholder='House Type'
        items={[
          { title: 'House', value: 'house' },
          { title: 'Apartment', value: 'apartment' },
        ]}
      />

      <TextInput
        autoComplete='title'
        type='text'
        control={control}
        label='Title'
        name='title'
        placeholder='Title'
      />
      <AppTextArea
        autoComplete='catchPhrase'
        type='text'
        rows={6}
        control={control}
        label='Catch Phrase'
        name='catchPhrase'
        placeholder='Catch Phrase'
      />
    </div>
  );
}
