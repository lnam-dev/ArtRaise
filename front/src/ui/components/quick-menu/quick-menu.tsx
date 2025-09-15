"use client";
import React, { FC } from "react";
import { useQuickMenu } from "./useQuickMenu";

type Props = {
    variants: string[];
    onSelect?: (variant: string) => void;
};

const QuickMenu: FC<Props> = ({ variants, onSelect }) => {
    const { selectedIndex, setSelectedIndex } = useQuickMenu(variants);

    return (
        <div className="relative h-fit flex justify-center w-full">
            <div className="flex gap-[24px] relative">
                {variants.map((variant, index) => (
                    <div
                        key={index}
                        className="relative cursor-pointer pb-2 transition-all"
                        style={{
                            fontFamily: "Fixel, sans-serif",
                            fontWeight: 400, // regular
                            fontSize: "16px", // точний розмір
                            color: "#000",
                            borderBottom: selectedIndex === index ? "2px solid #000" : "2px solid transparent",
                        }}
                        onClick={() => {
                            setSelectedIndex(index);
                            onSelect?.(variant);
                        }}
                    >
                        {variant}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuickMenu;
