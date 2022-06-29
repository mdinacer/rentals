import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { House } from '../../models/house';
import HousesListItem from './HousesListItem';

interface Props {
  houses: House[];
}

export default function HousesList({ houses }: Props) {
  return (
    <motion.div
      variants={ContainerVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      className='grid grid-cols-1 lg:grid-cols-3 py-5  gap-4 w-full  px-5'
    >
      {houses.map((house) => (
        <motion.div key={house.slug} variants={ItemVariants}>
          <HousesListItem key={house.id} house={house} />
        </motion.div>
      ))}
    </motion.div>
  );
}

const ContainerVariants = {
  initial: {},
  animate: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
  exit: {},
};

const ItemVariants = {
  initial: { y: -100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { x: -100, opacity: 0 },
};
