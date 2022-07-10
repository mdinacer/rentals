import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../store/configureStore';
import { fetchCurrentUser } from '../slices/accountSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingComponent from '../Components/Common/LoadingComponent';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from '../pages/Home';
import Header from '../Components/Header';
import SocketClient from '../util/socketClient';

export const Client = new SocketClient();

function App() {
  const { user } = useAppSelector((state) => state.account);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const initSocket = useCallback(
    (token?: string) => {
      Client.connect(token);

      Client.socket?.emit('join', {
        name: user?.username || 'anonymous',
        room: 'test',
      });

      Client.on('message', (value: any) => {
        // console.log('message:', value);
      });
    },
    [user]
  );

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
    initApp().then(() => {
      setLoading(false);
    });
  }, [initApp]);

  useEffect(() => {
    initSocket(user?.token);
    return () => {
      Client.disconnect();
    };
  }, [initSocket, user]);

  if (loading) return <LoadingComponent message='Initializing Application' />;
  return (
    <div className=' w-full  min-h-screen    text-black dark:text-white bg-gray-100 h-full  border-black dark:border-white dark:bg-black '>
      <ToastContainer position='bottom-right' hideProgressBar />

      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path={'/*'}>
          <Route
            path='test/:slug'
            element={
              <Suspense fallback={<div />}>
                <TestPage />
              </Suspense>
            }
          />
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
              path='edit/:slug'
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

            {/* <Route
              path='edit/:slug'
              element={
                <Suspense fallback={<div />}>
                  <HouseAddEdit />
                </Suspense>
              }
            /> */}
          </Route>

          <Route path='profile'>
            <Route
              index
              element={
                <Suspense fallback={<div />}>
                  <Profile />
                </Suspense>
              }
            />

            <Route
              path='operations'
              element={
                <Suspense fallback={<div />}>
                  <UserOperations />
                </Suspense>
              }
            />
            <Route
              path='houses'
              element={
                <Suspense fallback={<div />}>
                  <UserHouses />
                </Suspense>
              }
            />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

const TestPage = lazy(() => import('../pages/TestPage'));
const Login = lazy(() => import('../pages/Account/LoginPage'));
const Register = lazy(() => import('../pages/Account/RegisterPage'));
const Houses = lazy(() => import('../pages/Houses'));
const HouseDetails = lazy(() => import('../pages/HouseDetails'));
const HouseAddEdit = lazy(() => import('../pages/HouseCreate'));
const Profile = lazy(() => import('../pages/Profile'));
const UserOperations = lazy(
  () => import('../pages/Profile/UserOperationsPage')
);
const UserHouses = lazy(() => import('../pages/Profile/UserHouses'));

export default App;
