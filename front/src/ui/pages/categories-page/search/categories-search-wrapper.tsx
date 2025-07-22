"use client";

import { useState } from "react";

import SearchInput from "~/ui/components/search-bar/search-input";

const CategoriesSearchWrapper = () => {
	const [inputString, setInputString] = useState<string>("");

	return (
		<>
			<SearchInput
				className="w-full xl:w-[50%]"
				handleOnSearchClick={() => console.log(`Searching for: ${inputString}`)}
				setInputString={setInputString}
				searchString={inputString}
				inputPlaceholder="Пошук"
			/>
		</>
	);
};

export default CategoriesSearchWrapper;
