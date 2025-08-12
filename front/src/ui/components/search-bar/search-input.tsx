"use client";

import Button from "../button/button";
import useDevice from "~/ui/hooks/useDevice/useDevice";
import Search from "~/assets/search.svg";
import Input from "../input/input";
import { forwardRef, FormEvent } from "react";

type SearchInputProps = {
	className?: string;
	setInputString?: (s: string) => void;
	handleOnSearchClick?: () => any;
	searchString?: string;
	inputPlaceholder?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
	(
		{
			className,
			setInputString,
			handleOnSearchClick,
			searchString,
			inputPlaceholder = "Пошук за ім’ям автора та/або назвою",
			...props
		},
		ref
	) => {
		const { isMobile } = useDevice();
		const { children, ...restProps } = props;

		const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			if (handleOnSearchClick) handleOnSearchClick();
		};

		return (
			<form className={`flex ${className}`} onSubmit={handleSubmit}>
				<Input
					ref={ref}
					type="text"
					placeholder={inputPlaceholder}
					className="text-4 text-gray-950 w-full"
					value={searchString}
					onChange={(e) => {
						if (setInputString) setInputString(e.target.value);
					}}
					{...restProps}
				/>
				<Button
					className="w-[3.5rem] md:w-[21rem] bg-black text-white text-base font-medium"
					type="submit">
					{isMobile ? (
						<Search height={24} width={24} className="fill-white" />
					) : (
						<span>Пошук</span>
					)}
				</Button>
			</form>
		);
	}
);

export default SearchInput;
