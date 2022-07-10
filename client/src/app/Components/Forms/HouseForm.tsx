import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon,
} from '@heroicons/react/solid';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import agent from '../../api/agent';
import { House } from '../../models/house';
import { setHouse, updateHouse } from '../../slices/housesSlice';
import { useAppDispatch } from '../../store/configureStore';
import { buildFormData } from '../../util/formData';
import {
  HouseEditValidationSchema,
  HouseValidationSchema,
} from '../../validation/houseValidation';
import HouseAddressForm from './HouseAddressForm';
import HouseDetailsForm from './HouseDetailsForm';
import HouseInfoForm from './HouseInfoForm';
import HouseMediaForm from './HouseMediaForm';
import HousePricesForm from './HousePricesForm';
import HouseServicesForm from './HouseServicesForm';

interface Props {
  house?: House;
}

export default function HouseForm({ house }: Props) {
  const isEdit = !!house;
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
        area: house.area,
        catchPhrase: house.catchPhrase,
        price: house.price,
        details: house.details,
        services: house.services,
        address: house.address,
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

  async function handleSubmitData(data: FieldValues) {
    let from = '/houses';
    console.log(data);

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
        return <HouseServicesForm />;
      case 3:
        return <HouseAddressForm />;
      case 4:
        return <HousePricesForm />;
      case 5:
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

  const pagesNames = [
    'Informations',
    'Details',
    'Services',
    'Addresses',
    'Price',
    'Images',
  ];

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSubmitData)}
        className='relative w-full h-full flex-1  flex lg:items-center'
      >
        <button
          type='button'
          title='close'
          className='absolute top-0 right-0  p-2 opacity-50 hover:opacity-100'
          onClick={() => navigate(house ? `/houses/${house.slug}` : '/houses')}
        >
          <XIcon className='w-6 h-6' />
        </button>
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
                <p className=' font-Primary text-4xl mb-5 uppercase'>
                  {pagesNames[selectedPageIndex]}
                </p>
                {handleSelectedPage(selectedPageIndex)}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className='w-full inline-flex justify-between items-center gap-x-5 py-2 mb-5 lg:mb-0 flex-initial text-white'>
            {selectedPageIndex > 0 ? (
              <button
                type='button'
                onClick={handlePreviousPage}
                className={` w-full lg:w-auto cursor-pointer inline-flex items-center gap-x-2 bg-orange-500 py-1 px-5 rounded-md uppercase font-Primary text-xl font-thin`}
              >
                <ChevronLeftIcon className='h-6 w-6' />
                Previous
              </button>
            ) : (
              <button
                type='button'
                onClick={() =>
                  navigate(house ? `/houses/${house.slug}` : '/houses')
                }
                className={`$cursor-pointer bg-red-500 py-1 rounded-md px-5 uppercase font-Primary text-xl font-thin`}
              >
                Cancel
              </button>
            )}

            {selectedPageIndex < pagesNames.length - 1 ? (
              <button
                type='button'
                onClick={handleNextPage}
                className={`cursor-pointer w-full lg:w-auto inline-flex justify-end items-center gap-x-2 bg-sky-500 dark:bg-indigo-500 py-1 rounded-md   px-5 uppercase font-Primary text-xl font-thin`}
              >
                Next
                <ChevronRightIcon className='h-6 w-6' />
              </button>
            ) : (
              <input
                className={`${
                  methods.formState.isValid
                    ? 'opacity-100 bg-sky-500 dark:bg-indigo-500 '
                    : 'opacity-50 bg-sky-800 dark:bg-indigo-800'
                } cursor-pointer  py-1 rounded-md  px-5 uppercase font-Primary text-xl font-thin`}
                type='submit'
                disabled={!methods.formState.isValid}
                value={
                  methods.formState.isSubmitting ||
                  methods.formState.isValidating
                    ? 'Wait'
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
