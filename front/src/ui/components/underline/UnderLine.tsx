import React from 'react';

type Props = {
    height?: number;
    className?: string;
}

const UnderLine: React.FC<Props> = ({height,className }) => {
  return (
      <div className={`absolute bottom-0 left-0 w-full h-[${height??1}px] content-[''] bg-gray-950 opacity-70 ${className}`}/>
  );
};

export default UnderLine;
