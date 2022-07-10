import { House } from '../../models/house';
import { Image } from '../../models/image';
import ImageSliderItem from './ImageSliderItem';

interface Props {
  house: House;
  setSelectedImage: (image: Image) => void;
}

export default function ImageSlider({ house, setSelectedImage }: Props) {
  return (
    <>
      <div className='relative grid grid-flow-col  snap-start h-full'>
        {house.images.map((image) => (
          <ImageSliderItem
            key={image.publicId}
            image={image}
            handleOnClick={(image) => setSelectedImage(image)}
          />
        ))}
      </div>
    </>
  );
}
