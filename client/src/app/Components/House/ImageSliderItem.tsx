import { Image } from '../../models/image';

interface Props {
  image: Image;
  handleOnClick: (image: Image) => void;
}

export default function ImageSliderItem({ image, handleOnClick }: Props) {
  return (
    <div
      onClick={() => handleOnClick(image)}
      className='h-[30vh] lg:w-[40vw] w-[80vw] overflow-hidden rounded-md snap-center lg:hover:drop-shadow-md'
    >
      <img
        src={image.pictureUrl}
        alt={image.publicId}
        className=' object-cover h-full w-full overflow-hidden'
      />
    </div>
  );
}
