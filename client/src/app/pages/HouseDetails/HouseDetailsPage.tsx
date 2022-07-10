import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import agent from '../../api/agent';
import LoadingComponent from '../../Components/Common/LoadingComponent';
import { House } from '../../models/house';
import { useAppSelector } from '../../store/configureStore';
import { Client } from '../../layout/App';
import { HouseReview } from '../../models/houseReview';
import { Socket } from 'socket.io-client';
import { Rent } from '../../models/rent';
import { Image } from '../../models/image';
import { XIcon } from '@heroicons/react/solid';
import Layout from '../../layout/Layout';
import RentRequestForm from '../../Components/Forms/RentRequestForm';
import ImageSlider from '../../Components/Common/ImageSlider';
import HouseDetailsHeader from '../../Components/HouseDetails/HouseDetailsHeader';
import HouseDetailsPrice from '../../Components/HouseDetails/HouseDetailsPrice';
import HouseServicesList from '../../Components/HouseDetails/HouseServicesList';
import HouseDetailsSection from '../../Components/HouseDetails/HouseDetailsSection';
import HouseDetailsReviews from '../../Components/HouseDetails/HouseDetailsReviews';
import HouseDetailsList from '../../Components/HouseDetails/HouseDetailsList';

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
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

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
        <p className=' font-Secondary text-xl'>Property not found</p>
      </div>
    );
  return (
    <>
      <Layout className='bg-black flex pt-[44px] overflow-hidden '>
        <div className='flex-1 container mx-auto lg:bg-black dark:bg-black bg-gray-200 lg:p-5  flex flex-col  overflow-hidden'>
          <HouseDetailsHeader house={house} />
          <HouseDetailsPrice
            busy={loadingRequest}
            isEdit={!!activeRequest}
            price={house.price}
            onRequest={() => setOpenRequest(true)}
          />
          {house.services && (
            <div className='px-5'>
              <HouseServicesList services={house.services} />
            </div>
          )}

          <div className=' bg-gray-200 dark:bg-black  py-5 px-5 lg:px-10 flex flex-col justify-between'>
            <HouseDetailsSection title='Description' className='mt-5'>
              <p className='font-Raleway'>{house.catchPhrase}</p>
            </HouseDetailsSection>

            <HouseDetailsSection title='Gallery' className='my-5'>
              <div className='h-40 overflow-x-auto scrollbar-hide rounded-lg snap-mandatory snap-x my-5 overscroll-x-none flex justify-start'>
                <ImageSlider
                  house={house}
                  setSelectedImage={setSelectedImage}
                />
              </div>
            </HouseDetailsSection>

            <HouseDetailsSection title='More Details' className='my-5'>
              <HouseDetailsList details={house.details} />
            </HouseDetailsSection>

            <HouseDetailsSection title='Reviews'>
              <HouseDetailsReviews house={house} />
            </HouseDetailsSection>
          </div>
        </div>
      </Layout>
      {selectedImage && (
        <div
          className=' fixed top-0 left-0 right-0 bottom-0 h-screen w-full px-5 lg:px-10 z-20  overflow-auto py-10  bg-black bg-opacity-90 overscroll-none'
          onClick={() => setSelectedImage(null)}
        >
          <div className='relative  h-full w-full  overflow-auto scrollbar-hide overscroll-none rounded-lg '>
            <img
              src={selectedImage.pictureUrl}
              alt={selectedImage.publicId}
              className='absolute object-none max-w-[1920px] h-auto lg:max-w-screen-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
            />
            <button
              className='fixed text-white z-10 top-0 right-0 m-2 bg-black bg-opacity-70 rounded-full'
              onClick={() => setSelectedImage(null)}
            >
              <XIcon className='lg:h-8 h-6 lg:w-8 w-6' />
            </button>
          </div>
        </div>
      )}

      {openRequest && (
        <div
          className=' fixed top-0 left-0 right-0 bottom-0 h-screen w-full  z-20 bg-black bg-opacity-90  flex items-center justify-center'
          onClick={() => setSelectedImage(null)}
        >
          <RentRequestForm
            house={house}
            request={activeRequest}
            onClose={(value) => {
              if (value) {
                setActiveRequest(value);
              }
              setOpenRequest(false);
            }}
          />
        </div>
      )}
    </>
  );
}
