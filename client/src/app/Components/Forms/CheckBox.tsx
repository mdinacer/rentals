import { CheckIcon, XIcon } from '@heroicons/react/solid';
import { UseControllerProps, useController } from 'react-hook-form';

interface Props extends UseControllerProps {
  label: string;
  isChecked?: boolean;
}

export default function AppCheckbox(props: Props) {
  const { field } = useController({
    ...props,
    defaultValue: false,
  });
  return (
    <label className=' inline-flex items-center justify-start gap-x-2 w-full cursor-pointer border border-gray-400 focus:border-gray-400  '>
      <input
        className={`form-checkbox hidden appearance-none`}
        aria-label={props.label}
        type={'checkbox'}
        {...props}
        {...field}
      />
      <div
        className={` flex items-center justify-center transition-all duration-300 text-white px-2 py-2 ${
          field.value === true ? 'bg-green-500 ' : 'bg-red-500'
        }`}
      >
        {field.value ? (
          <CheckIcon className='h-6 w-6' />
        ) : (
          <XIcon className='h-6 w-6' />
        )}
      </div>
      <p className='text-base capitalize text-inherit dark:text-gray-300'>
        {props.label}
      </p>
    </label>
  );
}
