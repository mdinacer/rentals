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
    <div className={`${className} w-full`}>
      <p className=' font-Raleway text-xl mb-2'>{title}</p>
      {children}
    </div>
  );
}
