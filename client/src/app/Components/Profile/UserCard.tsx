import {
  DeviceMobileIcon,
  LocationMarkerIcon,
  MailIcon,
  PencilAltIcon,
  PhoneIcon,
} from '@heroicons/react/solid';
import { UserProfile } from '../../models/profile';

interface Props {
  profile: UserProfile;
  onEdit: () => void;
}

export default function UserCard({ profile, onEdit }: Props) {
  return (
    <div className='relative flex items-center  py-5 px-5 lg:px-10 rounded-lg drop-shadow-md mx-auto bg-white dark:bg-gray-800'>
      <div className=' flex flex-col lg:flex-row gap-x-10  items-center gap-y-5 lg:gap-y-0'>
        <div className='  h-32 w-32 rounded-full overflow-hidden  my-auto flex-initial'>
          <img
            src={profile.image}
            alt=''
            className='object-center  h-32 w-32 object-cover  rounded-full  '
          />
        </div>

        <div className='flex flex-col font-Secondary  text-base gap-y-3  flex-auto'>
          <p className=' font-Primary text-3xl font-thin w-full capitalize  mb-5 '>
            {profile.fullName}
          </p>
          {profile.address && (
            <div className='  inline-flex gap-x-3 items-center '>
              <LocationMarkerIcon className='h-5 w-5 dark:text-gray-400' />
              <p className=' '>
                {profile.address.country} - {profile.address.province} -{' '}
                {profile.address.city}{' '}
              </p>
            </div>
          )}

          <div className=' inline-flex items-center gap-x-3'>
            <MailIcon className='h-5 w-5 dark:text-gray-400' />
            <p className=''>{profile.email}</p>
          </div>

          {profile.phone && (
            <div className='inline-flex gap-x-3 items-center'>
              <PhoneIcon className='h-5 w-5 dark:text-gray-400' />

              <span>{profile.phone}</span>
            </div>
          )}
          {profile.mobile && (
            <div className='inline-flex gap-x-3 items-center'>
              <DeviceMobileIcon className='h-5 w-5 dark:text-gray-400' />
              <span>{profile.mobile}</span>
            </div>
          )}
        </div>

        <div className=' flex-initial self-end'>
          <button
            onClick={onEdit}
            className=' p-2 bg-gray-900 rounded-full text-white font-Primary text-lg font-thin'
          >
            <PencilAltIcon className='h-6 w-6' />
          </button>
        </div>
      </div>
    </div>
  );
}
