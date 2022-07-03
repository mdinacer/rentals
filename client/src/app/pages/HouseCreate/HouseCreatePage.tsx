import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import agent from '../../api/agent';
import LoadingComponent from '../../Components/Common/LoadingComponent';
import HouseForm from '../../Components/Forms/HouseForm';
import Layout from '../../layout/Layout';
import { House } from '../../models/house';

export default function HouseCreatePage() {
  const { slug } = useParams<{ slug: string }>();
  const [house, setHouse] = useState<House | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const fetchHouse = useCallback(async (slug: string) => {
    try {
      setLoading(true);
      const result = await agent.Houses.details(slug);
      setHouse(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (slug) {
      fetchHouse(slug);
    }
    return () => {
      setHouse(undefined);
    };
  }, [slug]);

  if (loading && !house) return <LoadingComponent />;

  return (
    <Layout className='w-full  flex-1 flex  '>
      <div className='  lg:max-w-m w-full mx-auto  lg:px-5 flex-1 flex  items-stretch lg:items-center justify-center'>
        <HouseForm house={house} />
      </div>
    </Layout>
  );
}
