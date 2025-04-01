import { useState } from 'react';
import Arrow from '~/assets/arrow-up-right.svg';

interface Detail {
  label: string;
  value: string;
}

interface ArtDetailsProps {
  details: Detail[];
}

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  accordionItems: AccordionItem[];
}

export const ArtDetails: React.FC<ArtDetailsProps> = ({ details }) => {
  return (
    <div className='space-y-4'>
      {details.map((detail, index) => (
        <div key={index} className='pb-2 border-b-2 border-[#62636D]'>
          <p className='font-fixel opacity-[50%] text-[#000] 2xl:text-[1.5rem] xl:text-[1.25rem]'>
            {detail.label}
          </p>
          <p className='font-fixel font-medium 2xl:text-[1.75rem] xl:text-[1.5rem] lg:text-[1.25rem]'>
            {detail.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export const Accordion: React.FC<AccordionProps> = ({ accordionItems }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className='space-y-4 mt-4'>
      {accordionItems.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={index} className=''>
            <button
              className='flex justify-between items-center w-full gap-2 py-[0.625rem] mb-2 border-b-2 border-[#B9BBC8]'
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span
                className={`font-fixel font-medium 2xl:text-[1.75rem] xl:text-[1.5rem] lg:text-[1.25rem] text-[#131315]`}
              >
                {item.title}
              </span>
              <div className=''>
                <Arrow
                  className={`transition duration-200 ${
                    isOpen ? 'rotate-0' : 'rotate-90'
                  }`}
                  width={32}
                  height={32}
                />
              </div>
            </button>
            <div
              className={`overflow-hidden transition-all ${
                isOpen ? 'h-auto mb-5' : 'max-h-0'
              } duration-300`}
            >
              <p className='mt-2 text-[#1F1F1F] 2xl:text-[1.5rem] xl:text-[1.25rem]'>
                {item.content}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
