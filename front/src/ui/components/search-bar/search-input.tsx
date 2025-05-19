"use client";

import Button from "../button/button";
import useDevice from "~/ui/hooks/useDevice";
import Search from "~/assets/search.svg";
import Input from "../input/input";
import {FC} from "react";
type Props = {
	className?: string;
	setInputString: (s:string) => void;
	handleOnSearchClick: () => any;
	searchString: string
}

const SearchInput: FC<Props> = ({className,setInputString,handleOnSearchClick,searchString}) => {
	const { isMobile } = useDevice();

	return (
		<div className={`flex ${className}`}>
			<Input
				type="text"
				placeholder="Пошук за ім’ям автора та/або назвою"
				className="text-4 text-gray-950 w-full"
				value={searchString}
				onChange={(e) => setInputString(e.target.value)}
			/>
			<Button className="w-[3.5rem] md:w-[21rem] py-2 px-4 bg-black text-white text-base font-medium"
				onClick={handleOnSearchClick}
			>
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
