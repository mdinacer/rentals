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
  const [selectedRating, setSelectedRating] = useState(0);
  const {
    control,
    setValue,
    reset,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
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
    <div>
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
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className={`h-full w-full `}
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                </svg>
              </button>
            ))}
          </div>
          <p className=' font-Oswald text-4xl font-thin'>{selectedRating}</p>
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
    </div>
  );
}
