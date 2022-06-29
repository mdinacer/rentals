import { XIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import { House } from '../../models/house';
import { Image } from '../../models/image';
import ImageSliderItem from './ImageSliderItem';

interface Props {
  house: House;
}

export default function ImageSlider({ house }: Props) {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  return (
    <>
      <div className='relative grid grid-flow-col gap-x-3 snap-start h-full'>
        {house.images.map((image) => (
          <ImageSliderItem
            key={image.publicId}
            image={image}
            handleOnClick={(image) => setSelectedImage(image)}
          />
        ))}
      </div>
      {selectedImage && (
        <div
          className=' fixed top-0 left-0 right-0 bottom-0 h-screen w-full px-5 lg:px-10 z-20  py-20 bg-black bg-opacity-70'
          onClick={() => setSelectedImage(null)}
        >
          <div className='w-full h-full relative rounded-md overflow-hidden'>
            <img
              src={selectedImage.pictureUrl}
              alt={selectedImage.publicId}
              className=' object-cover h-full w-full overflow-hidden'
            />
            <button
              className='absolute text-white z-10 top-0 right-0 m-2 bg-black bg-opacity-70 rounded-full'
              onClick={() => setSelectedImage(null)}
            >
              <XIcon className='lg:h-16 h-8 lg:w-16 w-8' />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
