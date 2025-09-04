"use client";

import { useRef, useState, useMemo, useCallback } from "react";

import { debounce } from "~/utils/debounce";

import useDevice from "~/ui/hooks/useDevice/useDevice";

import { CategoriesPage as TCategoriesPage } from "~/use-cases/contracts/categories-page";
import CardCategories from "~/ui/components/card/card-categories";

import Input from "~/ui/components/input/input";
import Search from "~/assets/search-mobile.svg";

const CategoriesPage = ({ newArrivals, categories }: TCategoriesPage) => {
	const [searchTerm, setSearchTerm] = useState("");
	const searchInputRef = useRef<HTMLInputElement>(null);

	const filteredCategories = useMemo(() => {
		if (!searchTerm) {
			return categories;
		}
		return categories.filter((category) =>
			category.name_ua.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [categories, searchTerm]);

	const debouncedSetSearchTerm = useCallback(
		debounce(() => {
			if (searchInputRef.current) {
				setSearchTerm(searchInputRef.current.value);
			}
		}, 300),
		[setSearchTerm]
	);

	return (
		<main className="container mx-auto mt-14 lg:mt-18 xl:mt-[5rem] mobile-spacing">
			<div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between mb-5 xl:mb-8">
				<h1 className="font-namu font-medium text-6 xl:text-8 text-black leading-none ">
					Категорії
				</h1>
				<div className="xl:w-[50%] relative">
					<Input
						type="text"
						placeholder="Живопис"
						className="text-4 text-gray-950 pl-12"
						ref={searchInputRef}
						onChange={debouncedSetSearchTerm}
					/>
					<Search
						width={24}
						height={24}
						className="fill-gray-700 absolute top-1/2 left-4 transform -translate-y-1/2"
					/>
				</div>
			</div>
			<section className="columns-1 gap-6 sm:columns-2 xl:columns-4">
				{newArrivals.map((arrivals) => (
					<CardCategories
						key={arrivals.id}
						card={arrivals}
						className="w-full mb-12 xl:mb-0 xl:sticky xl:top-[5rem] break-inside-avoid"
					/>
				))}
				{filteredCategories.map((category) => (
					<CardCategories
						key={category.id}
						card={category}
						className="mb-12 break-inside-avoid"
					/>
				))}
			</section>
		</main>
	);
};

export default CategoriesPage;
