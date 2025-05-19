import React from 'react';

type Props = {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

const DefaultTag: React.FC<Props> = ({className,...rest}) => {
  return (
    <button className={`px-2 py-1 border-1 border-black transition duration-500 ${className}`} {...rest}/>
  );
};

export default DefaultTag;
