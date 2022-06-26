import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signOut } from '../../slices/accountSlice';
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import useMediaQuery from '../../util/mediaQuery';

const logo = 'Kiraa';

export default function Header() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.account);
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isMobile && open) {
      setOpen(false);
    }
  }, [isMobile, open]);

  return (
    <div className='w-screen h-auto  bg-slate-900 fixed z-10 top-0 left-0 py-1 text-white flex items-center justify-between drop-shadow-md'>
      <div className='container px-5 mx-auto flex items-center justify-between'>
        <Link to={'/'}>
          <p className=' font-Oswald text-3xl'>{logo}</p>
        </Link>

        {!isMobile && (
          <ul className=' list-none flex flex-row gap-x-5 items-center '>
            {links.map((link, index) => (
              <li
                key={index}
                className={`${
                  pathname === link.path ? 'text-teal-500' : 'text-inherit'
                } hover:scale-110 transition-all duration-300`}
              >
                <Link to={link.path}>
                  <p
                    className={
                      ' font-Oswald text-base first-letter:text-xl uppercase font-thin'
                    }
                  >
                    {link.title}
                  </p>
                </Link>
              </li>
            ))}
            {/* {isAdmin && (
              <li
                className={`${
                  pathname === '/admin' ? 'text-red-500' : 'text-inherit'
                } hover:scale-110 transition-all duration-300`}
              >
                <Link
                  onClick={() => setOpen(false)}
                  to={'/admin'}
                  className={'font-Oswald text-xl uppercase font-thin'}
                >
                  Admin Panel
                </Link>
              </li>
            )} */}
          </ul>
        )}

        {!isMobile &&
          (user ? (
            <div className='flex flex-row gap-x-5 items-center'>
              <Link to={'/profile'} className={'px-5'}>
                <div className=' flex flex-row items-center justify-center gap-x-2'>
                  {user.profile?.image ? (
                    <div className=' h-10 w-10 rounded-full overflow-hidden'>
                      <img
                        src={user.profile.image}
                        alt={user.username}
                        className=' object-cover'
                      />
                    </div>
                  ) : (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                  )}
                  <p className=' text-base capitalize'>
                    {user.profile?.fullName || user.username}
                  </p>
                </div>
              </Link>
              <button
                title='logout'
                type='button'
                onClick={() => dispatch(signOut())}
                className={
                  ' font-Oswald text-base uppercase font-thin bg-red-500 py-0 px-3 rounded-md flex flex-row gap-x-2 items-center'
                }
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                  />
                </svg>
                <p>Logout</p>
              </button>
            </div>
          ) : (
            <Link
              to={loginElement.path}
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
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-8 w-8'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16m-7 6h7'
              />
            </svg>
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
              duration: 0.5,
            }}
            className='flex absolute top-0 left-0 w-screen h-screen bg-slate-800 items-center justify-center'
          >
            <button
              title='menuButton'
              type='button'
              onClick={() => setOpen(false)}
              className={
                'absolute top-0 right-0 m-5 font-Oswald text-lg uppercase font-thin  py-1 px-3 rounded-md'
              }
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-8 w-8'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
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
              {/* {isAdmin && (
                <li className='list-item'>
                  <Link
                    onClick={() => setOpen(false)}
                    to={'/admin'}
                    className={'font-Oswald text-4xl uppercase font-thin'}
                  >
                    Admin Panel
                  </Link>
                </li>
              )} */}

              <li className='list-item'>
                {user ? (
                  <button
                    title='logout'
                    type='button'
                    onClick={() => dispatch(signOut())}
                    className={
                      ' font-Oswald w-full text-lg uppercase font-thin text-red-500 py-1  rounded-md flex flex-row gap-x-2 items-center'
                    }
                  >
                    <p className={'font-Oswald text-4xl uppercase font-thin'}>
                      Logout
                    </p>
                  </button>
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
    </div>
  );
}

const links = [
  { title: 'Home', path: '/' },
  { title: 'Browse', path: '/houses' },
  { title: 'About', path: '/about' },
  { title: 'Contact', path: '/contact' },
];
const loginElement = { title: 'Login', path: '/account/login' };
