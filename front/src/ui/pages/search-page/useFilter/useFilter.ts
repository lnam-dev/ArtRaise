import {
    appendFilter, ISort,
    setSelectedPriceRange, setSort, setTitle,
    setupCategoriesKeys,
    setupPagination,
    TFilterCategoryKeyCount
} from "~/store/client/slices/SearchPageSlice";
import {dtoObjHasCategoriesWithSlugNameUaCount} from "~/ui/pages/search-page/func";
import {useSearchPage} from "~/app/[locale]/search/useSearchPage";
import {useAppDispatch, useAppSelector} from "~/store/client/hooks";
import {useSearchParams} from "next/navigation";
import {filterKeys} from "~/types/filter-types/filter";


export const useFilter = () => {
    const {getSearchPage} = useSearchPage()
    const dispatch = useAppDispatch()
    const searchParams = useSearchParams();
    const filterState = useAppSelector(state => state.searchPageReducer)

    const setupFiltersKeys = async () => {
        const categoryResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}artpieces/categories/`);
        const setup = await getSearchPage();
        if (setup?.price_range) dispatch(setSelectedPriceRange({
            min: setup.price_range.min_price,
            max: setup.price_range.max_price
        }));
        if (categoryResponse.ok) {
            const categoriesDto = await categoryResponse.json();
            if (dtoObjHasCategoriesWithSlugNameUaCount(categoriesDto)) {
                const categories: TFilterCategoryKeyCount[] = categoriesDto.categories.map((category) => ({
                    slug: category.slug,
                    name: category.name_ua,
                    count: category.count
                })).filter(category => category.count > 0);
                dispatch(setupCategoriesKeys(categories))
            }
        }
    }
    const getInitialFiltersFromUrl = () => {
        dispatch(setTitle(searchParams.get("title") ?? ""));
        dispatch(setupPagination({
            ...filterState.pagination,
            current_page: Number(searchParams.get("page")) ?? 1,
            page_size: Number(searchParams.get("page_size")) ?? 10
        }))
        //setup init sort values
        if (searchParams.get("sort_direction") && searchParams.get("sort_by")) dispatch(setSort({
            sort_direction: searchParams.get("sort_direction"),
            sort_by: searchParams.get("sort_by")
        } as ISort))
        //setup init category
        if (searchParams.get("category")) dispatch(setSort({
            sort_direction: searchParams.get("sort_direction"),
            sort_by: searchParams.get("sort_by")
        } as ISort))
        //get params from current URL
        for (const key of filterKeys) {
            const filterKeys = searchParams.getAll(key)//get all params that appear in url
            filterKeys.forEach(filterValue => {
                if (filterValue.trim() !== "") {
                    dispatch(appendFilter({filterKey: key, filterValue: filterValue}))
                }
            })

        }
    }
    return {
        setupFiltersKeys,
        getInitialFiltersFromUrl
    }
}