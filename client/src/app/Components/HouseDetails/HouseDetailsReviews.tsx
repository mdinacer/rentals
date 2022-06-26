import { format } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import agent from '../../api/agent';
import { House } from '../../models/house';
import { HouseReview } from '../../models/houseReview';
import {
  getAxiosPaginationParams,
  MetaData,
  PaginationParams,
} from '../../models/pagination';
import { setMetaData } from '../../slices/housesSlice';
import LoadingComponent from '../Common/LoadingComponent';
import HouseReviewForm from '../Forms/HouseReviewForm';

interface Props {
  house: House;
}

export default function HouseDetailsReviews({ house }: Props) {
  const [reviews, setReviews] = useState<HouseReview[]>([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [metaData, setmetaData] = useState<MetaData | null>(null);
  const [paginationParams, setPaginationParams] = useState<PaginationParams>({
    pageNumber: 1,
    pageSize: 5,
  });

  const fetchReviews = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        const param = getAxiosPaginationParams(paginationParams);
        const result = await agent.Reviews.list(id, param);
        setReviews(result.items);
        setMetaData(result.metaData);
        setLoaded(true);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [paginationParams]
  );

  useEffect(() => {
    if (!loading && !loaded && house && house.id) {
      fetchReviews(house.id);
    }

    // return () => {
    //   setReviews([]);
    // };
  }, []);

  if (loading) return <LoadingComponent />;
  if (loaded && !house) return <div>No Data</div>;

  return (
    <div className='   overflow-y-auto  flex flex-col overscroll-y-content lg:pr-5'>
      <div className='mb-5 flex-initial'>
        <HouseReviewForm
          house={house}
          handleAddReview={(value) => setReviews([value, ...reviews])}
        />
      </div>
      <div className='grid gap-4 grid-flow-row lg:gap-6 flex-auto'>
        {reviews.map((item, index) => (
          <HouseDetailsReviewItem key={index} review={item} />
        ))}
      </div>
    </div>
  );
}

interface ItemProps {
  review: HouseReview;
}

function HouseDetailsReviewItem({ review }: ItemProps) {
  function stringAvatar(fullName: string) {
    if (fullName) {
      const names = fullName.split(' ');
      if (names.length > 1) {
        const firstName = names[0];
        const lastName = names[1];
        return `${firstName[0]}${lastName[0]}`;
      } else {
        return fullName[0];
      }
    }
  }
  return (
    <div className='w-full min-h-[10vh] bg-gradient-to-br from-gray-200 py-2 dark:from-slate-800 dark:to-slate-900 to-gray-300   flex items-start flex-col rounded-md overflow-hidden '>
      <div className=' w-full flex flow-row justify-between items-center px-5 py-2 border-b-2 border-b-sky-500 dark:border-b-indigo-500'>
        <div className=''>
          <p className=' font-Montserrat text-xl  lg:text-2xl font-thin'>
            {review.host.fullName}
          </p>
          <div className=' inline-flex gap-x-5 font-Montserrat text-xs lg:text-base text-gray-500 dark:text-slate-300 '>
            <p className=' '>{review.host.address?.country}</p>
            <p className=' italic '>
              {format(
                new Date(review.lastUpdate || review.creationDate),
                'dd/MM/yyyy'
              )}
            </p>
          </div>
        </div>

        <div className=' inline-flex gap-x-1 items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
          </svg>
          <p className=' font-Oswald text-lg font-thin'>{review.rating}</p>
        </div>
      </div>

      {review.body && (
        <div className='lg:px-10 px-5 py-5  flex-auto '>
          <p className=' font-Montserrat text-lg max-w-5xl  dark:text-gray-300 text-gray-800'>
            {review.body}
          </p>
        </div>
      )}
    </div>
  );
}
