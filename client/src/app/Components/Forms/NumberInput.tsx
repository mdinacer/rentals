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
    <div
      className={`w-full border-b-4 bg-gray-200 dark:bg-slate-600  flex flex-col overflow-hidden pt-1 ${
        fieldState.error ? 'border-b-red-500' : 'border-b-teal-500 '
      }`}
    >
      <div
        className={` w-full flex flex-row lg:flex-col px-2 items-center lg:items-start  ${
          props.vertical ? 'flex-col items-start' : 'flex-row items-center'
        }`}
      >
        <p className='text-sm font-Montserrat text-gray-600 dark:text-gray-300'>
          {props.label}
        </p>
        <div className='flex flex-row items-center w-full'>
          <input
            className={`border-none text-right lg:text-center placeholder:text-left flex-auto font-Montserrat text-lg my-auto lg:text-base placeholder:capitalize placeholder:text-gray-400   pt-0 w-full h-auto block bg-transparent focus-within:outline-none  text-black dark:text-white`}
            aria-label={props.label}
            type={'number'}
            min={props.min || 0}
            {...props}
            {...field}
          />
          {props.prefix && (
            <p className='text-base whitespace-nowrap lg:text-sm pl-2 font-Montserrat dark:text-gray-300 '>
              {props.prefix}
            </p>
          )}
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
