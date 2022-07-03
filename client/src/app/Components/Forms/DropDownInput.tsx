import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import { useOutsideClick } from '../../util/outsideClick';

interface Props extends UseControllerProps {
  label: string;
  type?: string;
  autoComplete?: string | undefined;
  items: { title: string; value: any }[];
  initial?: string;
  className?: string;
}

export default function AppDropDownInput(props: Props) {
  const node = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const { fieldState, field } = useController({
    ...props,
    defaultValue: props.initial || '',
  });

  const handleSelectionChange = (item: { title: string; value: any }) => {
    field.onChange(item.value);

    setExpanded(false);
  };

  useEffect(() => {
    if (props.items.length > 0) {
      field.onChange(props.items[0].value);
    }
  }, [field, props.items]);

  const getItem = (value: string) => {
    const item = props.items.find((i) => i.value === value);
    return item ? item.title : '';
  };

  const handleCloseMenu = () => {
    setExpanded(false);
  };

  useOutsideClick(node, handleCloseMenu);

  return (
    <div ref={node} className={'relative select-none' + props.className}>
      <div className='py-1'>
        <p className='text-base text-gray-500 dark:text-gray-100 capitalize'>
          {props.label}
        </p>
      </div>
      <button
        type='button'
        className=' inline-flex items-center w-full border border-gray-400'
        onClick={() => setExpanded((prev) => !prev)}
      >
        <div className='text-left flex-auto w-full font-Montserrat py-2 px-5 uppercase'>
          {getItem(field.value)}
        </div>
        <div className=' flex-initial px-2 py-1 border-l border-l-gray-400'>
          <div
            className={`${
              expanded ? 'rotate-180' : 'rotate-0'
            } transition-all duration-300`}
          >
            <ChevronDownIcon className='h-8 w-8' />
          </div>
        </div>
      </button>
      {fieldState.error && (fieldState.isDirty || fieldState.isTouched) && (
        <div className='py-1 w-full'>
          <p className={`w-full text-sm text-red-500 first-letter:uppercase `}>
            {fieldState.error.message}
          </p>
        </div>
      )}

      <AnimatePresence exitBeforeEnter>
        {expanded && (
          <motion.div
            variants={containerVariants}
            initial='hidden'
            animate='open'
            exit='exit'
            style={{ transformOrigin: 'top' }}
            className='absolute mt-1 w-full z-10 '
          >
            <motion.ul className='bg-gray-200 dark:bg-slate-700 flex flex-col border border-gray-400 dark:border-y-gray-800 z-40'>
              {props.items.map((item, index) => (
                <li
                  key={index}
                  className='px-5 py-2 hover:bg-sky-500 dark:hover:bg-indigo-500 cursor-pointer inline-flex items-center gap-x-3'
                  onClick={() => handleSelectionChange(item)}
                >
                  <div className='h-6 w-6'>
                    {field.value === item.value && (
                      <ChevronRightIcon className='h-6 w-6' />
                    )}
                  </div>
                  <p className='text-left font-Montserrat text-base first-letter:uppercase'>
                    {item.title}
                  </p>
                </li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const containerVariants = {
  hidden: { scaleY: 0 },
  open: { scaleY: 1 },
  exit: { scaleY: 0 },
};
