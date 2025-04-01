import ChevronDown from "~/assets/chevron-down.svg";
import {FC, ReactNode} from "react";

const FilterDropdown: FC<{
    options: string[];
    isOpen: boolean;
    toggle: () => void;
    onSelect: (select:string) => void;
    children: ReactNode//elem that would display inside menu
}> = ({options, isOpen, toggle,onSelect,children}) => (
    <div className="relative flex flex-col h-fit text-4  md:text-5 bg-white border-2 py-2 px-4">
        <button className="flex items-center z-1 bg-white gap-4 px-1" onClick={toggle}>

            {children}
        </button>
        <div
            className={`absolute flex flex-col top-full text-sm bottom-0 left-0 font-normal w-full mt-[2px] transition font-fixel h-fit duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`}>
            {options.map((option) => (
                <span key={option} className={"bg-white px-3 py-2 z-20 -translate-x-full md:translate-x-0"} onClick={()=> {
                    onSelect(option)
                    toggle()
                }}>{option}</span>
            ))}
        </div>
    </div>
);

export default FilterDropdown;
