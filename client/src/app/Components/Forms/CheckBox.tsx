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
        field.value === true ? 'border-b-teal-500' : 'border-b-red-500'
      } w-full bg-gray-200  dark:bg-slate-600 border-b-4 overflow-hidden `}
    >
      <label className=' inline-flex items-center justify-start gap-x-2 w-full cursor-pointer '>
        <input
          className={`  appearance-none `}
          aria-label={props.label}
          type={'checkbox'}
          {...props}
          {...field}
        />
        <div className='h-8 w-8 flex items-center justify-center'>
          {field.value ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 text-teal-400'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M5 13l4 4L19 7'
              />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 text-red-600'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
            // <svg
            //   xmlns='http://www.w3.org/2000/svg'
            //   className='h-6 w-6 text-red-600'
            //   fill='none'
            //   viewBox='0 0 24 24'
            //   stroke='currentColor'
            //   strokeWidth={2}
            // >
            //   <path
            //     strokeLinecap='round'
            //     strokeLinejoin='round'
            //     d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
            //   />
            // </svg>
          )}
        </div>
        <p className='text-base  font-Montserrat dark:text-gray-300'>
          {props.label}
        </p>
      </label>
    </div>
    // <button
    //   type='button'
    //   title='checkbox'
    //   className={styles.buttonStyle}
    //   onClick={() => onChange(!isChecked)}
    // >
    //   <div className='pb-2 pt-3 px-3 h-full w-auto border-2 border-inherit  rounded-sm bg-slate-800 text-white '>
    //     {isChecked ? (
    //       <svg
    //         xmlns='http://www.w3.org/2000/svg'
    //         className='h-6 w-6'
    //         fill='none'
    //         viewBox='0 0 24 24'
    //         stroke='currentColor'
    //         strokeWidth={2}
    //       >
    //         <path
    //           strokeLinecap='round'
    //           strokeLinejoin='round'
    //           d='M5 13l4 4L19 7'
    //         />
    //       </svg>
    //     ) : (
    //       <div className='w-6 h-6'></div>
    //     )}
    //   </div>
    //   <p className=' font-Oswald text-lg lg:text-2xl capitalize font-thin pr-5'>
    //     {label}
    //   </p>
    // </button>
  );
}
