import React, { FC } from "react";
import Hash from "~/assets/hash.svg";
import DefaultTag from "~/ui/components/tag/default-tag";

interface FilterTagProps {
	children: React.ReactNode;
	onClick?: () => void;
	isSelected?: boolean;
	className?: string;
}

const FilterTag: FC<FilterTagProps> = ({
	children,
	onClick,
	className,
	isSelected = false,
}) => {
	return (
		<DefaultTag
			className={` flex items-center gap-2 px-2 py-2 lg:py-1 font-fixel font-normal lg:font-medium border-1 border-black transition duration-500 cursor-pointer ${
				isSelected ? "text-white bg-gray-950 stroke-white" : "stroke-gray-950"
			} ${className}`}
			onClick={onClick}>
			{
					<span
						className={` text-4 font-[weight:inherit] text-black leading-relaxed whitespace-nowrap ${
							isSelected ? "text-white" : "text-gray-950"}`}>
					{children}
				</span>
			}

		</DefaultTag>
	);
};

export default FilterTag;
