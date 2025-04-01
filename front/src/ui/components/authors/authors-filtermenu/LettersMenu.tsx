"use client"
import React, {FC, useEffect, useLayoutEffect, useRef, useState} from 'react';
type Props = {
    availableLetters: string[];
}
const LettersMenu:FC<Props> = ({availableLetters}) => {
    const [selectedLetterIndex, setSelectedLetterIndex] = useState<number>(-1);//-1 mean that no letter selected
    const [bgStyle, setBgStyle] = useState({ width: "0px", left: "0px" });
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if(selectedLetterIndex >=0 && containerRef.current){
            const child = containerRef.current.children[selectedLetterIndex] as HTMLElement;
            setBgStyle({ width: `${child.offsetWidth}px`, left: `${child.offsetLeft}px` });
        }
    }, [selectedLetterIndex]);
    return (
        <div
            ref={containerRef}
            className="relative flex flex-nowrap md:flex-wrap overflow-x-auto scrollbar-hide max-w-full xl:pl-0">

            {availableLetters.map((tag, index) => (
                <button key={tag} className={`px-2 py-1 z-10 ${selectedLetterIndex === index && "text-white"}`}
                        onClick={() => {
                            if (selectedLetterIndex !== index) {
                                setSelectedLetterIndex(index)
                            }else{
                                setSelectedLetterIndex(-1)}
                        }}>{tag}</button>
            ))}
           <div
                className={`${selectedLetterIndex < 0 && "opacity-0"} absolute -bottom-0 h-full bg-black transition-all duration-300`}
                style={bgStyle}
            />
        </div>
    );
};

export default LettersMenu;
