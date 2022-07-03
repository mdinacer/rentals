import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import agent from '../../api/agent';
import LoadingComponent from '../../Components/Common/LoadingComponent';
import ImageSlider from '../../Components/House/ImageSlider';
import HouseDetailsHeader from '../../Components/HouseDetails/HouseDetailsHeader';
import { House } from '../../models/house';
import HouseOwnerDetails from '../../Components/HouseDetails/HouseOwnerDetails';
import HouseDetailsList from '../../Components/HouseDetails/HouseDetailsList';
import HouseDetailsSection from '../../Components/HouseDetails/HouseDetailsSection';
import HouseDetailsPrices from '../../Components/HouseDetails/HouseDetailsPrices';
import HouseDetailsReviews from '../../Components/HouseDetails/HouseDetailsReviews';
import { useAppSelector } from '../../store/configureStore';
import { Client } from '../../layout/App';
import { HouseReview } from '../../models/houseReview';
import { Socket } from 'socket.io-client';
import RentRequestForm from '../../Components/Forms/RentRequestForm';
import { Rent } from '../../models/rent';
import { useTranslation } from 'react-i18next';

export default function HouseDetails() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { user } = useAppSelector((state) => state.account);
  const { slug } = useParams<{ slug: string }>();
  const [house, setHouse] = useState<House | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<HouseReview[]>([]);
  const [openRequest, setOpenRequest] = useState(false);
  const [activeRequest, setActiveRequest] = useState<Rent | undefined>(
    undefined
  );
  const [loadingRequest, setLoadingRequest] = useState(false);
  const { t } = useTranslation('house_details_page');

  const fetchHouse = useCallback(
    async (slug: string) => {
      try {
        setLoading(true);
        const result = await agent.Houses.details(slug);
        const isOwner = result?.owner.id === user?.id;
        setHouse({ ...result, isOwner });
        setReviews(result.reviews);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [user?.id]
  );

  const fetchActiveRequest = useCallback(async (houseId: string) => {
    try {
      setLoadingRequest(true);
      const result = await agent.Rents.getActiveRequest(houseId);

      setActiveRequest(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingRequest(false);
    }
  }, []);

  useEffect(() => {
    if (slug) {
      fetchHouse(slug);
    }
    return () => {
      setHouse(undefined);
    };
  }, [fetchHouse, slug]);

  useEffect(() => {
    if (house && !house.isOwner) {
      fetchActiveRequest(house.id);
    }

    return () => {
      setActiveRequest(undefined);
    };
  }, [fetchActiveRequest, house]);

  const handleNewReview = useCallback(
    (review: HouseReview) => {
      setReviews([review, ...reviews]);
    },
    [reviews]
  );

  const connectSocket = useCallback(() => {
    if (socket && slug) {
      socket.emit('joinPage', {
        name: user?.username || socket.id,
        room: slug,
      });

      socket.on('addReview', handleNewReview);
    }
  }, [handleNewReview, slug, socket, user?.username]);

  useEffect(() => {
    if (socket) {
      connectSocket();
    }
    return () => {
      socket?.emit('leavePage', {
        room: slug,
      });
    };
  }, [connectSocket, slug, socket]);

  useEffect(() => {
    if (Client.socket) {
      setSocket(Client.socket);
    }

    return () => {
      Client.socket?.emit('leavePage', {
        room: slug,
      });
    };
  }, [slug, socket]);

  if (loading)
    return <LoadingComponent message='Loading House details, please wait...' />;
  if (!house)
    return (
      <div className='py-20 w-screen h-screen bg-slate-300 flex items-center justify-center'>
        <p className=' font-Montserrat text-xl'>{t('notfound')}</p>
      </div>
    );
  return (
    <div className='relative flex-1 w-full select-none lg:py-5 bg-black lg:pt-[45px]'>
      <div className='container mx-auto  my-auto h-full  rounded-md overflow-hidden'>
        <HouseDetailsHeader house={house} />

        <div className='bg-black'>
          <div className=' w-full bg-white  overflow-hidden dark:bg-gradient-to-b dark:bg-black flex flex-col  lg:rounded-t-3xl  min-h-[50vh] lg:-translate-y-[3vh] py-10 lg:py-10 lg:px-0 px-0'>
            <div className='px-10 mb-5'>
              <HouseOwnerDetails
                slug={slug!}
                isOwner={house.isOwner}
                owner={house.owner}
                onRequest={() => setOpenRequest(true)}
                isEdit={!!activeRequest}
                loadingRequest={loadingRequest}
              />
            </div>

            <HouseDetailsSection
              title={t('description')}
              className=' py-5 lg:px-10 px-5 mb-5'
            >
              <p className=' font-Montserrat text-lg'>{house.catchPhrase}</p>
            </HouseDetailsSection>

            <HouseDetailsSection
              title={t('details')}
              className=' overflow-x-auto overscroll-none scrollbar-hide snap-x snap-mandatory bg-gray-900 lg:px-10 px-5 py-5 dark:bg-gray-800 lg:bg-gray-200 lg:dark:bg-gray-800 shadow-inner  lg:text-inherit text-white'
            >
              <HouseDetailsList houseDetails={house.details} />
            </HouseDetailsSection>

            <HouseDetailsSection
              title={t('prices')}
              className='py-5 bg-gray-800 lg:bg-inherit dark:bg-gray-900 lg:dark:bg-gray-900 lg:text-inherit   text-white lg:px-10 px-5'
            >
              <HouseDetailsPrices prices={house.prices} />
            </HouseDetailsSection>

            <HouseDetailsSection
              title={t('photos')}
              className=' overscroll-x-none lg:px-10 px-5 py-5 my-5'
            >
              <div className=' w-full max-w-[100vw] rounded-md overflow-auto max-h-[40vh] snap-x snap-mandatory overscroll-x-none scrollbar-hide'>
                <ImageSlider house={house} />
              </div>
            </HouseDetailsSection>

            <HouseDetailsSection
              title={t('reviews')}
              className='py-5 lg:px-10 px-5'
            >
              <HouseDetailsReviews house={house} reviews={reviews} />
            </HouseDetailsSection>
          </div>
        </div>
      </div>
      {openRequest && (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-20 bg-black bg-opacity-70 flex items-center lg:justify-center'>
          <RentRequestForm
            request={activeRequest}
            house={house}
            onClose={(value) => {
              if (value) {
                setActiveRequest(value);
              }
              setOpenRequest(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
