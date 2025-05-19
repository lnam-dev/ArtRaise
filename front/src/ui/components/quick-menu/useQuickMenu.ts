import { useState, useRef, useEffect } from "react";

export const useQuickMenu = (variants: string[]) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [underlineStyle, setUnderlineStyle] = useState({ width: "0px", left: "0px" });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            const selectedItem = containerRef.current.children[selectedIndex] as HTMLElement;
            if (selectedItem) {
                setUnderlineStyle({
                    width: `${selectedItem.offsetWidth}px`,
                    left: `${selectedItem.offsetLeft}px`
                });
            }
        }
    }, [selectedIndex]);

    return {
        selectedIndex,
        setSelectedIndex,
        selectedVariant: variants[selectedIndex],
        underlineStyle,
        containerRef,
    };
};
