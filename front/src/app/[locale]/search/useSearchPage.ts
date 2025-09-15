import {TArtPiece} from "~/types";
import {useAppSelector} from "~/store/client/hooks";
import {IPagination, IPriceRange} from "~/store/client/slices/SearchPageSlice";
import {getFilteredUrlParamsFromFilterState} from "~/ui/pages/search-page/func";
import {useRouter} from "next/navigation";
interface SearchPageSetup {
    pagination: IPagination;
    artpieces: TArtPiece[];
    price_range: IPriceRange;
}
export const useSearchPage = () => {
    const router = useRouter();
    //todo response ok checker
    const searchState = useAppSelector(state => state.searchPageReducer);
    const getSearchPage = async (): Promise<SearchPageSetup | null> => {
        const urlParams = getFilteredUrlParamsFromFilterState(searchState);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}search?${urlParams.toString()}`, {});
        const data = await response.json();
        router.push(`/ua/search/?${getFilteredUrlParamsFromFilterState(searchState)}`);
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