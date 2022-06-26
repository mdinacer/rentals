import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../store/configureStore';
import { fetchCurrentUser } from '../slices/accountSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingComponent from '../Components/Common/LoadingComponent';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from '../pages/Home';
import Header from '../Components/Header';

function App() {
  const { user } = useAppSelector((state) => state.account);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const initApp = useCallback(async () => {
    try {
      setLoading(true);
      await dispatch(fetchCurrentUser());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);

  if (loading) return <LoadingComponent message='Initializing Application' />;
  return (
    <div className=' w-full  min-h-screen  flex  pt-[44px] text-black dark:text-white bg-gray-100  border-black dark:border-white dark:bg-black '>
      <ToastContainer position='bottom-right' hideProgressBar />
      {/* {user ? (
        <Header />
      ) : (
        pathname !== '/' && <div className='fixed top-0 left-0 p-10 '></div>
      )} */}
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path={'/*'}>
          <Route path='account'>
            <Route
              path='login'
              element={
                <Suspense fallback={<div />}>
                  <Login />
                </Suspense>
              }
            />
            <Route
              path='register'
              element={
                <Suspense fallback={<div />}>
                  <Register />
                </Suspense>
              }
            />
          </Route>

          <Route path='houses'>
            <Route
              index
              element={
                <Suspense>
                  <Houses />
                </Suspense>
              }
            />
            <Route
              path='create/'
              element={
                <Suspense fallback={<div />}>
                  <HouseAddEdit />
                </Suspense>
              }
            />
            <Route
              path=':slug'
              element={
                <Suspense fallback={<div />}>
                  <HouseDetails />
                </Suspense>
              }
            />

            <Route
              path='edit/:slug'
              element={
                <Suspense fallback={<div />}>
                  <HouseAddEdit />
                </Suspense>
              }
            />
          </Route>

          <Route
            path='profile'
            element={
              <Suspense fallback={<div />}>
                <Profile />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

const Login = lazy(() => import('../pages/Account/LoginPage'));
const Register = lazy(() => import('../pages/Account/RegisterPage'));
const Houses = lazy(() => import('../pages/Houses'));
const HouseDetails = lazy(() => import('../pages/HouseDetails'));
const Profile = lazy(() => import('../pages/Profile'));
const HouseAddEdit = lazy(() => import('../pages/HouseCreate'));

export default App;
