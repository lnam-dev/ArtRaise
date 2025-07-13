import {ISearchPageState} from "~/store/client/slices/SearchPageSlice";
import { filterKeys} from "~/types/filter-types/filter";
import {TArtPiece} from "~/types";

export const getFilteredUrlParamsFromFilterState = (object: ISearchPageState): URLSearchParams => {
    const params = new URLSearchParams();
    if (object.filters.query) {
        params.append("q", object.filters.query)
    }
    if (object.filters.price_range.min && object.filters.price_range.max) {
        params.append("price_range", `${object.filters.price_range.min},${object.filters.price_range.max}`);
    }


    for (const key of filterKeys) {
        const filterValues = object.filters[key];//array of filters values
        filterValues.forEach(filterValue => {
            if(filterValue.trim() !== "") {
                params.append(key, filterValue);
            }
        });

    }
    new URLSearchParams(params)
    return new URLSearchParams(params)
}
export const getArtpiecesByQueryParams = async (queryParams: string): Promise<TArtPiece[]> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}search?${queryParams}`);
        if (!response.ok) {
            return [];
        }
        const artPieces:TArtPiece[] = (await response.json()).results;
        return Array.isArray(artPieces) ? artPieces : [];
    } catch (error) {
        console.log(error)
        return []
    }
}