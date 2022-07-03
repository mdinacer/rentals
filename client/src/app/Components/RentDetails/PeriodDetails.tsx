import { format, formatDuration, intervalToDuration } from 'date-fns';

interface Props {
  startDate: string;
  endDate: string;
}

export default function PeriodDetails({ startDate, endDate }: Props) {
  const styles = {
    title:
      'font-Oswald text-2xl uppercase font-thin mb-3 border-t dark:border-t-white opacity-70 pt-2',
    itemsContainer: 'flex-auto flex flex-col lg:flex-row gap-x-5 gap-y-2',
    itemWrapper: 'flex flex-row w-full justify-between lg:items-end',
    itemTitle: 'font-Montserrat font-bold  text-base uppercase opacity-50',
    itemContent: 'font-Oswald font-thin text-xl',
  };
  return (
    <div>
      <div className=' flex flex-col  py-5'>
        <p className={styles.title}>Period</p>
        <div className={styles.itemWrapper}>
          <p className={styles.itemTitle}>Duration</p>
          <p className={styles.itemContent}>
            {formatDuration(
              intervalToDuration({
                start: new Date(startDate),
                end: new Date(endDate),
              }),
              {
                format: ['years', 'months', 'days'],
                zero: false,
                delimiter: ', ',
              }
            )}
          </p>
        </div>
        <div className={styles.itemsContainer}>
          <div className={styles.itemWrapper}>
            <p className={styles.itemTitle}>Start</p>
            <p className={styles.itemContent}>
              {format(new Date(startDate), 'PP')}
            </p>
          </div>

          <div className={styles.itemWrapper}>
            <p className={styles.itemTitle}>End</p>
            <p className={styles.itemContent}>
              {format(new Date(endDate), 'PP')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
