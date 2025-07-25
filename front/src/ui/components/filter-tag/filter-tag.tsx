import React, { FC } from "react";
import Hash from "~/assets/hash.svg";

interface FilterTagProps {
	children: string;
	onClick?: () => void;
	isSelected?: boolean;
}

const FilterTag: FC<FilterTagProps> = ({
	children,
	onClick,
	isSelected = false,
}) => {
	return (
		<div
			className={`flex items-center gap-2 px-2 py-2 lg:py-1 border-1 border-black-1000 transition duration-500 cursor-pointer ${
				isSelected ? "text-white bg-gray-950 stroke-white" : "stroke-gray-950"
			}`}
			onClick={onClick}>
			<Hash height={12} width={12} />
			<span
				className={`font-fixel font-normal lg:font-medium text-4 text-black-1000 leading-relaxed whitespace-nowrap ${
					isSelected ? "text-white" : "text-gray-950"
				}`}>
				{children}
			</span>
		</div>
	);
};

export default FilterTag;
