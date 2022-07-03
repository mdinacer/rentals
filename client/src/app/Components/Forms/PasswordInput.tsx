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
    <div className={`w-full overflow-hidden flex flex-col`}>
      <div className='w-full '>
        <div className='py-1'>
          <p className='text-base text-slate-600 dark:text-gray-100 capitalize'>
            {props.label}
          </p>
        </div>
        <div
          className={`w-full inline-flex items-center border ${
            fieldState.error
              ? 'border-red-400 focus:border-red-400'
              : 'border-gray-400 focus:border-gray-400'
          }`}
        >
          <input
            className={`focus:outline-none border-none  bg-transparent py-2 px-5 flex-auto form-input font-Montserrat placeholder:capitalize placeholder:text-gray-400 w-full`}
            aria-label={props.label}
            type={visible ? 'text' : 'password'}
            {...props}
            {...field}
          />
          <button
            tabIndex={-1}
            className='flex-initial h-full py-2 px-2 text-gray-700'
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
