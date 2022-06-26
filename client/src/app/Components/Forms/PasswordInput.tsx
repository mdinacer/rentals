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
        fieldState.error ? 'border-b-red-500' : 'border-b-teal-500 '
      }`}
    >
      <div className='w-full px-5'>
        <p className='text-sm font-Montserrat text-gray-600 dark:text-gray-300'>
          {props.label}
        </p>
        <div className=' w-full inline-flex items-center px-4 lg:px-10'>
          <input
            className={` flex-auto font-Montserrat text-base my-auto lg:text-base placeholder:capitalize placeholder:text-gray-400   pb-2 pt-3  w-full h-auto block bg-transparent focus-within:outline-none  text-black dark:text-white`}
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
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'
                />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                />
              </svg>
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
