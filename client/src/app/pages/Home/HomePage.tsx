import Layout from '../../layout/Layout';
import { registerLocale } from 'react-datepicker';
import { ar, fr, enUS } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';

registerLocale('ar', ar);
registerLocale('fr', fr);
registerLocale('en', enUS);

export default function HomePage() {
  const { t } = useTranslation();
  return (
    <Layout className='relative bg-gradient-to-br from-sky-500 to-sky-800 dark:from-indigo-700 dark:to-indigo-900 flex'>
      <div className='container mx-auto px-5 flex-col flex items-center justify-center flex-1 '>
        <p className=' font-Oswald text-5xl'>{t('hero_text')}</p>
      </div>
    </Layout>
  );
}
