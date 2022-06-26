import HouseForm from '../../Components/Forms/HouseForm';
import { signInUser } from '../../slices/accountSlice';
import { useAppDispatch, useAppSelector } from '../../store/configureStore';

export default function HomePage() {
  const { user } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();

  const login = async () => {
    try {
      await dispatch(
        signInUser({
          email: 'mdi.nacer@outlook.com',
          password: 'Pa$$w0rd',
        })
      );
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className='flex-1  w-full  bg-sky-500 dark:bg-indigo-500 text-white'>
      in construction
      <div className='container mx-auto px-5 flex-1 flex items-center justify-center h-full'>
        <p className=' font-Oswald text-5xl'>
          If you don’t like where you are, move. You are not a tree.
        </p>
      </div>
    </div>
  );
}
