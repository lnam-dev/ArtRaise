import React, { FC } from 'react';
import Hash from '~/assets/hash.svg';
import CheckMark from '~/assets/check-mark.svg';

interface FilterTagProps {
  children: string;
  onClick?: () => void;
  isSelected?: boolean;
  variant?: 'dark' | 'light';
}

const FilterTag: FC<FilterTagProps> = ({
  children,
  onClick,
  isSelected = false,
  variant = 'dark',
}) => {
  //   const baseClasses =
  //     'flex items-center gap-2 px-2 py-2 lg:py-1 border transition duration-300 cursor-pointer';

  //   const borderColor = variant === 'dark' ? 'border-black' : 'border-[#F0F0F4]';

  //   const bgColor = isSelected ? 'bg-gray-950' : 'bg-transparent';

  //   const textColor = isSelected
  //     ? 'text-white'
  //     : variant === 'dark'
  //     ? 'text-black'
  //     : 'text-gray-950';

  //   const strokeColor = isSelected ? 'stroke-white' : 'stroke-gray-950';

  return (
    <div
      className={`flex items-center gap-2 px-2 py-2 lg:py-1 border-1 ${
        variant === 'dark'
          ? `${
              isSelected
                ? 'text-white bg-gray-950 stroke-white'
                : 'stroke-gray-950'
            }`
          : `${isSelected ? 'bg-white text-[#232327]' : ''}`
      } transition duration-500 cursor-pointer`}
      onClick={onClick}
    >
      {variant === 'dark' && <Hash />}
      <span
        className={`flex items-center gap-2 font-fixel font-normal lg:font-medium text-4 ${
          variant === 'dark'
            ? `${isSelected ? 'text-white' : 'text-gray-950'}`
            : `${isSelected ? 'text-[#232327]' : 'text-white'}`
        } leading-relaxed whitespace-nowrap`}
      >
        {children} (42) {variant === 'light' && isSelected ? <CheckMark /> : ''}
      </span>
    </div>
  );
};

export default FilterTag;
