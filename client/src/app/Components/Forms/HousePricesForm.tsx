import { PlusIcon, XIcon } from '@heroicons/react/solid';
import { motion } from 'framer-motion';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import AppCheckbox from './CheckBox';
import AppDropDownInput from './DropDownInput';
import AppNumberInput from './NumberInput';

export default function HousePricesForm() {
  const { control } = useFormContext();
  const { t } = useTranslation(['prices_form']);
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'prices', // unique name for your Field Array
  });

  const durations = [
    { title: t('day_one'), value: 'day' },
    { title: t('week_one'), value: 'week' },
    { title: t('month_one'), value: 'month' },
  ];

  return (
    <div className=''>
      <div className='w-full flex justify-end mb-5'>
        <button
          className=' border border-gray-400 bg-green-500  uppercase text-gray-100  py-1 px-2 ml-auto  inline-flex items-center justify-center'
          type='button'
          onClick={() => append({ title: '', price: 0, duration: 0 })}
        >
          <PlusIcon className='h-6 w-6 ' />
        </button>
      </div>
      <div className='lg:max-h-[60vh] max-h-[60vh] overflow-y-auto'>
        <motion.div className='grid gap-6'>
          {fields.map((field, index) => (
            <motion.div
              layout
              key={field.id}
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -200, transition: { duration: 1 } }}
              className=' w-full  flex flex-col-reverse  gap-3  px-3 py-5 bg-gray-200 rounded-md overflow-hidden shadow-md '
            >
              <div className='grid grid-flow-row  gap-4 flex-auto'>
                <AppDropDownInput
                  autoComplete='durationType'
                  items={durations}
                  control={control}
                  label={t('duration')}
                  name={`prices.${index}.durationType`}
                />
                <AppNumberInput
                  autoComplete='price'
                  min={0}
                  control={control}
                  label={t('price')}
                  name={`prices.${index}.price`}
                  prefix='DA'
                />
                <AppCheckbox
                  name={`prices.${index}.installment`}
                  label={t('installment')}
                />
              </div>
              <button
                title='Remove price'
                className='lg:px-2 ml-auto  text-gray-500 '
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
