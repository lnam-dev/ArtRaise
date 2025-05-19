"use client";

import Button from "../button/button";
import useDevice from "~/ui/hooks/useDevice";
import Search from "~/assets/search.svg";
import Input from "../input/input";

const SearchInput = ({ className }: { className: string }) => {
	const { isMobile } = useDevice();

	return (
		<div className={`flex ${className}`}>
			<Input
				type="text"
				placeholder="Пошук за ім’ям автора та/або назвою"
				className="text-4 text-gray-950 w-full"
			/>
			<Button className="w-[3.5rem] md:w-[21rem] py-2 px-4 bg-black text-white text-base font-medium">
				{isMobile ? (
					<Search height={24} width={24} className="fill-white" />
				) : (
					<span>Шукати</span>
				)}
			</Button>
		</div>
	);
};

export default SearchInput;
