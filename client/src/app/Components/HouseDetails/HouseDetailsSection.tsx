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
    <div className={`mb-5 ${className}`}>
      <p className=' font-Oswald text-3xl lg:text-4xl font-thin capitalize mb-2 lg:mb-5'>
        {title}
      </p>
      {children}
    </div>
  );
}
