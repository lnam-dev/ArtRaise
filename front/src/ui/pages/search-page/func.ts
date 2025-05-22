import {ISearchPageState} from "~/store/client/slices/SearchPageSlice";
import { filterKeys} from "~/types/filter-types/filter";

export const getFilteredUrlParamsFromObject = (object: ISearchPageState): URLSearchParams => {
    const params = new URLSearchParams();
    if (object.title) {
        params.append("title", object.title)
    }
    if (object.price_range.min && object.price_range.max) {
        params.append("price_range", `${object.price_range.min},${object.price_range.max}`);
    }


    for (const key of filterKeys) {
        const filterValues = object[key];//array of filters values
        filterValues.forEach(filterValue => {
            if(filterValue.trim() !== "") {
                params.append(key, filterValue);
            }
        });

    }
    new URLSearchParams(params)
    return new URLSearchParams(params)
}