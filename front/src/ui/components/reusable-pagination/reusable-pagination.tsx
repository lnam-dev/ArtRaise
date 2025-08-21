import React from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from '~/components/ui/pagination';

interface Props {
    current_page: number;
    goToPage: (page: number) => void;
    total_pages: number;
}

const ReusablePagination: React.FC<Props> = ({ goToPage, total_pages, current_page }) => {
    const has_previous = current_page > 1;
    const has_next = current_page < total_pages;

    const getPageNumbers = () => {
        const pages: (number | 'ellipsis')[] = [];

        if (total_pages <= 7) {
            // Show all pages if small
            for (let i = 1; i <= total_pages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            // Show ellipsis if current_page is far from start
            if (current_page > 4) pages.push('ellipsis');

            // Show middle pages
            const start = Math.max(2, current_page - 1);
            const end = Math.min(total_pages - 1, current_page + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            // Show ellipsis if current_page is far from end
            if (current_page < total_pages - 3) pages.push('ellipsis');

            // Always show last page
            pages.push(total_pages);
        }

        return pages;
    };

    return (
        <Pagination className="gap-1 pl-2.5">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        className={`hidden md:flex ${!has_previous && 'invisible'}`}
                        onClick={() => has_previous && goToPage(current_page - 1)}
                    />
                </PaginationItem>

                {getPageNumbers().map((page, index) =>
                    page === 'ellipsis' ? (
                        <PaginationEllipsis key={`ellipsis-${index}`} />
                    ) : (
                        <PaginationItem key={page}>
                            <PaginationLink
                                isActive={current_page === page}
                                onClick={() => goToPage(page)}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    )
                )}

                <PaginationItem>
                    <PaginationNext
                        className={`hidden md:flex ${!has_next && 'invisible'}`}
                        onClick={() => has_next && goToPage(current_page + 1)}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default ReusablePagination;
