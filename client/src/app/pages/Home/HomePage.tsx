import Layout from '../../layout/Layout';

export default function HomePage() {
  return (
    <Layout className='relative bg-gradient-to-br from-sky-500 to-sky-800 dark:from-indigo-700 dark:to-indigo-900 flex'>
      <div className='container mx-auto px-5 flex-col flex items-center justify-center flex-1 '>
        <p className=' font-Primary text-5xl'>
          If you don’t like where you are, move. You are not a tree.
        </p>
      </div>
    </Layout>
  );
}
