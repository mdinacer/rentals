import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import agent from '../../api/agent';
import { House } from '../../models/house';
import { setHouse, updateHouse } from '../../slices/housesSlice';
import { useAppDispatch } from '../../store/configureStore';
import {
  HouseEditValidationSchema,
  HouseValidationSchema,
} from '../../validation/houseValidation';
import HouseAddressForm from './HouseAddressForm';
import HouseDetailsForm from './HouseDetailsForm';
import HouseInfoForm from './HouseInfoForm';
import HouseMediaForm from './HouseMediaForm';
import HousePricesForm from './HousePricesForm';

interface Props {
  house?: House;
}

export default function HouseForm({ house }: Props) {
  const isEdit = !!house;
  const { state }: any | null = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [pageDirection, setPageDirection] = useState('next');
  const [selectedPageIndex, setSelectedPageIndex] = useState(0);
  const validationSchema = isEdit
    ? HouseEditValidationSchema
    : HouseValidationSchema;

  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchema),
  });

  const watchFile = methods.watch('cover', null);
  const watchFiles: any[] = methods.watch('images', null);

  useEffect(() => {
    if (house && !watchFile && !methods.formState.isDirty) {
      const item = {
        title: house.title,
        type: house.type,
        catchPhrase: house.catchPhrase,
        prices: house.prices,
        details: {
          area: house.details.area,
          floors: house.details.floors,
          rooms: house.details.rooms,
          beds: house.details.beds,
          baths: house.details.baths,
          kitchens: house.details.kitchens,
          gardens: house.details.gardens,
          parking: house.details.parking,
          pool: house.details.pool,
          smokingFree: house.details.smokingFree,
          petsAllowed: house.details.petsAllowed,
        },
        address: {
          province: house.address.province,
          city: house.address.city,
          address1: house.address.address1,
          address2: house.address.address2,
        },
        // images: [''],
        // cover: '',
      };
      methods.reset(item);
    }

    return () => {
      if (watchFile) URL.revokeObjectURL(watchFile.preview);
      if (watchFiles) {
        watchFiles.forEach((file: any) => {
          URL.revokeObjectURL(file.preview);
        });
      }
    };
  }, [watchFile, house, watchFiles, methods]);

  function imagesToFormData(
    images: any[],
    property: string,
    formData: FormData
  ) {
    if (Array.isArray(images) && images.length > 0) {
      images.forEach((file) => {
        formData.append(property, file);
      });
    }
  }

  // function flatten(obj: any, formData: FormData, parentKey?: any) {
  //   for (const key in obj) {
  //     const value = obj[key];

  //     if (typeof value === 'object') {
  //       console.log('object: ', value);

  //       flatten(value, formData, key);
  //     } else {
  //       if (parentKey) {
  //         formData.append(`${parentKey}.${key}`, `${value.toString()}`);
  //       } else {
  //         formData.append(`${key}`, `${value.toString()}`);
  //       }
  //     }
  //   }
  // }

  function buildFormData(formData: any, data: any, parentKey?: any) {
    if (
      data &&
      typeof data === 'object' &&
      !(data instanceof Date) &&
      !(data instanceof File)
    ) {
      Object.keys(data).forEach((key) => {
        buildFormData(
          formData,
          data[key],
          parentKey ? `${parentKey}[${key}]` : key
        );
      });
    } else {
      const value = data == null ? '' : data;

      formData.append(parentKey, value);
    }
  }

  async function handleSubmitData(data: FieldValues) {
    let from = '/houses';

    try {
      const { images, cover, ...rest } = data;
      let formData = new FormData();
      buildFormData(formData, rest);
      if (cover) {
        formData.append('cover', cover);
      }
      if (images) {
        imagesToFormData(images, 'images', formData);
      }

      let result = null;

      if (isEdit) {
        result = await agent.Houses.update(house.id, formData);
        dispatch(updateHouse({ id: result.id, changes: result }));
        console.log(result);

        from = `/houses/${result.slug}`;
      } else {
        result = await agent.Houses.create(formData);
        dispatch(setHouse(result));

        from = `/houses/${result.slug}`;
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      navigate(from);
    }
  }

  const handleSelectedPage = (pageIndex: number) => {
    switch (pageIndex) {
      case 1:
        return <HouseDetailsForm />;
      case 2:
        return <HouseAddressForm />;
      case 3:
        return <HousePricesForm />;
      case 4:
        return (
          <HouseMediaForm house={house} cover={watchFile} images={watchFiles} />
        );

      default:
        return <HouseInfoForm />;
    }
  };

  const handleNextPage = () => {
    setPageDirection('next');
    if (selectedPageIndex < pagesNames.length - 1) {
      setSelectedPageIndex((prev) => prev + 1);
    }
  };
  const handlePreviousPage = () => {
    setPageDirection('prev');
    if (selectedPageIndex > 0) {
      setSelectedPageIndex((prev) => prev - 1);
    }
  };

  const pagesNames = ['Informations', 'Details', 'Address', 'prices', 'Images'];

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSubmitData)}
        className='w-full h-full flex-1  flex lg:items-center'
      >
        <div className=' px-5 lg:px-0 lg:max-w-xl w-full mx-auto  flex flex-col h-auto lg:min-h-[50vh] flex-1 '>
          <div className='flex-auto h-auto flex items-center'>
            <AnimatePresence exitBeforeEnter>
              <motion.div
                className='overflow-hidden flex flex-col justify-center h-auto  lg:min-h-[40vh] flex-auto mb-5 '
                initial={{
                  y: pageDirection === 'next' ? 300 : -300,
                  opacity: 0,
                }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ x: pageDirection === 'prev' ? -300 : 300, opacity: 0 }}
                key={selectedPageIndex}
              >
                <p className=' font-Oswald text-4xl mb-5 uppercase'>
                  {pagesNames[selectedPageIndex]}
                </p>
                {handleSelectedPage(selectedPageIndex)}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className='w-full inline-flex justify-between items-center gap-x-5 py-2 mb-5 lg:mb-0 flex-initial'>
            {selectedPageIndex > 0 ? (
              <button
                type='button'
                onClick={handlePreviousPage}
                className={` w-full lg:w-auto cursor-pointer inline-flex items-center gap-x-2 bg-orange-500 py-1 px-5 rounded-md uppercase font-Oswald text-xl font-thin`}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15 19l-7-7 7-7'
                  />
                </svg>
                {selectedPageIndex > 0 ? 'Previous' : 'Cancel'}
              </button>
            ) : (
              <button
                type='button'
                onClick={() => navigate(state?.from?.pathname || '/houses')}
                className={`$cursor-pointer bg-red-500 py-1 rounded-md px-5 uppercase font-Oswald text-xl font-thin`}
              >
                Cancel
              </button>
            )}

            {selectedPageIndex < pagesNames.length - 1 ? (
              <button
                type='button'
                onClick={handleNextPage}
                className={`cursor-pointer w-full lg:w-auto inline-flex justify-end items-center gap-x-2 bg-teal-500 py-1 rounded-md   px-5 uppercase font-Oswald text-xl font-thin`}
              >
                Next
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M9 5l7 7-7 7'
                  />
                </svg>
              </button>
            ) : (
              <input
                className={`${
                  methods.formState.isValid
                    ? 'opacity-100 bg-teal-500 '
                    : 'opacity-50 bg-teal-800'
                } cursor-pointer  py-1 rounded-md  px-5 uppercase font-Oswald text-xl font-thin`}
                type='submit'
                value={
                  methods.formState.isSubmitting
                    ? 'Please wait'
                    : isEdit
                    ? 'Update'
                    : 'Save'
                }
              />
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
