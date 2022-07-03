import DatePicker from 'react-datepicker';
import { forwardRef } from 'react';
import { Controller, useController, UseControllerProps } from 'react-hook-form';
import { format } from 'date-fns';
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/solid';

interface Props extends UseControllerProps {
  label: string;
  selectsStart?: boolean;
  selectsEnd?: boolean;
  startDate?: Date | null;
  endDate?: Date | null;
  minDate?: Date | null;
  secondaryAction?: (value: Date | null) => void;
}

export default function AppDatePicker(props: Props) {
  const { fieldState, field } = useController({
    ...props,
    defaultValue: new Date(),
  });

  return (
    <div
      className={`w-full  border-b-4 bg-gray-200 dark:bg-slate-600  flex flex-col  overflow-hidden pt-1  ${
        fieldState.error
          ? 'border-b-red-500'
          : 'border-b-sky-500 dark:border-b-indigo-500 '
      }`}
    >
      <div className='w-full px-5'>
        <p className=' first-letter:capitalize text-sm font-Montserrat text-gray-600 dark:text-gray-300'>
          {props.label}
        </p>
        <Controller
          {...props}
          {...field}
          render={({ field }) => (
            <DatePicker
              todayButton={
                <div className=' my-2 px-5'>
                  <button className='w-full bg-sky-500 dark:bg-indigo-500 font-Oswald text-base py-1 px-2 rounded-md font-thin text-white'>
                    Today
                  </button>
                </div>
              }
              className='w-full'
              placeholderText='Select date'
              onChange={(date) => {
                field.onChange(date);
                if (props.secondaryAction) {
                  props.secondaryAction(date);
                }
              }}
              selected={field.value}
              selectsStart={props.selectsStart}
              selectsEnd={props.selectsEnd}
              minDate={props.minDate}
              startDate={props.startDate}
              endDate={props.endDate}
              customInput={<ButtonInput />}
              renderCustomHeader={({
                date,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div className='flex items-center justify-between px-2 py-2'>
                  <span className='text-lg text-gray-700'>
                    {format(date, 'PP')}
                  </span>

                  <div className='space-x-2'>
                    <button
                      onClick={decreaseMonth}
                      disabled={prevMonthButtonDisabled}
                      type='button'
                      className={`
                                  ${
                                    prevMonthButtonDisabled &&
                                    'cursor-not-allowed opacity-50'
                                  }
                                  inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500
                              `}
                    >
                      <ChevronLeftIcon className='w-5 h-5 text-gray-600' />
                    </button>

                    <button
                      onClick={increaseMonth}
                      disabled={nextMonthButtonDisabled}
                      type='button'
                      className={`
                                  ${
                                    nextMonthButtonDisabled &&
                                    'cursor-not-allowed opacity-50'
                                  }
                                  inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500
                              `}
                    >
                      <ChevronRightIcon className='w-5 h-5 text-gray-600' />
                    </button>
                  </div>
                </div>
              )}
            />
          )}
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

const ButtonInput = forwardRef<HTMLButtonElement, any>((props, ref) => (
  <button
    ref={ref}
    onClick={props.onClick}
    type='button'
    className='inline-flex w-full'
  >
    <div className='flex-auto'>
      <p className='font-Montserrat text-lg'>
        {props.value ? format(new Date(props.value), 'PP') : ''}
      </p>
    </div>
    <CalendarIcon className='h-6 w-6 flex-initial text-gray-500' />
  </button>
));
