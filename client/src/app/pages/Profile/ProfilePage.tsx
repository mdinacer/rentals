import {
  DocumentReportIcon,
  HomeIcon,
  UserCircleIcon,
} from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import UserForm from '../../Components/Forms/UserForm';
import UserCard from '../../Components/Profile/UserCard';
import UserOperations from '../../Components/Profile/UserOperations';
import Layout from '../../layout/Layout';
import { UserProfile } from '../../models/profile';
import { setUser } from '../../slices/accountSlice';
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import UserHouses from './UserHouses';

const pages = [
  { title: 'Profile', icon: <UserCircleIcon className='h-6 w-6' /> },
  { title: 'Properties', icon: <HomeIcon className='h-6 w-6' /> },
  { title: 'Operations', icon: <DocumentReportIcon className='h-6 w-6' /> },
];

export default function ProfilePage() {
  const [selectedPage, setSelectedPage] = useState(0);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.account);
  const [isEdit, setIsEdit] = useState(false);

  function handleOnFormClose(profile?: UserProfile | null) {
    if (profile) {
      dispatch(setUser({ ...user, profile }));
    }
    setIsEdit(false);
  }

  useEffect(() => {
    if (!user?.profile) {
      setIsEdit(true);
    }
  }, [user]);

  const handlePage = (index: number) => {
    switch (index) {
      case 1:
        return <UserHouses />;

      case 2:
        return <UserOperations />;

      default:
        return (
          <div className='flex flex-1 items-center justify-center w-full h-full'>
            <UserCard profile={user!.profile} onEdit={() => setIsEdit(true)} />
          </div>
        );
    }
  };

  if (!user) return <div>No Data</div>;

  return (
    <>
      {user && user.profile && (
        <Layout className='h-full flex-1 dark:bg-slate-500 w-full flex '>
          <div className='container mx-auto lg:px-5  flex flex-col py-10'>
            {/* <UserCard profile={user.profile} onEdit={() => setIsEdit(true)} /> */}

            <div className=' grid grid-cols-3 mx-auto gap-x-0 my-5 px-5'>
              {pages.map((page, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedPage(index)}
                  className={` first:rounded-l-md last:rounded-r-md flex flex-col lg:flex-row gap-x-2 items-center  border  border-black px-5 py-1 transition-all duration-300 ${
                    index === selectedPage
                      ? ' bg-gradient-to-br dark:from-indigo-500 dark:to-indigo-600 dark:shadow-indigo-600 from-yellow-300 to-yellow-500 shadow-yellow-500 shadow-lg  opacity-100'
                      : 'bg-inherit  dark:bg-indigo-900 bg-gray-400 text-inherit opacity-50  '
                  }`}
                >
                  <div>{page.icon}</div>
                  <p className='font-Primary uppercase font-thin text-base'>
                    {page.title}
                  </p>
                </button>
              ))}
            </div>

            {handlePage(selectedPage)}
          </div>
        </Layout>
      )}
      {(isEdit || !user.profile) && (
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-90 flex items-start lg:items-center overflow-y-auto py-20 lg:py-0'>
          <div className='container mx-auto lg:px-5'>
            <UserForm onClose={handleOnFormClose} user={user} />
          </div>
        </div>
      )}
    </>
  );
}
