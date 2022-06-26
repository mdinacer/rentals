import { useController, UseControllerProps } from 'react-hook-form';

interface Props extends UseControllerProps {
  label: string;
  type?: string;
  placeholder: string;
  autoComplete?: string | undefined;
  initial?: string;
}

export default function AppTextInput(props: Props) {
  const { fieldState, field } = useController({
    ...props,
    defaultValue: props.initial || '',
  });

  return (
    <div
      className={`w-full  border-b-4 bg-gray-200 dark:bg-slate-600  flex flex-col  overflow-hidden pt-1  ${
        fieldState.error ? 'border-b-red-500' : 'border-b-teal-500 '
      }`}
    >
      <div className='w-full px-5'>
        <p className='text-sm font-Montserrat text-gray-600 dark:text-gray-300'>
          {props.label}
        </p>
        <input
          className={` flex-auto border-none form-input font-Montserrat text-base my-auto lg:text-base placeholder:capitalize placeholder:text-gray-400   pb-2 pt-0 w-full h-auto block bg-transparent focus-within:outline-none  text-black dark:text-white`}
          aria-label={props.label}
          type={props.type}
          {...props}
          {...field}
        />
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