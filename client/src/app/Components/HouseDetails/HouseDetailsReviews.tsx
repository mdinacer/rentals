import { StarIcon } from '@heroicons/react/solid';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { House } from '../../models/house';
import { HouseReview } from '../../models/houseReview';
import { useAppSelector } from '../../store/configureStore';
import HouseReviewForm from '../Forms/HouseReviewForm';

interface Props {
  house: House;
  reviews: HouseReview[];
}

export default function HouseDetailsReviews({ house, reviews = [] }: Props) {
  const { user } = useAppSelector((state) => state.account);

  const reviewed = user && reviews.some((review) => review.host === user.id);

  return (
    <div className='overflow-y-auto  flex flex-col overscroll-y-content lg:pr-5'>
      {user && !house.isOwner && !reviewed && (
        <div className='mb-5 flex-initial'>
          <HouseReviewForm house={house} handleAddReview={(value) => {}} />
        </div>
      )}
      <div className='grid gap-4 grid-flow-row lg:gap-6 flex-auto'>
        {reviews.map((item, index) => (
          <HouseDetailsReviewItem key={index} review={item} userId={user?.id} />
        ))}
      </div>
    </div>
  );
}

interface ItemProps {
  review: HouseReview;
  userId?: string;
}

function HouseDetailsReviewItem({ review, userId = '' }: ItemProps) {
  const isOwner = userId === review.host;
  return (
    <motion.div
      layout
      className='w-full min-h-[10vh] bg-gradient-to-br from-gray-100 py-2 dark:from-slate-800 dark:to-slate-800 to-gray-200   flex items-start flex-col rounded-md overflow-hidden '
    >
      <div className=' w-full flex flow-row justify-between items-center px-5 py-2 border-b-2 border-b-gray-500 '>
        <div className=''>
          <p className=' font-Montserrat text-xl  lg:text-2xl font-thin'>
            {review.hostName}
          </p>
          <div className=' inline-flex gap-x-5 font-Montserrat text-xs lg:text-base text-gray-500 dark:text-slate-300 '>
            {/* <p className=' '>{review.host.address?.country}</p> */}
            <p className=' italic '>
              {format(
                new Date(review.lastUpdate || review.creationDate),
                'dd/MM/yyyy'
              )}
            </p>
          </div>
        </div>

        <div className=' inline-flex gap-x-1 items-end'>
          <StarIcon
            className={`h-8 w-8 ${
              isOwner ? 'text-sky-500 dark:text-indigo-500' : 'text-inherit'
            }`}
          />
          <p className=' font-Oswald text-3xl font-thin'>{review.rating}</p>
        </div>
      </div>

      {review.body && (
        <div className='lg:px-10 px-5 py-5  flex-auto '>
          <p className=' font-Montserrat text-lg max-w-5xl  dark:text-gray-300 text-gray-800'>
            {review.body}
          </p>
        </div>
      )}
    </motion.div>
  );
}
