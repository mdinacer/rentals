import { MenuAlt3Icon, UserIcon, XIcon } from '@heroicons/react/solid';

import { LogoutIcon } from '@heroicons/react/outline';
import {
  AnimatePresence,
  motion,
  useTransform,
  useViewportScroll,
} from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signOut } from '../../slices/accountSlice';
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import useMediaQuery from '../../util/mediaQuery';
import { useTranslation } from 'react-i18next';

const logo = 'Kiraa';

export default function Header() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.account);
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { scrollYProgress } = useViewportScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0.2, 1]);

  const { t } = useTranslation('header');

  const links = [
    { title: t('home_link'), path: '/' },
    { title: t('browse_link'), path: '/houses' },
    { title: t('about_link'), path: '/about' },
    { title: t('contact_link'), path: '/contact' },
  ];
  const loginElement = { title: t('login_link'), path: '/account/login' };
  const logoutElement = { title: t('logout_link'), path: '/' };

  useEffect(() => {
    if (!isMobile && open) {
      setOpen(false);
    }
  }, [isMobile, open]);

  return (
    <nav className='w-screen h-auto    fixed z-10 top-0 left-0 py-1 text-white flex items-center justify-between drop-shadow-md'>
      <motion.div
        style={{ opacity: opacity }}
        className='absolute top-0 left-0 right-0 bottom-0 bg-slate-900'
      />

      <div className='w-full xl:container  px-5 mx-auto flex items-center justify-between relative'>
        <Link to={'/'}>
          <p className=' font-Oswald text-3xl'>{logo}</p>
        </Link>

        {!isMobile && (
          <ul className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 list-none flex flex-row gap-x-5 items-center '>
            {links.map((link, index) => (
              <li
                key={index}
                className={`${
                  pathname === link.path
                    ? ' opacity-100 font-bold'
                    : 'text-inherit opacity-50 font-normal'
                } hover:scale-110 transition-all duration-300`}
              >
                <Link to={link.path}>
                  <p className={' font-Montserrat   text-lg uppercase'}>
                    {link.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {!isMobile &&
          (user ? (
            <div className='flex flex-row gap-x-5 items-center'>
              <Link to={'/profile'} className={'px-5'}>
                <div className=' flex flex-row items-center justify-center gap-x-2'>
                  {user.profile?.image ? (
                    <div className=' h-10 w-10 rounded-md overflow-hidden'>
                      <img
                        src={user.profile.image}
                        alt={user.username}
                        className=' object-cover'
                      />
                    </div>
                  ) : (
                    <UserIcon className='h-6 w-6' />
                  )}
                  <p className=' font-Oswald text-2xl font-thin capitalize'>
                    {user.username}
                  </p>
                </div>
              </Link>
              <Link
                to={logoutElement.path}
                onClick={() => dispatch(signOut())}
                className={
                  ' font-Oswald font-thin text-base uppercase  bg-red-500 py-1 px-3 rounded-md flex flex-row gap-x-2 items-center'
                }
              >
                <LogoutIcon className='h-6 w-6' />
                <p>{logoutElement.title}</p>
              </Link>
            </div>
          ) : (
            <Link
              to={loginElement.path}
              onClick={() => setOpen(false)}
              className={
                ' font-Oswald text-base uppercase font-thin bg-red-500 py-1 px-3 rounded-md'
              }
            >
              {loginElement.title}
            </Link>
          ))}

        {isMobile && (
          <button
            title='menuButton'
            type='button'
            onClick={() => setOpen((prev) => !prev)}
            className={
              ' font-Oswald text-lg uppercase font-thin  py-1 px-3 rounded-md'
            }
          >
            <MenuAlt3Icon className='h-8 w-8' />
          </button>
        )}
      </div>

      <AnimatePresence exitBeforeEnter>
        {isMobile && open && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{
              stiffness: 250,
              duration: 0.3,
            }}
            className='flex absolute top-0 left-0 w-screen h-screen bg-gradient-to-br dark:from-slate-900 dark:to-black items-center justify-center'
          >
            <button
              title='menuButton'
              type='button'
              onClick={() => setOpen(false)}
              className={
                'absolute top-0 right-0 m-5 font-Oswald text-lg uppercase font-thin  py-1 px-3 rounded-md'
              }
            >
              <XIcon className='h-8 w-8' />
            </button>
            <ul className=' list-none flex flex-col gap-y-3'>
              {links.map((link, index) => (
                <li className='list-item' key={index}>
                  <Link
                    onClick={() => setOpen(false)}
                    to={link.path}
                    className={'font-Oswald text-4xl uppercase font-thin'}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}

              <li className='list-item'>
                {user ? (
                  <Link
                    to={logoutElement.path}
                    onClick={() => dispatch(signOut())}
                    className={
                      'mt-5 font-Oswald w-full text-lg uppercase font-thin text-red-500 py-1  rounded-md flex flex-row gap-x-2 items-center'
                    }
                  >
                    <p className={'font-Oswald text-4xl uppercase font-thin'}>
                      {logoutElement.title}
                    </p>
                  </Link>
                ) : (
                  <Link
                    to={loginElement.path}
                    className={'font-Oswald text-4xl uppercase font-thin'}
                  >
                    {loginElement.title}
                  </Link>
                )}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
