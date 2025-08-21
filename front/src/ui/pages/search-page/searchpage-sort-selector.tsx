import React from "react";
import SortIcon from "~/assets/sort-icon.svg";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { useAppDispatch, useAppSelector } from "~/store/client/hooks";
import { ISort, setSort } from "~/store/client/slices/SearchPageSlice";
import { Separator } from "@radix-ui/react-select";
import { Underline } from "lucide-react";
import UnderLine from "~/ui/components/underline/underline";

type Props = {};

const SearchpageSortSelector: React.FC<Props> = () => {
	const { sort } = useAppSelector((state) => state.searchPageReducer);
	const dispatch = useAppDispatch();

	const sortMap: Record<string, ISort> = {
		newerFirst: { sort_by: "date", sort_direction: "desc" },
		expensiveFirst: { sort_by: "price", sort_direction: "desc" },
		cheaperFirst: { sort_by: "price", sort_direction: "asc" },
		alphabet: { sort_by: "title", sort_direction: "asc" },
		alphabetReverse: { sort_by: "title", sort_direction: "desc" },
		byAuthor: { sort_by: "author", sort_direction: "asc" },
	};

	const handleValueChange = (value: string) => {
		const selectedSort = sortMap[value];
		if (selectedSort) {
			dispatch(setSort(selectedSort));
		}
	};

	return (
		<Select onValueChange={handleValueChange}>
			<SelectTrigger className="shadow-none w-fit [&>svg]:hidden px-0 focus:ring-0 md:w-full">
				<div className="flex flex-row w-full justify-between border-1 border-black-1000 px-2 py-1">
					<div className="hidden md:inline">Сортування</div>
					<SortIcon />
				</div>
			</SelectTrigger>
			<SelectContent className="w-full bg-white shadow-[0px_0px_4px_rgb(0,0,0,0.1)] outline px-0">
				<SelectItem
					className={"transition-all hover:bg-gray-100"}
					value="newerFirst">
					Спочатку новіші
				</SelectItem>
				<SelectItem
					className={"transition-all hover:bg-gray-100"}
					value="expensiveFirst">
					Спочатку дорожчі
				</SelectItem>
				<SelectItem
					className={"transition-all hover:bg-gray-100"}
					value="cheaperFirst">
					Спочатку дешевші
				</SelectItem>
				<SelectItem
					className={"transition-all hover:bg-gray-100"}
					value="alphabet">
					А-Я
				</SelectItem>
				<SelectItem
					className={"transition-all hover:bg-gray-100"}
					value="alphabetReverse">
					Я-А
				</SelectItem>
				<SelectItem
					className={"transition-all hover:bg-gray-100"}
					value="byAuthor">
					За автором
				</SelectItem>
			</SelectContent>
		</Select>
	);
};

export default SearchpageSortSelector;
