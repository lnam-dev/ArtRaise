import React, { FC, ReactNode } from "react";
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
			className={`flex items-center gap-2 px-2 py-2 lg:py-1 border-1 border-black transition duration-500 cursor-pointer ${
				isSelected ? "text-white bg-gray-950" : ""
			}`}
			onClick={onClick}>
			<Hash
				className={`inline-block ${
					isSelected ? "stroke-white" : "stroke-gray-950"
				}`}
				height={12}
				width={12}
			/>
			<span className="font-fixel font-normal lg:font-medium text-4 text-black leading-relaxed whitespace-nowrap">
				{children}
			</span>
		</div>
	);
};

export default FilterTag;
