import { Link } from 'react-router-dom';
import Layout from '../../layout/Layout';

export default function HomePage() {
  return (
    <Layout className='relative dark:bg-black from-sky-500 to-sky-800 dark:from-indigo-700 dark:to-indigo-900 flex'>
      {/* <img
        className='absolute top-0 left-0 right-0 bottom-0 w-screen h-screen bg-cover bg-center '
        src='https://images.pexels.com/photos/8134849/pexels-photo-8134849.jpeg?cs=srgb&dl=pexels-max-vakhtbovych-8134849.jpg&fm=jpg&w=1920&h=1281'
        alt=''
      /> */}

      <video
        src='https://download-video.akamaized.net/playback/f56ae198-3975-4f7d-a289-a57e02832be1/8e209a34-1f2374a2?__token__=st=1658177731~exp=1658192131~acl=%2Fplayback%2Ff56ae198-3975-4f7d-a289-a57e02832be1%2F8e209a34-1f2374a2%2A~hmac=7a99bc24f4becbee91ff60c2a0b32138724a6b2a82fc1fc19e5dc493a9baf812&r=dXM%3D'
        autoPlay
        playsInline
        muted
        loop
        className='absolute top-0 left-0 right-0 bottom-0 object-cover object-center h-full w-full '
      ></video>
      <div className='absolute top-0 left-0 right-0 bottom-0 w-screen h-screen bg-gradient-to-br from-sky-400 to-sky-800 dark:from-indigo-700 dark:to-indigo-900 opacity-90 mix-blend-multiply '></div>
      <div className='relative container mx-auto px-5 flex-col flex items-center justify-center flex-1 '>
        <p className=' font-Secondary text-5xl max-w-2xl text-center'>
          Si vous n'aimez pas où vous êtes, bougez. Vous n'êtes pas un arbre.
        </p>
        <Link
          to={`/properties`}
          className='bg-yellow-400 dark:bg-teal-500 px-5 py-1 rounded-xl font-Primary font-thin text-2xl my-5 '
        >
          Parcourir les offres
        </Link>
      </div>
    </Layout>
  );
}
