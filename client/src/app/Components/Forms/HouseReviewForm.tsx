import { StarIcon } from '@heroicons/react/solid';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import agent from '../../api/agent';
import { House } from '../../models/house';
import { HouseReview } from '../../models/houseReview';
import { reviewValidationSchema } from '../../validation/reviewValidation';
import AppTextArea from './TextArea';

interface Props {
  house: House;
  handleAddReview: (review: HouseReview) => void;
}

export default function HouseReviewForm({ house, handleAddReview }: Props) {
  const [selectedRating, setSelectedRating] = useState(-1);
  const {
    control,
    setValue,
    reset,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    // defaultValues: { rating: 0, body: '' },
    mode: 'all',
    resolver: yupResolver(reviewValidationSchema),
  });

  function handleRatingChange(value: number) {
    setSelectedRating(value);
    setValue('rating', value, {
      shouldTouch: true,
      shouldDirty: true,
      shouldValidate: true,
    });
  }

  async function handleSubmitData(data: FieldValues) {
    try {
      const result = await agent.Reviews.create(house.id, data);
      handleAddReview(result);
    } catch (error) {
      console.log(error);
    } finally {
      setSelectedRating(0);
      reset({ body: '', rating: 0 });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleSubmitData)}
      className='pb-4 border-b border-b-gray-400'
    >
      <div className=' inline-flex gap-x-5 items-end py-5 w-full justify-between lg:justify-start px-5'>
        <div className='grid grid-flow-col'>
          {[0, 1, 2, 3, 4, 5].map((item, index) => (
            <button
              type='button'
              onClick={() => handleRatingChange(item)}
              className={`w-6 h-6 ${
                selectedRating >= item
                  ? 'text-sky-500 dark:text-indigo-500'
                  : 'text-slate-500'
              }  transition-all duration-300 `}
              key={index}
            >
              <StarIcon className={`h-full w-full `} />
            </button>
          ))}
        </div>
        <p className=' font-Oswald text-4xl font-thin'>
          {selectedRating >= 0 ? selectedRating : 'no rating'}
        </p>
      </div>
      <div className='flex flex-col lg:flex-row  rounded-md overflow-hidden'>
        <div className=' flex-auto '>
          <AppTextArea
            name='body'
            placeholder='Post a review'
            label='Review'
            control={control}
            rows={5}
          />
        </div>
        <input
          className={` ${
            isValid
              ? 'opacity-100 bg-sky-500 dark:bg-indigo-500 '
              : 'opacity-50 bg-sky-700 dark:bg-indigo-700'
          } text-white font-Oswald text-2xl font-thin px-5 py-1`}
          disabled={!isValid}
          type='submit'
          value={isSubmitting ? 'Please wait' : 'Post'}
        />
      </div>
    </form>
  );
}
