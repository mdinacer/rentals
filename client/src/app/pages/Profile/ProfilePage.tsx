import UserCard from '../../Components/Profile/UserCard';
import UserHouses from '../../Components/Profile/UserHouses';
import { useAppSelector } from '../../store/configureStore';

export default function ProfilePage() {
  const { user } = useAppSelector((state) => state.account);

  if (!user || !user.profile) return <div>No Data</div>;
  return (
    <div className=' flex-1 bg-slate-500 '>
      <div className='container mx-auto lg:px-5 px-2 my-auto w-full h-full py-16'>
        <div className=' flex flex-col lg:flex-col '>
          {user.profile && (
            <UserCard profile={user.profile} onEdit={() => {}} />
          )}

          <div className='my-5 lg:px-10 w-full bg-slate-600 rounded-md px-5 py-5'>
            <UserHouses user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}