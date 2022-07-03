import {
  addDays,
  addWeeks,
  addMonths,
  addYears,
  formatDuration,
  intervalToDuration,
  format,
} from 'date-fns';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import AppDatePicker from './AppDatePicker';
import { ar, fr, enUS } from 'date-fns/locale';
import { registerLocale } from 'react-datepicker';
import { PlusIcon, RefreshIcon, XIcon } from '@heroicons/react/solid';
import { House } from '../../models/house';
import { RentRequestValidationSchema } from '../../validation/requestValidation';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import agent from '../../api/agent';
import { Rent } from '../../models/rent';
import { RentStatus } from '../../models/RentStatus';
import { useTranslation } from 'react-i18next';

registerLocale('ar', ar);
registerLocale('fr', fr);
registerLocale('en', enUS);

const durations = [
  { title: formatDuration({ days: 1 }, { locale: enUS }), value: 'day' },
  { title: formatDuration({ weeks: 1 }, { locale: enUS }), value: 'week' },
  { title: formatDuration({ months: 1 }, { locale: enUS }), value: 'month' },
  { title: formatDuration({ years: 1 }, { locale: enUS }), value: 'year' },
];

interface Props {
  house: House;
  request?: Rent;
  onClose: (value: Rent | null) => void;
}

export default function RentRequestForm({ house, request, onClose }: Props) {
  const isEdit = !!request;
  const [startDate, setStartDate] = useState<Date | null>(
    request ? new Date(request.startDate) : new Date()
  );
  const [endDate, setEndDate] = useState<Date | null>(
    request ? new Date(request.startDate) : new Date()
  );
  const { t } = useTranslation(['request_form']);
  const {
    control,
    setValue,
    reset,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(RentRequestValidationSchema),
  });

  const addDuration = (duration: string) => {
    if (startDate && !endDate) {
      setEndDate(startDate);
    }
    if (duration && endDate) {
      let futureDate = new Date();
      switch (duration) {
        case 'day':
          futureDate = addDays(endDate, 1);
          setValue('endDate', futureDate);

          break;
        case 'week':
          futureDate = addWeeks(endDate, 1);
          setValue('endDate', futureDate);
          break;
        case 'month':
          futureDate = addMonths(endDate, 1);
          setValue('endDate', futureDate);
          break;
        case 'year':
          futureDate = addYears(endDate, 1);
          setValue('endDate', futureDate);
          break;
      }
      setEndDate(futureDate);
    }
  };

  async function handleSubmitData(data: FieldValues) {
    let result = null;
    try {
      if (isEdit) {
        result = await agent.Rents.update(request.id, data);
      } else {
        result = await agent.Rents.create(house.id, data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      reset({ startDate: new Date(), endDate: new Date() });
      onClose(result);
    }
  }

  useEffect(() => {
    if (request) {
      const start = request.startDate
        ? new Date(request.startDate)
        : new Date();
      const end = request.endDate ? new Date(request.endDate) : new Date();
      reset({
        startDate: start,
        endDate: end,
      });
      setStartDate(start);
      setEndDate(end);
    }
  }, [request, reset]);

  useEffect(() => {
    if (!house.available && house.availableFrom) {
      setStartDate(new Date(house.availableFrom));
    }
  }, [house.available, house.availableFrom]);

  return (
    <div className='relative bg-gray-100 dark:bg-slate-800 px-5  lg:px-10 py-5 lg:rounded-md w-full lg:w-full lg:max-w-xl'>
      <button
        type='button'
        title='close'
        className='absolute top-0 right-0  p-2 opacity-50 hover:opacity-100'
        onClick={() => onClose(null)}
      >
        <XIcon className='w-6 h-6' />
      </button>
      <div className='grid grid-flow-row gap-2 font-Oswald font-thin text-xl lg:text-2xl my-5 mb-10'>
        <div className=' flex flex-row lg:flex-row justify-between lg:items-end'>
          <small className='capitalize font-Montserrat text-lg min-w-[10rem]'>
            {t('owner')}
          </small>
          <p>{house.owner.fullName}</p>
        </div>
        <div className=' flex flex-row justify-between lg:items-end'>
          <small className='capitalize  font-Montserrat text-lg min-w-[10rem]'>
            {t('house')}
          </small>
          <p>{house.title}</p>
        </div>

        <div className=' flex flex-row justify-between lg:items-end'>
          <small className='capitalize font-Montserrat text-lg min-w-[10rem]'>
            {t('address')}
          </small>
          <p>
            {house.address.city} - {house.address.province},{' '}
            {house.address.country}
          </p>
        </div>

        {isEdit && (
          <>
            <div className=' flex flex-row justify-between lg:items-end'>
              <small className=' first-letter:capitalize font-Montserrat text-lg min-w-[10rem]'>
                {t('request_date')}
              </small>
              <p>{format(new Date(request.creationDate), 'dd/MM/yyyy')}</p>
            </div>
            <div className=' flex flex-row justify-between lg:items-end'>
              <small className='capitalize font-Montserrat text-lg min-w-[10rem]'>
                {t('status')}
              </small>
              <p>{RentStatus[request.status as any]}</p>
            </div>
          </>
        )}
        <div className=' flex flex-row justify-between lg:items-end'>
          <small className='capitalize font-Montserrat text-lg min-w-[10rem]'>
            {t('duration')}
          </small>
          {startDate && endDate && startDate < endDate && (
            <p>
              {formatDuration(
                intervalToDuration({
                  start: startDate,
                  end: endDate,
                }),
                {
                  format: ['years', 'months', 'days'],
                  zero: false,
                  delimiter: ' - ',
                }
              )}
            </p>
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit(handleSubmitData)} className=''>
        <div className='grid gap-7'>
          <AppDatePicker
            //defaultValue={request ? new Date(request.startDate) : new Date()}
            label={t('start_date')}
            control={control}
            name='startDate'
            selectsStart
            startDate={startDate}
            endDate={endDate}
            minDate={
              house.availableFrom
                ? new Date(house.availableFrom)
                : addDays(new Date(), -1)
            }
            secondaryAction={(date) => {
              if (date) {
                setStartDate(date);
                if (endDate && endDate < date) {
                  setValue('endDate', date, { shouldTouch: true });
                  setEndDate(date);
                }
              }
            }}
          />
          <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 '>
            {durations.map((duration, index) => (
              <button
                key={index}
                onClick={() => addDuration(duration.value)}
                className='capitalize inline-flex rounded-md overflow-hidden  font-Oswald font-thin text-xl'
                type='button'
              >
                <div className='px-2 flex items-center justify-center h-full py-2 bg-gradient-to-b from-green-700 to-green-800 text-white'>
                  <PlusIcon className='h-6 w-6' />
                </div>
                <div className='flex-auto px-5 py-2 flex items-center  h-full  bg-gray-300 dark:bg-slate-900 '>
                  {duration.title}
                </div>
              </button>
            ))}
            <button
              onClick={() => {
                setValue('endDate', startDate || new Date(), {
                  shouldTouch: true,
                });
                setEndDate(startDate || new Date());
              }}
              className=' inline-flex items-center justify-center bg-red-600  hover:bg-red-500 col-span-2 lg:col-span-2 px-2 py-1 font-Oswald rounded-md font-thin text-2xl capitalize text-white'
              type='button'
            >
              <RefreshIcon className='h-6 w-6 mr-2' />
              {t('reset')}
            </button>
          </div>
          <AppDatePicker
            // defaultValue={request ? new Date(request.endDate) : new Date()}
            label={t('end_date')}
            control={control}
            name='endDate'
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            secondaryAction={(date) => setEndDate(date)}
          />
        </div>

        <div className='flex justify-between items-center mt-7 '>
          <input
            className={`bg-red-500 cursor-pointer  text-white font-Oswald text-xl font-thin px-5 py-1 rounded-md uppercase `}
            type='button'
            value={t('exit')}
            onClick={() => onClose(null)}
          />
          <input
            className={`${
              isValid
                ? 'opacity-100 bg-sky-500 dark:bg-indigo-500 '
                : 'opacity-50 bg-sky-700 dark:bg-indigo-700'
            }  text-white font-Oswald text-xl font-thin px-5 py-1 rounded-md uppercase `}
            disabled={!isValid}
            type='submit'
            value={isSubmitting ? t('wait') : t('send')}
          />
        </div>
      </form>
    </div>
  );
}
