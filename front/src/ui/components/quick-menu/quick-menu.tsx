"use client";
import React, { FC } from "react";
import { useQuickMenu } from "./useQuickMenu";

type Props = {
    variants: string[];
    onSelect?: (variant: string) => void;
};

const QuickMenu: FC<Props> = ({ variants, onSelect }) => {
    const { selectedIndex, setSelectedIndex, selectedVariant, underlineStyle, containerRef } = useQuickMenu(variants);

    return (
        <div className="relative w-fit h-fit">
            <div ref={containerRef} className="flex flex-row gap-5 px-5 relative">
                {variants.map((variant, index) => (
                    <div
                        key={index}
                        className={`relative cursor-pointer px-2 pb-3 transition-colors ${selectedIndex === index ? "text-black" : "text-gray-500"}`}
                        onClick={() => {
                            setSelectedIndex(index);
                            onSelect?.(variant);
                        }}
                    >
                        {variant}
                    </div>
                ))}
                {/* Animated Underline */}
                <div
                    className="absolute -bottom-0 h-[2px] bg-black-950 transition-all duration-300"
                    style={underlineStyle}
                />
                <div className="absolute content-[''] h-[1px] -bottom-0 left-0 bg-black-950/30 w-full" />
            </div>
        </div>
    );
};

export default QuickMenu;
