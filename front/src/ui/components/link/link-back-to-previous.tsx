'use client'
import React from 'react';
import ArrowBackTo from "~/assets/arrow-back.svg";
import {useRouter} from "next/navigation";

interface Props {
    className?: string;
    children?: React.ReactNode;
}

const LinkBackToPrevious: React.FC<Props> = ({className,children}) => {
    const router = useRouter()
    return (
        <button
            onClick={()=> router.back()}
            className={`flex items-center gap-2 text-nowrap ${className}`}>
            <ArrowBackTo
                className="fill-gray-950 flex-shrink-0"
                height={32}
                width={32}
            />
            <span className="font-fixel font-normal text-4 text-gray-950 hidden md:block">
				{children ? children : 'Назад'}
			</span>
        </button>
    );
};

export default LinkBackToPrevious;
