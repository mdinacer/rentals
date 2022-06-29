import { useController, UseControllerProps } from 'react-hook-form';

interface Props extends UseControllerProps {
  label: string;
  type?: string;
  placeholder: string;
  autoComplete?: string | undefined;
  items: { title: string; value: any }[];
  initial?: string;
}

export default function AppDropDown(props: Props) {
  const { fieldState, field } = useController({
    ...props,
    defaultValue: props.initial || '',
  });

  return (
    <div
      className={`w-full bg-gray-200 border-b-4 dark:bg-slate-600 px-5  pt-2 flex flex-col lg:flex-row overflow-hidden  ${
        fieldState.error
          ? 'border-b-red-500'
          : 'border-b-sky-500 dark:border-b-indigo-500'
      }`}
    >
      <div className='w-full'>
        <p className='text-sm capitalize font-Montserrat text-gray-600 dark:text-gray-300'>
          {props.label}
        </p>
        <select
          className={` flex-auto border-none capitalize font-Montserrat text-base my-auto lg:text-lg placeholder:capitalize placeholder:text-gray-400   pb-2 pt-1  w-full h-auto block bg-transparent focus-within:outline-none  text-black dark:text-white`}
          aria-label={props.label}
          type={props.type}
          {...props}
          {...field}
        >
          {props.items.map(({ title, value }, index) => (
            <option key={index} value={value}>
              {title}
            </option>
          ))}
        </select>
      </div>
      {fieldState.error && fieldState.isDirty && (
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
