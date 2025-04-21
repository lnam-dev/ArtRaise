'use client';
import React, { useState, isValidElement, ReactNode } from 'react';
import { text } from 'stream/consumers';
import Arrow from '~/assets/arrow-up-right.svg';

interface AccordionProps {
  question: string;
  children: ReactNode;
  variant?: 'faq' | 'filter';
}

const textComponent = (children: string) => {
  return (
    <p className='font-fixel font-normal text-black text-[0.875rem] mt-2'>
      {children}
    </p>
  );
};

const Accordion = ({ question, children, variant = 'faq' }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  // const containerStyle =
  //   variant === 'faq'
  //     ? 'border-b-1 lg:border-b-2 border-gray-500 py-[0.625rem] mb-8'
  //     : 'border-b border-[#62636D] py-4';

  // const titleStyle =
  //   variant === 'faq'
  //     ? 'font-fixel font-medium text-4 text-left'
  //     : 'font-fixel font-medium text-[1rem] text-white';

  return (
    <div
      className={'border-b-1 lg:border-b-2 border-gray-500 py-[0.625rem] mb-8'}
    >
      <button
        className='flex justify-between items-center gap-2 w-full'
        onClick={handleToggle}
      >
        <span className={'font-fixel font-medium text-4 text-left'}>
          {question}
        </span>
        <div className='w-6 h-6'>
          <Arrow
            className={`transition-transform duration-200 ${
              variant === 'filter' ? 'fill-[#CDCED8]' : ''
            } ${isOpen! ? 'rotate-90' : ''}`}
            width={24}
            height={24}
          />
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all ${
          isOpen ? 'max-h-40' : 'max-h-0'
        } duration-300`}
      >
        {isValidElement(children)
          ? children
          : textComponent(children as string)}
      </div>
    </div>
  );
};

export default Accordion;
