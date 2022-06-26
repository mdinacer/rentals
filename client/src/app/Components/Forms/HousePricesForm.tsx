import { motion } from 'framer-motion';
import { useFormContext, useFieldArray } from 'react-hook-form';
import AppDropDown from './DropDown';
import AppNumberInput from './NumberInput';
import TextInput from './TextInput';

const durations = [
  { title: 'Day', value: 'day' },
  { title: 'Week', value: 'week' },
  { title: 'Month', value: 'month' },
];

export default function HousePricesForm() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'prices', // unique name for your Field Array
  });

  return (
    <div className=''>
      <button
        className='mb-5 bg-teal-500 py-1 px-2 rounded-md w-full font-Montserrat text-lg text-white inline-flex items-center justify-center'
        type='button'
        onClick={() => append({ title: '', price: 0, duration: 0 })}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-8 w-8 pr-2'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z'
            clipRule='evenodd'
          />
        </svg>
        Add Price
      </button>
      <div className='lg:max-h-[50vh] max-h-[70vh] overflow-y-auto'>
        <motion.div className=' grid gap-6'>
          {fields.map((field, index) => (
            <motion.div
              layout
              key={field.id}
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -200, transition: { duration: 1 } }}
              className=' w-full inline-flex'
            >
              <div className='grid grid-flow-row  gap-2 flex-auto'>
                <div className=' grid grid-cols-3 gap-3'>
                  <div className=' col-span-2 '>
                    <TextInput
                      autoComplete='priceTitle'
                      type='text'
                      control={control}
                      label='Title'
                      name={`prices.${index}.title`}
                      placeholder='Title'
                    />
                  </div>
                  <AppNumberInput
                    autoComplete='price'
                    min={0}
                    control={control}
                    label='Price'
                    name={`prices.${index}.price`}
                    prefix='DA'
                  />
                </div>
                <div className=' grid grid-cols-2 gap-3'>
                  <AppNumberInput
                    autoComplete='duration'
                    min={0}
                    control={control}
                    label='Duration'
                    name={`prices.${index}.duration`}
                  />
                  <AppDropDown
                    autoComplete='durationType'
                    items={durations}
                    control={control}
                    label='Duration Type'
                    placeholder='Duration Type'
                    name={`prices.${index}.durationType`}
                  />
                </div>
              </div>
              <button
                className='lg:px-2 ml-1 bg-red-500 text-white'
                type='button'
                onClick={() => remove(index)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-8 w-8'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
