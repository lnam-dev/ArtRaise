import {TArtPiece} from "~/types";
import {useAppDispatch, useAppSelector} from "~/store/client/hooks";
import {useSearchParams} from "next/navigation";
import {IPagination, IPriceRange} from "~/store/client/slices/SearchPageSlice";
import {getFilteredUrlParamsFromFilterState} from "~/ui/pages/search-page/func";
interface SearchPageSetup {
    pagination: IPagination;
    artpieces: TArtPiece[];
    price_range: IPriceRange;
}
export const useSearchPage = () => {
    const searchState = useAppSelector(state => state.searchPageReducer);
    const getSearchPage = async (): Promise<SearchPageSetup | null> => {
        const urlParams = getFilteredUrlParamsFromFilterState(searchState);
        console.log(urlParams.toString());
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}search?${urlParams.toString()}`, {});
        const data = await response.json();
        return {
            artpieces: data.results,
            pagination: data.pagination,
            price_range: data.price_range,
        }
    }

    return {
        getSearchPage,

    }
}