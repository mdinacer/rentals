import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import AppDropDown from './DropDown';
import AppTextArea from './TextArea';
import TextInput from './TextInput';

export default function HouseInfoForm() {
  const { control } = useFormContext();
  const { t } = useTranslation(['shared', 'forms']);
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
          { title: t('shared:house'), value: 'house' },
          { title: t('shared:apartment'), value: 'apartment' },
        ]}
      />

      <TextInput
        autoComplete='title'
        type='text'
        control={control}
        label={t('forms:title')}
        name='title'
        placeholder={t('forms:title')}
      />
      <AppTextArea
        autoComplete='catchPhrase'
        type='text'
        rows={6}
        control={control}
        label={t('forms:description')}
        name='catchPhrase'
        placeholder={t('forms:description')}
      />
    </div>
  );
}
