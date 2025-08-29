"use client"
import SegmentTitle from "../segment-title/segment-title";
import FilterTag from "~/ui/components/tag/filter-tag/filter-tag";
import SearchInput from "./search-input";
import React, {FC, useState} from "react";
import Hash from "~/assets/hash.svg";
import {useRouter} from "next/navigation";
import usePath from "~/ui/hooks/usePath";
import DefaultTag from "~/ui/components/tag/default-tag";
import {useLocale} from "next-intl";

const TAGS = [
	"Pop Art до $500",
	"Великі пейзажі",
	"Скляні скульптури",
	"Юрій Рубан",
	"Живопис",
	"Кераміка",
];

const SearchBar: FC<React.HTMLAttributes<HTMLElement>> = ({
	className = "",
	...props
}) => {
	const [inputString, setInputString] = useState<string>("")
	const router = useRouter();
	const path = usePath()
	return (
		<div
			className={`container flex flex-col gap-2 mx-auto ${className}`}
			{...props}>
			<SearchInput className="px-4 xl:px-0 mb-6" handleOnSearchClick={()=>router.push(path(`search?title=${inputString}`))} setInputString={setInputString} searchString={inputString} />
		</div>
	);
};

export default SearchBar;
