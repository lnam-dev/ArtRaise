import {TArtPiece} from "~/types";
import {useAppDispatch, useAppSelector} from "~/store/client/hooks";
import {IPagination, IPriceRange, setIsWaitingForResponse} from "~/store/client/slices/SearchPageSlice";
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
    const dispatch = useAppDispatch()
    const getSearchPage = async (signal?: AbortSignal): Promise<SearchPageSetup | null> => {
        try {
            const urlParams = getFilteredUrlParamsFromFilterState(searchState);
            dispatch(setIsWaitingForResponse(true));
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}search?${urlParams.toString()}`, {signal});
            if (response.ok) {
                const data = await response.json();
                router.push(`/ua/search/?${getFilteredUrlParamsFromFilterState(searchState)}`);
                dispatch(setIsWaitingForResponse(false));
                return {
                    artpieces: data.results,
                    pagination: data.pagination,
                    price_range: data.price_range,
                }
            }
            return null;
        } catch (e) {
            dispatch(setIsWaitingForResponse(false));
            return null;
        }

    }

    return {
        getSearchPage,
    }
}