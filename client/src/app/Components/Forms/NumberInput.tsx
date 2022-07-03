import { useController, UseControllerProps } from 'react-hook-form';

interface Props extends UseControllerProps {
  label: string;
  autoComplete?: string | undefined;
  min?: number;
  vertical?: boolean;
  prefix?: string;
  initial?: number;
}

export default function AppNumberInput(props: Props) {
  const { fieldState, field } = useController({
    ...props,
    defaultValue: props.initial || 0,
  });

  return (
    <div className={`w-full overflow-hidden`}>
      <div className='py-1 min-w-[6rem]'>
        <p className='text-base text-slate-600 dark:text-gray-100 capitalize'>
          {props.label}
        </p>
      </div>
      <div
        className={`flex flex-row items-center w-full border border-gray-400 focus:border-gray-400 ${
          fieldState.error
            ? 'border-red-400 focus:border-red-400'
            : 'border-gray-400 focus:border-gray-400'
        } `}
      >
        <input
          className={`focus:outline-none border-none  border-gray-400 focus:border-none bg-transparent py-2 px-5 flex-auto form-input font-Montserrat placeholder:capitalize placeholder:text-gray-400 w-full `}
          aria-label={props.label}
          type={'number'}
          min={props.min || 0}
          {...props}
          {...field}
        />
        {props.prefix && (
          <p className='text-base whitespace-nowrap lg:text-sm pl-2  dark:text-gray-300 px-5'>
            {props.prefix}
          </p>
        )}
      </div>
      {fieldState.error && (fieldState.isDirty || fieldState.isTouched) && (
        <div className='py-1 w-full'>
          <p className={`w-full text-sm text-red-500 first-letter:uppercase `}>
            {fieldState.error.message}
          </p>
        </div>
      )}
    </div>
  );
}
