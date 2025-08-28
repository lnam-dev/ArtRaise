import {ISearchPageState} from "~/store/client/slices/SearchPageSlice";
import { filterKeys} from "~/types/filter-types/filter";
import {TArtPiece} from "~/types";

export const getFilteredUrlParamsFromFilterState = (object: ISearchPageState): URLSearchParams => {
    const params = new URLSearchParams();
    if (object.filters.query) {
        params.append("q", object.filters.query)
    }
    if (object.filters.price_range_filters.min && object.filters.price_range_filters.min !== object.available_price_range.min_price) params.append("price_min", `${object.filters.price_range_filters.min}`);
    if (object.filters.price_range_filters.max && object.filters.price_range_filters.max !== object.available_price_range.max_price) params.append("price_max", `${object.filters.price_range_filters.max}`);

    const isAnyCategorySelected = object.filters.category.appliedCategoriesSlugs.length > 0
    if (isAnyCategorySelected) {
        object.filters.category.appliedCategoriesSlugs.forEach(slug => {
            params.append("category", slug);
        })
    }
    if(object.sort) {
        params.append("sort_by", object.sort.sort_by)
        params.append("sort_direction", object.sort.sort_direction)
    }


    for (const key of filterKeys) {
        const filterValues = object.filters[key];//array of filters values
        filterValues.forEach(filterValue => {
            if(filterValue.trim() !== "") {
                params.append(key, filterValue);
            }
        });

    }
    params.append("page", object.pagination.current_page.toString());
    params.append("page_size", object.pagination.page_size.toString());
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
//this typeguard if dto from /api/aripieces/categories is correct
export const dtoObjHasCategoriesWithSlugNameUaCount = (
    obj: unknown
): obj is { categories: { slug: string; name_ua: string, count: number }[] } => {
    return (
        typeof obj === "object" &&
        obj !== null &&
        "categories" in obj &&
        Array.isArray((obj as any).categories) &&
        (obj as any).categories.every(
            (cat: any) =>
                typeof cat === "object" &&
                cat !== null &&
                typeof cat.slug === "string" &&
                typeof cat.count === "number" &&
                typeof cat.name_ua === "string"
        )
    );
};
