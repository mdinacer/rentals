import { UserProfile } from '../../models/profile';
import UserStats from './UserStats';

interface Props {
  profile: UserProfile;
  onEdit: () => void;
}

export default function UserCard({ profile, onEdit }: Props) {
  return (
    <div className=' dark:bg-slate-700 py-2 px-5  flex items-center rounded-md'>
      <div className=' flex flex-col lg:flex-row w-full items-center gap-y-5 lg:gap-y-0'>
        <div className=' lg:h-48 lg:w-48 rounded-md overflow-hidden  flex-initial  mx-5'>
          <img
            src={profile.image}
            alt=''
            className='object-left object-fill mx-auto '
          />
        </div>
        <div className=' flex-auto flex flex-col items-start'>
          <p className=' font-Oswald text-3xl lg:text-5xl font-thin w-full capitalize '>
            {profile.fullName}
          </p>
          <UserStats />
        </div>

        <div className='flex flex-col font-Montserrat gap-y-4 max-w-sm w-full'>
          <div className=' inline-flex items-center gap-x-3'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 dark:text-gray-400'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
              <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
            </svg>
            <p className=''>{profile.email}</p>
          </div>
          {profile.address && (
            <div className=' font-Montserrat inline-flex gap-x-3 items-center '>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6 dark:text-gray-400'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
                  clipRule='evenodd'
                />
              </svg>
              <p className=' '>
                {profile.address.country} - {profile.address.province} -{' '}
                {profile.address.city}{' '}
              </p>
            </div>
          )}
          {profile.phone && (
            <div className='inline-flex gap-x-3 items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6 dark:text-gray-400'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path d='M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z' />
              </svg>

              <span>{profile.phone}</span>
            </div>
          )}
          {profile.mobile && (
            <div className='inline-flex gap-x-3 items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6 dark:text-gray-400'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z'
                  clipRule='evenodd'
                />
              </svg>
              <span>{profile.mobile}</span>
            </div>
          )}
        </div>
      </div>

      <div className='hidden'>
        <div className=' inline-flex items-center gap-x-3'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 dark:text-gray-400'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
            <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
          </svg>
          <p className=' font-Oswald dark:text-gray-400 text-gray-500 text-lg font-thin '>
            {profile.email}
          </p>
        </div>

        <p className=' font-Oswald text-3xl lg:text-4xl font-thin capitalize lg:text-center '>
          {profile.fullName}
        </p>

        {profile.address && (
          <div className=' font-Montserrat inline-flex gap-x-3 items-center my-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 dark:text-gray-400'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
                clipRule='evenodd'
              />
            </svg>
            <p className=' '>
              {profile.address.country} - {profile.address.province} -{' '}
              {profile.address.city}{' '}
            </p>
          </div>
        )}

        <div className=' grid lg:grid-cols-2 gap-5 font-Oswald font-thin text-xl'>
          {profile.phone && (
            <div className='inline-flex gap-x-3 items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6 dark:text-gray-400'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path d='M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z' />
              </svg>

              <span>{profile.phone}</span>
            </div>
          )}
          {profile.mobile && (
            <div className='inline-flex gap-x-3 items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6 dark:text-gray-400'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z'
                  clipRule='evenodd'
                />
              </svg>
              <span>{profile.mobile}</span>
            </div>
          )}
        </div>
      </div>
      {/* <div className=' w-full flex items-center justify-center py-3 mt-5'>
        <button className='mx-auto bg-teal-500 py-1 px-5 rounded-md '>
          <span className=' font-Oswald text-xl font-thin'>Edit Profile</span>
        </button>
      </div> */}
    </div>
  );
}
