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

export default function HouseDetails() {
  const { user } = useAppSelector((state) => state.account);
  const { slug } = useParams<{ slug: string }>();
  const [house, setHouse] = useState<House | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  const fetchHouse = useCallback(
    async (slug: string) => {
      try {
        setLoading(true);
        const result = await agent.Houses.details(slug);
        const isHouseOwner = result?.owner.id === user?.id;
        setIsOwner(isHouseOwner);
        setHouse(result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [user?.id]
  );

  useEffect(() => {
    if (slug) {
      fetchHouse(slug);
    }
    return () => {
      setHouse(undefined);
    };
  }, [fetchHouse, slug]);

  if (loading)
    return <LoadingComponent message='Loading House details, please wait...' />;
  if (!house)
    return (
      <div className='py-20 w-screen h-screen bg-slate-300 flex items-center justify-center'>
        <p className=' font-Montserrat text-xl'>
          Cant find the requested offer
        </p>
      </div>
    );
  return (
    <div className='relative flex-1 w-full select-none lg:py-5 bg-black'>
      <div className='container mx-auto  my-auto h-full  rounded-md overflow-hidden'>
        <HouseDetailsHeader house={house} />

        <div className='bg-black'>
          <div className=' w-full bg-white  overflow-hidden dark:bg-[#222831] flex flex-col gap-y-5 lg:rounded-t-3xl  min-h-[50vh] lg:-translate-y-[3vh] py-10 lg:py-10 lg:px-10 px-5'>
            <HouseOwnerDetails
              slug={slug!}
              isOwner={isOwner}
              owner={house.owner}
            />

            <div className=' overflow-x-auto scrollbar-hide w-full max-w-[100vw]'>
              <HouseDetailsList
                houseType={house.type}
                houseDetails={house.details}
              />
            </div>

            <HouseDetailsSection title='Description' className='py-3'>
              <p className=' font-Montserrat'>{house.catchPhrase}</p>
            </HouseDetailsSection>
            <HouseDetailsSection title='Prices' className='py-5'>
              <HouseDetailsPrices prices={house.prices} />
            </HouseDetailsSection>
            <HouseDetailsSection title='Photos' className=' overscroll-x-none'>
              <div className=' w-full max-w-[100vw] rounded-md overflow-auto max-h-[40vh] snap-x snap-mandatory overscroll-x-none scrollbar-hide'>
                <ImageSlider house={house} />
              </div>
            </HouseDetailsSection>

            <HouseDetailsSection
              title='Reviews'
              className='py-5 dark:lg:bg-transparent rounded-md '
            >
              <HouseDetailsReviews house={house} />
            </HouseDetailsSection>
          </div>
        </div>
      </div>
    </div>
  );
}
