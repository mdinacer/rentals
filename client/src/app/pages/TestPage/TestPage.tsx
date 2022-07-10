import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import agent from '../../api/agent';
import { House } from '../../models/house';
import { Image } from '../../models/image';
import { useAppSelector } from '../../store/configureStore';

export default function TestPage() {
  const { user } = useAppSelector((state) => state.account);
  const { slug } = useParams<{ slug: string }>();
  const [loading, setLoading] = useState(true);
  const [house, setHouse] = useState<House | undefined>(undefined);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  const fetchHouse = useCallback(
    async (slug: string) => {
      try {
        setLoading(true);
        const result = await agent.Houses.details(slug);
        const isOwner = result?.owner.id === user?.id;
        setHouse({ ...result, isOwner });
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

  if (!house) return <div>No data</div>;
  return <div></div>;
}
