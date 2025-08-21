import React from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from '~/components/ui/pagination';

interface Props {
    has_next: boolean;
    has_previous: boolean;
    current_page: number;
    goToPage: (page: number) => void;
    total_pages: number;
}

const ReusablePagination: React.FC<Props> = ({goToPage, total_pages, current_page}) => {
    const has_previous = current_page > 1
    const has_next = current_page < total_pages
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious className={`${!has_previous && "invisible"}`}
                                        onClick={() => has_previous && goToPage(current_page - 1)}
                    />
                </PaginationItem>

                {Array.from({length: total_pages}).map((_, paginationIndex) => (
                    <PaginationItem key={paginationIndex}>
                        <PaginationLink
                            isActive={current_page === paginationIndex + 1}
                            onClick={() => goToPage(paginationIndex + 1)}
                        >
                            {paginationIndex + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {total_pages > 5 && <PaginationEllipsis/>}
                <PaginationItem>
                    <PaginationNext
                        className={`${!has_next && "invisible"}`}
                        onClick={() => has_next && goToPage(current_page + 1)}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default ReusablePagination;
