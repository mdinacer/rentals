import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

interface Props extends UseControllerProps {
  label: string;
  placeholder: string;
  autoComplete?: string | undefined;
}

export default function AppPasswordInput(props: Props) {
  const { fieldState, field } = useController({ ...props, defaultValue: '' });
  const [visible, setVisible] = useState(false);

  return (
    <div
      className={`w-full  border-b-4 bg-gray-200 dark:bg-slate-600  flex flex-col  overflow-hidden pt-1 border-b-orange-500 ${
        fieldState.error
          ? 'border-b-red-500'
          : 'border-b-sky-500 dark:border-b-indigo-500'
      }`}
    >
      <div className='w-full px-5'>
        <p className='text-sm font-Montserrat text-gray-600 dark:text-gray-300'>
          {props.label}
        </p>
        <div className=' w-full inline-flex items-center '>
          <input
            className={` flex-auto font-Montserrat text-base my-auto lg:text-base placeholder:capitalize placeholder:text-gray-400   pb-2 pt-3  w-full h-auto block bg-transparent focus:outline-none focus:border-none focus:ring-0  text-black dark:text-white`}
            aria-label={props.label}
            type={visible ? 'text' : 'password'}
            {...props}
            {...field}
          />
          <button
            className='flex-initial h-full px-2 text-gray-300'
            onClick={() => setVisible((prev) => !prev)}
          >
            {visible ? (
              <EyeIcon className='h-6 w-6' />
            ) : (
              <EyeOffIcon className='h-6 w-6' />
            )}
          </button>
        </div>
      </div>

      {fieldState.error && (fieldState.isDirty || fieldState.isTouched) && (
        <div className='py-1 px-5 bg-red-500 w-full'>
          <p
            className={`text-base lg:text-sm leading-none w-full text-center lg:text-left text-white `}
          >
            {fieldState.error.message}
          </p>
        </div>
      )}
    </div>
  );
}
