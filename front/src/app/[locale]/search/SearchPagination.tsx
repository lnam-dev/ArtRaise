import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import {useAppDispatch, useAppSelector} from "~/store/client/hooks";
import {setupCurrentPage} from "~/store/client/slices/SearchPageSlice";

export function SearchPagination() {
  const dispatch = useAppDispatch();
  const goToPage = async (page: number) => {
    dispatch(setupCurrentPage(page))
  };
  const {pagination} = useAppSelector(state => state.searchPageReducer);
  const {total_pages,current_page,has_next,has_previous} = pagination;
  return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
                onClick={() => has_previous && goToPage(current_page - 1)}
            />
          </PaginationItem>

          {Array.from({length: total_pages}).map((_, paginationIndex) => (
              <PaginationItem key={paginationIndex}>
                <PaginationLink
                    isActive={current_page === paginationIndex + 1}
                    onClick={() => goToPage(paginationIndex + 1)}
                >
                  {paginationIndex+1}
                </PaginationLink>
              </PaginationItem>
          ))}

          {total_pages > 5 && <PaginationEllipsis />}
          <PaginationItem>
            <PaginationNext
                onClick={() => has_next && goToPage(current_page + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
  );
}