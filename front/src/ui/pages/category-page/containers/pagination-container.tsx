"use client";

import { TPagination } from "~/types/pagination";
import ReusablePagination from "~/ui/components/reusable-pagination/reusable-pagination";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const PaginationContainer: React.FC<{ pagination: TPagination }> = ({
	pagination,
}) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const handleChangePageNumber = (pageNumber: number) => {
		if (!Number.isFinite(pageNumber) || pageNumber < 1) return;
		const params = new URLSearchParams(searchParams?.toString() || "");
		const currentPage = Number(params.get("page")) || 1;
		if (currentPage === pageNumber) return;
		params.set("page", String(pageNumber));
		const queryString = params.toString();
		router.push(queryString ? `${pathname}?${queryString}` : pathname);
	};

	return (
		<>
			<ReusablePagination
				goToPage={handleChangePageNumber}
				total_pages={pagination.total_pages}
				current_page={pagination.current_page}
			/>
		</>
	);
};

export default PaginationContainer;
