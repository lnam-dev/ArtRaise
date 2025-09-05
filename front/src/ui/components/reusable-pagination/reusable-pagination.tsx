import React from "react";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "~/components/ui/pagination";

interface Props {
	current_page: number;
	goToPage: (page: number) => void;
	total_pages: number;
}

const ReusablePagination: React.FC<Props> = ({
	goToPage,
	total_pages,
	current_page,
}) => {
	if (total_pages <= 1) return null;

	const hasPreviousPage = current_page > 1;
	const hasNextPage = current_page < total_pages;

	const getPageNumbers = () => {
		const pages: (number | "ellipsis")[] = [];
		if (total_pages <= 7) {
			for (let page = 1; page <= total_pages; page++) pages.push(page);
		} else {
			pages.push(1);
			if (current_page > 4) pages.push("ellipsis");
			const start = Math.max(2, current_page - 1);
			const end = Math.min(total_pages - 1, current_page + 1);
			for (let page = start; page <= end; page++) pages.push(page);
			if (current_page < total_pages - 3) pages.push("ellipsis");
			pages.push(total_pages);
		}
		return pages;
	};

	return (
		<Pagination className="gap-1 pl-2.5">
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						className={`hidden md:flex ${!hasPreviousPage && "invisible"}`}
						onClick={() => hasPreviousPage && goToPage(current_page - 1)}
					/>
				</PaginationItem>
				{getPageNumbers().map((pageNumber, index) =>
					pageNumber === "ellipsis" ? (
						<PaginationEllipsis key={`ellipsis-${index}`} />
					) : (
						<PaginationItem key={pageNumber}>
							<PaginationLink
								isActive={current_page === pageNumber}
								onClick={() => goToPage(pageNumber)}>
								{pageNumber}
							</PaginationLink>
						</PaginationItem>
					)
				)}
				<PaginationItem>
					<PaginationNext
						className={`hidden md:flex ${!hasNextPage && "invisible"}`}
						onClick={() => hasNextPage && goToPage(current_page + 1)}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};

export default ReusablePagination;
