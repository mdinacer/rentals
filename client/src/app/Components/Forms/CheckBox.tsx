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
    <div
      className={`${
        field.value === true
          ? 'border-b-sky-500 dark:border-indigo-500'
          : 'border-b-red-500'
      } w-full bg-gray-200  dark:bg-slate-600 border-b-4 overflow-hidden flex items-center `}
    >
      <label className=' inline-flex items-center justify-start gap-x-2 w-full cursor-pointer '>
        <input
          className={` form-checkbox hidden  appearance-none `}
          aria-label={props.label}
          type={'checkbox'}
          {...props}
          {...field}
        />
        <div className='h-8 w-8 flex items-center justify-center'>
          {field.value ? (
            <CheckIcon className='h-6 w-6 text-sky-500 dark:text-indigo-500' />
          ) : (
            <XIcon className='h-6 w-6 text-red-600' />
          )}
        </div>
        <p className='text-base capitalize font-Montserrat text-inherit dark:text-gray-300'>
          {props.label}
        </p>
      </label>
    </div>
  );
}
