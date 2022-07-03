import { UserProfile } from '../../models/profile';

interface Props {
  profile: UserProfile;
  title: string;
}

export default function PersonDetails({ profile, title }: Props) {
  return (
    <div>
      <p className=' font-Oswald text-2xl uppercase opacity-70 font-thin mb-3 border-b dark:border-b-white'>
        {title}
      </p>
      <div className=' flex flex-row gap-x-5'>
        <div className='h-full w-[120px] rounded-md overflow-hidden hidden lg:block'>
          <img
            src={profile.image}
            alt={profile.fullName}
            className=' object-cover object-center h-full w-full'
          />
        </div>
        <div className='flex-auto flex flex-col gap-y-1 justify-center'>
          <p className=' font-Oswald text-3xl font-thin'>{profile.fullName}</p>
          <p className=' font-Oswald font-thin text-base'>
            {profile.address?.country}
            {', '}
            {profile.address?.province}
            {', '}
            {profile.address?.city}
          </p>
          <p className=' font-Montserrat text-base'>{profile.mobile}</p>
          <p className=' font-Montserrat text-base'>{profile.email}</p>
        </div>
      </div>
    </div>
  );
}
