import { StarIcon } from '@heroicons/react/solid';
import { House } from '../../models/house';
import { HouseReview } from '../../models/houseReview';
import { useAppSelector } from '../../store/configureStore';
import HouseReviewForm from '../Forms/HouseReviewForm';

interface Props {
  house: House;
}

export default function HouseDetailsReviews({ house }: Props) {
  const { user } = useAppSelector((state) => state.account);
  const reviewed =
    user && house.reviews.some((review) => review.host === user.id);
  return (
    <div className='w-full'>
      {!(house.isOwner || reviewed) && (
        <HouseReviewForm house={house} handleAddReview={(review) => {}} />
      )}

      {house.reviews.length > 0 ? (
        <div className='grid gap-y-5'>
          {house.reviews.map((review: HouseReview, index) => (
            <div key={index} className='w-full py-3 '>
              <div className='w-full flex flow-row justify-between'>
                <p className=' font-Primary text-2xl font-thin'>
                  {review.hostName}
                </p>

                <div className=' inline-flex gap-x-1 items-center'>
                  <StarIcon className='h-5 w-5' />
                  <p className=' font-Primary text-lg font-thin'>
                    {review.rating}
                  </p>
                </div>
              </div>
              <p className=' font-Raleway'>{review.body}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className='px-5 lg:px-10 p-5'>
          <p className=' font-Primary text-lg opacity-50 font-thin uppercase text-center'>
            No reviews
          </p>
        </div>
      )}
    </div>
  );
}
