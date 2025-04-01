import SegmentTitle from "../segment-title/segment-title";
import FilterTag from "../filter-tag/filter-tag";
import SearchInput from "./search-input";
import { FC } from "react";

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
	return (
		<div
			className={`container flex flex-col gap-2 mx-auto ${className}`}
			{...props}>
			<SearchInput className="px-4 xl:px-0 mb-6" />
			<SegmentTitle className="px-4 xl:px-0 mb-8 hidden xl:block">
				Шукайте за тегами
			</SegmentTitle>
			<div className="flex gap-2 flex-nowrap overflow-x-auto scrollbar-hide max-w-full pl-4 xl:pl-0">
				{TAGS.map((tag) => (
					<FilterTag key={tag}>{tag}</FilterTag>
				))}
			</div>
		</div>
	);
};

export default SearchBar;
