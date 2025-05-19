import {ISearchPageState} from "~/store/client/slices/SearchPageSlice";
import {FilterKeyEnum, TFilterKeys} from "~/types/filter-types/filter";
import {TFilterFields} from "~/store/client/slices/SearchPageSlice";

export const getFilteredUrlParamsFromObject = (object: ISearchPageState): URLSearchParams => {
    const params = new URLSearchParams();
    if (object.title) {
        params.append("title", object.title)
    }
    if (object.price_range.min && object.price_range.max) {
        params.append("price_range", `${object.price_range.min},${object.price_range.max}`);
    }

    const filterKeys = Object.values(FilterKeyEnum)
    for (const key of filterKeys) {
        const filterValue = object[key];//array of filters values
        if(filterValue.trim() !== "") {
            params.append(key, filterValue);
        }
    }
    new URLSearchParams(params)
    return new URLSearchParams(params)
}