import { PlusIcon, XIcon } from '@heroicons/react/solid';
import { motion } from 'framer-motion';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import AppCheckbox from './CheckBox';
import AppDropDown from './DropDown';
import AppNumberInput from './NumberInput';
import TextInput from './TextInput';

export default function HousePricesForm() {
  const { control } = useFormContext();
  const { t } = useTranslation(['prices_form']);
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'prices', // unique name for your Field Array
  });

  const durations = [
    { title: t('day'), value: 'day' },
    { title: t('week'), value: 'week' },
    { title: t('month'), value: 'month' },
  ];

  return (
    <div className=''>
      <div className='w-full flex justify-end'>
        <button
          className='mb-5 bg-sky-500 dark:bg-indigo-500 font-Oswald font-thin text-xl uppercase text-white  py-1 px-2 rounded-md ml-auto  inline-flex items-center justify-center'
          type='button'
          onClick={() => append({ title: '', price: 0, duration: 0 })}
        >
          <PlusIcon className='h-8 w-8 pr-2' />
          {t('add')}
        </button>
      </div>
      <div className='lg:max-h-[50vh] max-h-[70vh] overflow-y-auto'>
        <motion.div className=' grid gap-6  '>
          {fields.map((field, index) => (
            <motion.div
              layout
              key={field.id}
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -200, transition: { duration: 1 } }}
              className=' w-full  flex flex-col-reverse lg:flex-row gap-3  px-3 py-2 rounded-md'
            >
              <div className='grid grid-flow-row  gap-2 flex-auto'>
                <div className=' grid lg:grid-cols-3 grid-cols-1 gap-3'>
                  <div className=' lg:col-span-2 '>
                    <TextInput
                      autoComplete='priceTitle'
                      type='text'
                      control={control}
                      label={t('title')}
                      name={`prices.${index}.title`}
                      placeholder={t('title')}
                    />
                  </div>
                  <AppNumberInput
                    autoComplete='price'
                    min={0}
                    control={control}
                    label={t('price')}
                    name={`prices.${index}.price`}
                    prefix='DA'
                  />
                </div>
                <div className=' grid grid-cols-2 gap-3'>
                  <AppNumberInput
                    autoComplete='duration'
                    min={0}
                    control={control}
                    label={t('duration')}
                    name={`prices.${index}.duration`}
                  />
                  <AppDropDown
                    autoComplete='durationType'
                    items={durations}
                    control={control}
                    label={t('duration_type')}
                    placeholder={t('duration_type')}
                    name={`prices.${index}.durationType`}
                  />
                  <div className=' col-span-2'>
                    <AppCheckbox
                      name={`prices.${index}.installment`}
                      label={t('installment')}
                    />
                  </div>
                </div>
              </div>
              <button
                title='Remove price'
                className='lg:px-2 ml-1 lg:bg-red-500 text-red-500 lg:text-white flex items-center justify-end lg:justify-center'
                type='button'
                onClick={() => remove(index)}
              >
                <XIcon className='h-8 w-8' />
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
