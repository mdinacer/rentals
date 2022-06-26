import { useEffect } from 'react';
import { signInUser } from '../../slices/accountSlice';
import { FieldValues, useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

import { loginValidationSchema } from './accountValidations';

import { useAppDispatch } from '../../store/configureStore';
import TextInput from '../../Components/Forms/TextInput';
import PasswordInput from '../../Components/Forms/PasswordInput';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const { state }: any | null = useLocation();
  const navigate = useNavigate();

  const {
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(loginValidationSchema),
  });

  async function submitForm(data: FieldValues) {
    try {
      await dispatch(signInUser(data));
      const from = state?.from?.pathname || '/';
      navigate(from);
    } catch (error: any) {
      console.log(error);
    }
  }

  useEffect(() => {
    const email = state?.email;
    if (email) {
      setValue('email', email);
    }
  }, [setValue, state?.email]);

  return (
    <div className='py-20 h-screen w-screen flex items-center justify-center  bg-slate-800 '>
      <div className='h-auto lg:p-20 p-5 w-full  drop-shadow-md rounded-md flex items-center justify-center'>
        <div className='w-full lg:max-w-md '>
          <p className=' font-Oswald text-7xl text-center pb-10 uppercase'>
            Sing In
          </p>

          <form
            onSubmit={handleSubmit(submitForm)}
            className='flex flex-col gap-y-2  w-full'
          >
            <TextInput
              autoComplete='email'
              type='email'
              control={control}
              label='Email'
              name='email'
              placeholder='Email'
            />

            <PasswordInput
              autoComplete='password'
              control={control}
              label='Password'
              name='password'
              placeholder='Password'
            />

            <input
              disabled={!isValid}
              className={`${
                isValid ? 'opacity-100 bg-teal-500 ' : 'opacity-50 bg-teal-800'
              } cursor-pointer bg-slate-800  max-w-sm mx-auto w-full rounded-xl lg:rounded-full py-2 my-10 px-5 uppercase font-Oswald text-xl font-thin`}
              type='submit'
              value={isSubmitting ? 'Please wait' : 'Login'}
            />
          </form>
          <Link
            to={registerPath}
            className='underline underline-offset-4 text-center lg:hover:text-teal-300'
          >
            <p className=' font-Montserrat text-lg '>Create a new account.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

const registerPath = '/account/register';
