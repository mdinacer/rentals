interface Props {
  title: string;
  value?: any;
  prefix?: string;
}

export default function DetailsListItem({ title, value, prefix }: Props) {
  return (
    <div className=' py-0 border-b  border-b-inherit '>
      {value ? (
        <div className='relative w-full flex flex-row justify-between items-end '>
          <p className=' font-Oswald  font-thin text-sm lg:text-base uppercase '>
            {title}
          </p>
          <p className=' '>
            <span className=' text-base lg:text-xl font-Oswald font-thin capitalize'>
              {value}
            </span>
            {prefix && <span className='ml-1'>{prefix}</span>}
          </p>
        </div>
      ) : (
        <p className=' font-Montserrat font-bold text-base uppercase '>
          {title}
        </p>
      )}
    </div>
  );
}
