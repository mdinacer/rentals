import { Control, FieldValues, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { House } from '../../models/house';
import MediaDropZone from './MediaDropZone';

export interface HouseMediaProps {
  house?: House;
  cover: any;
  images: any[];
}

export default function HouseMediaForm({
  house,
  cover,
  images,
}: HouseMediaProps) {
  const { control } = useFormContext();
  const { t } = useTranslation(['house_images_form']);
  return (
    <div className='flex flex-col gap-4 '>
      <div className='flex flex-col w-full bg-gray-200 dark:bg-slate-600  border-b-4 border-b-teal-500'>
        <p className=' font-Oswald text-xl font-thin px-5 py-2'>{t('cover')}</p>
        {(cover || house) && (
          <div className='flex items-center  h-auto w-full '>
            {cover ? (
              <img
                className='rounded-md w-full h-52 object-cover object-center max-h-[200px]'
                src={cover.preview}
                alt='preview'
              />
            ) : (
              <img
                className=' object-cover object-center max-h-[200px] mx-auto w-full'
                src={house?.cover.pictureUrl}
                alt={house?.cover.pictureUrl}
              />
            )}
          </div>
        )}
        <MediaDropZone multiFiles={false} control={control} name='cover' />
      </div>

      <div className='flex flex-col w-full bg-gray-200 dark:bg-slate-600 border-b-4 border-b-teal-500'>
        <p className=' font-Oswald text-xl font-thin px-5 py-2 capitalize'>
          {t('images')}
        </p>
        {(images || house) && (
          <div className=' w-full overflow-y-auto '>
            {images ? (
              <div className='grid grid-cols-4 gap-4'>
                {images.map((image, index) => (
                  <div
                    key={index}
                    className=' h-32 w-full rounded-md overflow-hidden'
                  >
                    <img
                      className='w-full object-cover object-center max-h-[200px]'
                      src={image.preview}
                      alt='preview'
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className='grid grid-cols-3 gap-2 px-2'>
                {house?.images.map((image, index) => (
                  <img
                    key={index}
                    className=' object-auto w-auto object-center h-full max-h-[200px] rounded-md'
                    src={image.pictureUrl}
                    alt={house?.slug}
                  />
                ))}
              </div>
            )}
          </div>
        )}
        <MediaDropZone multiFiles={true} control={control} name='images' />
      </div>
    </div>
  );
}
