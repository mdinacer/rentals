import {
  CalendarIcon,
  MailIcon,
  PencilAltIcon,
  PhoneIcon,
} from '@heroicons/react/solid';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { UserProfile } from '../../models/profile';

interface Props {
  owner: UserProfile;
  isOwner: boolean;
  slug: string;
  isEdit?: boolean;
  loadingRequest?: boolean;
  onRequest: () => void;
}

export default function HouseOwnerDetails({
  owner,
  slug,
  isEdit = false,
  isOwner = false,
  loadingRequest = false,
  onRequest,
}: Props) {
  const { t } = useTranslation('shared');
  return (
    <div className='flex flex-col lg:flex-row justify-start items-center lg:mb-5'>
      <div className='border-4 border-black rounded-xl overflow-hidden mb-2 lg:mb-0  my-auto'>
        <img
          src={owner.image}
          alt=''
          className=' object-cover object-center  h-16 w-16'
        />
      </div>

      <div className='px-2 lg:px-5  '>
        <p className=' font-Oswald text-2xl lg:text-3xl font-thin'>
          {owner.fullName}
        </p>
        <p className=' font-Montserrat text-base text-center lg:text-left text-gray-400'>
          {t('property_owner')}
        </p>
      </div>

      <div className='lg:ml-auto flex flex-row justify-evenly gap-x-3 mt-4 lg:mt-0'>
        {owner.mobile && (
          <a
            title='Call owner'
            href={`tel:${owner.mobile}`}
            className='inline-flex items-center gap-x-2 px-3 border border-gray-400 dark:border-slate-500 p-2   hover:bg-black hover:text-white transition-all duration-200'
          >
            <PhoneIcon className='h-6 w-6' />
            {/* <p className='hidden lg:block font-Montserrat text-base capitalize'>
              {t('call')}
            </p> */}
          </a>
        )}
        {owner.email && (
          <a
            title='Mail owner'
            href={`mailto:${owner.email}`}
            className='inline-flex items-center gap-x-2 px-3 border border-gray-400 dark:border-slate-500 p-2   hover:bg-black hover:text-white transition-all duration-200'
          >
            <MailIcon className='h-6 w-6' />
            {/* <p className='hidden lg:block font-Montserrat text-base capitalize'>
              {t('mail')}
            </p> */}
          </a>
        )}

        {owner && !isOwner && (
          <button
            onClick={onRequest}
            title='Book a rent date'
            className='inline-flex items-center gap-x-2 px-3 border border-green-600 hover:bg-green-500 text-green-500 hover:text-white transition-all duration-200'
          >
            <CalendarIcon className='h-6 w-6' />
            <p className='hidden lg:block  capitalize'>
              {loadingRequest
                ? t('loading')
                : isEdit
                ? t('pending')
                : t('request')}
            </p>
          </button>
        )}

        {isOwner && (
          <Link
            to={`/houses/edit/${slug}`}
            title='Edit house'
            className='inline-flex items-center gap-x-2 px-3 border border-orange-600 text-orange-600 hover:bg-orange-500 hover:text-white transition-all duration-200'
          >
            <PencilAltIcon className='h-6 w-6' />
            {/* <p className='hidden lg:block font-Montserrat text-base capitalize'>
              {t('edit')}
            </p> */}
          </Link>
        )}
      </div>
    </div>
  );
}
