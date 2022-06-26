import { FieldValues, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

import TextInput from '../../Components/Forms/TextInput';
import PasswordInput from '../../Components/Forms/PasswordInput';
import { registerValidationSchema } from './accountValidations';
import agent from '../../api/agent';

export default function LoginPage() {
  //const [registerSuccess, setRegisterSuccess] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({ mode: 'all', resolver: yupResolver(registerValidationSchema) });

  async function submitForm(data: FieldValues) {
    const { password2, ...user } = data;
    agent.Account.register(user)
      .then((response) => {
        // setRegisterSuccess(true);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className='py-20 h-screen w-screen flex items-center justify-center  bg-slate-800 '>
      <div className='h-auto lg:p-20 p-5 w-full  drop-shadow-md rounded-xl flex items-center justify-center'>
        <div className='w-full lg:max-w-md '>
          <p className=' font-Oswald text-7xl text-center pb-10 uppercase'>
            Sing Up
          </p>

          <form
            autoComplete='off'
            onSubmit={handleSubmit(submitForm)}
            className='grid grid-flow-row gap-4  w-full'
          >
            <TextInput
              autoComplete='off'
              type='text'
              control={control}
              label='Name'
              name='username'
              placeholder='Username'
            />
            <TextInput
              autoComplete='off'
              type='text'
              control={control}
              label='fullname'
              name='fullName'
              placeholder='Full Name'
            />
            <TextInput
              autoComplete='off'
              type='email'
              control={control}
              label='Email'
              name='email'
              placeholder='Email'
            />

            <PasswordInput
              autoComplete='new-password'
              control={control}
              label='Password'
              name='password'
              placeholder='Password'
            />
            <PasswordInput
              autoComplete='repeat-password'
              control={control}
              label='Password'
              name='password2'
              placeholder='Confirm Password'
            />

            <input
              disabled={!isValid}
              className={`${
                isValid ? 'opacity-100 bg-teal-500 ' : 'opacity-50 bg-teal-800'
              } cursor-pointer bg-slate-800  max-w-sm mx-auto w-full rounded-xl lg:rounded-full py-2 my-10 px-5 uppercase font-Oswald text-xl font-thin`}
              type='submit'
              value={isSubmitting ? 'Please wait' : 'Register'}
            />
          </form>
          <Link
            to={registerPath}
            className='underline underline-offset-4 text-center lg:hover:text-teal-300'
          >
            <p className=' font-Montserrat text-lg '>
              Already have an account!, Sign In
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

const registerPath = '/account/register';
