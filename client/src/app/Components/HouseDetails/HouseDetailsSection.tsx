interface Props {
  title: string;
  children: JSX.Element | JSX.Element[];
  className?: string;
}

export default function HouseDetailsSection({
  title,
  children,
  className,
}: Props) {
  return (
    <div className={`lg:mb-0 ${className}`}>
      <p className=' font-Oswald text-3xl lg:text-4xl font-thin  mb-5  uppercase'>
        {title}
      </p>
      {children}
    </div>
  );
}
