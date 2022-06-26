import { useEffect } from 'react';
import { houseSelectors, fetchHousesAsync } from '../slices/housesSlice';
import { useAppSelector, useAppDispatch } from '../store/configureStore';

export default function useHouses() {
  const houses = useAppSelector(houseSelectors.selectAll);
  const { housesLoaded, metaData } = useAppSelector((state) => state.houses);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!housesLoaded) {
      dispatch(fetchHousesAsync());
    }
  }, [dispatch, houses, housesLoaded]);
  return {
    houses,
    housesLoaded,
    metaData,
  };
}
