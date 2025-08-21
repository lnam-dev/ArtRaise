import {useAppDispatch, useAppSelector} from "~/store/client/hooks";
import {setupCurrentPage} from "~/store/client/slices/SearchPageSlice";
import ReusablePagination from "~/ui/components/reusable-pagination/reusable-pagination";

export function SearchPagination() {
  const dispatch = useAppDispatch();
  const goToPage = async (page: number) => {
    dispatch(setupCurrentPage(page))
  };
  const {pagination} = useAppSelector(state => state.searchPageReducer);
  const {total_pages,current_page,has_next,has_previous} = pagination;
  return (
      <ReusablePagination has_next={has_next} has_previous={has_previous} goToPage={goToPage} total_pages={total_pages} current_page={current_page}/>
  );
}