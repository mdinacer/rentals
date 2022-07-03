import {
  DeviceMobileIcon,
  LocationMarkerIcon,
  MailIcon,
  PhoneIcon,
} from '@heroicons/react/solid';
import { UserProfile } from '../../models/profile';

interface Props {
  profile: UserProfile;
  onEdit: () => void;
}

export default function UserCard({ profile, onEdit }: Props) {
  return (
    <div className=' dark:bg-slate-700  px-10  flex items-center rounded-md'>
      <div className=' flex flex-col lg:flex-row w-full items-center gap-y-5 lg:gap-y-0'>
        <div className=' lg:h-48 lg:w-48 h-32 w-32 rounded-full border-2 border-black  overflow-hidden mr-5'>
          <img
            src={profile.image}
            alt=''
            className='object-center lg:h-48 lg:w-48 h-32 w-32 object-fill  '
          />
        </div>

        <div className='flex flex-col font-Montserrat gap-y-4 max-w-sm w-full'>
          <p className=' font-Oswald text-3xl lg:text-4xl font-thin w-full capitalize '>
            {profile.fullName}
          </p>
          <div className=' inline-flex items-center gap-x-3'>
            <MailIcon className='h-6 w-6 dark:text-gray-400' />
            <p className=''>{profile.email}</p>
          </div>
          {profile.address && (
            <div className=' font-Montserrat inline-flex gap-x-3 items-center '>
              <LocationMarkerIcon className='h-6 w-6 dark:text-gray-400' />
              <p className=' '>
                {profile.address.country} - {profile.address.province} -{' '}
                {profile.address.city}{' '}
              </p>
            </div>
          )}
          {profile.phone && (
            <div className='inline-flex gap-x-3 items-center'>
              <PhoneIcon className='h-6 w-6 dark:text-gray-400' />

              <span>{profile.phone}</span>
            </div>
          )}
          {profile.mobile && (
            <div className='inline-flex gap-x-3 items-center'>
              <DeviceMobileIcon className='h-6 w-6 dark:text-gray-400' />
              <span>{profile.mobile}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
