"use client"
import React, {useEffect} from 'react';
import Accordion from "~/ui/components/accordion/accordion";
import FilterTag from "~/ui/components/tag/filter-tag/filter-tag";
import {useAppDispatch, useAppSelector} from "~/store/client/hooks";
import {
    appendFilter, appendSelectedCategoriesSlug,
    removeFilter, removeSelectedCategoriesSlug, setArtpieces, setPriceRange,
    setTitle, setupCategoriesKeys, setupCurrentPage,
    setupFilterKeysCounts, setupPagination, setupPriceRange, TFilterCategoryKeyCount,
    TFilterKeysCounts
} from "~/store/client/slices/SearchPageSlice";
import {useSearchParams} from "next/navigation";
import {filterKeys} from "~/types/filter-types/filter";
import {useSearchPage} from "~/app/[locale]/search/useSearchPage";
import {Slider} from "~/components/ui/slider";
import {DualRangeSlider} from "~/components/ui/dual-range-slider";
import {dtoObjHasCategoriesWithSlugNameUaCount} from "~/ui/pages/search-page/func";

type Props = {
    className?: string;
}
const FilterMenu: React.FC<Props> = ({className}) => {
    const msDebounceDelay = 500;
    const searchParams = useSearchParams();
    const dispatch = useAppDispatch()
    const filterState = useAppSelector(state => state.searchPageReducer)
    //set filters state when refresh page by parsing url
    const {getSearchPage} = useSearchPage()
    useEffect(() => {
        const setupCountOfEachFilter = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}artpieces/stats/`);
            const categoryResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}artpieces/categories/`);
            if (response.ok && categoryResponse.ok) {
                const keyValues : TFilterKeysCounts = await response.json() as TFilterKeysCounts;
                const categoriesDto = await categoryResponse.json();
                if(dtoObjHasCategoriesWithSlugNameUaCount(categoriesDto)) {
                    const categories : TFilterCategoryKeyCount[] =  categoriesDto.categories.map((category) => ({slug: category.slug, name: category.name_ua, count: category.count})).filter(category => category.count > 0);
                    dispatch(setupCategoriesKeys(categories))
                    dispatch(setupFilterKeysCounts(keyValues));
                }
            }
        }
        const getInitialFiltersFromUrl = () => {
            dispatch(setTitle(searchParams.get("title") ?? ""));
            dispatch(setupPagination({...filterState.pagination,current_page : Number(searchParams.get("page")) ?? 1 ,page_size: Number(searchParams.get("page_size")) ?? 10}))
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
        setupCountOfEachFilter()
        getInitialFiltersFromUrl();
        //TODO price
    }, []);
    useEffect(() => {
        dispatch(setupCurrentPage(1));
        const timeoutId = setTimeout(async () => {
            const response = await getSearchPage()
            if (response) {
                const {artpieces, pagination, price_range} = response
                dispatch(setArtpieces(artpieces));
                dispatch(setupPagination(pagination));
                dispatch(setupPriceRange(price_range));
            }
        }, msDebounceDelay)
        return () => clearTimeout(timeoutId);
    }, [filterState.filters]);
    useEffect(() => {
        const getPage = async () => {
            const response = await getSearchPage()
            if (response) {
                const {artpieces} = response
                dispatch(setArtpieces(artpieces));
            }
        }
        getPage();
    }, [filterState.pagination.current_page]);

    return (
        <div className={` ${className}`}>
            <Accordion title={"Категорія"}>
                <div className={"flex w-full flex-wrap gap-3 mt-4"}>
                    {
                        filterState.filters.category.categoryKeysCounts.map((filter) => {
                            const isSelected = filterState.filters.category.appliedCategoriesSlugs.includes(filter.slug);
                            const handleOnClick = () => {
                                if (!isSelected) {
                                    dispatch(appendSelectedCategoriesSlug({slug: filter.slug}));
                                } else {
                                    dispatch(removeSelectedCategoriesSlug({slug: filter.slug}));
                                }
                            }
                            return (
                                <FilterTag key={filter.name} className={`py-1`} onClick={handleOnClick}
                                           isSelected={isSelected}>
                                    {`${filter.name}(${filter.count})`}
                                </FilterTag>
                            )
                        })
                    }

                </div>
            </Accordion>
            <Accordion title={"Стиль"}>
                <div className={"flex w-full flex-wrap gap-3 mt-4"}>
                    {
                        filterState.filters.filterKeysCounts.style.map((filter) => {
                            const isSelected = filterState.filters.style.includes(filter.name);
                            const handleOnClick = () => {
                                if (!isSelected) {
                                    dispatch(appendFilter({filterKey: 'style', filterValue: filter.name}))
                                } else {
                                    dispatch(removeFilter({filterKey: 'style', filterValue: filter.name}))
                                }
                            }
                            return (
                                <FilterTag key={filter.name} className={`py-1`} onClick={handleOnClick}
                                           isSelected={isSelected}>
                                    {`${filter.name}(${filter.count})`}
                                </FilterTag>
                            )
                        })
                    }

                </div>
            </Accordion>
            <Accordion title={"Тема"}>
                <div className={"flex w-full flex-wrap gap-3 mt-4"}>
                    {
                        filterState.filters.filterKeysCounts.theme.map((filter) => {
                            const isSelected = filterState.filters.theme.includes(filter.name);
                            const handleOnClick = () => {
                                if (!isSelected) {
                                    dispatch(appendFilter({filterKey: 'theme', filterValue: filter.name}))
                                } else {
                                    dispatch(removeFilter({filterKey: 'theme', filterValue: filter.name}))
                                }
                            }
                            return (
                                <FilterTag key={filter.name} className={`py-1`} onClick={handleOnClick}
                                           isSelected={isSelected}>
                                    {`${filter.name}(${filter.count})`}
                                </FilterTag>
                            )
                        })
                    }

                </div>
            </Accordion>
            <Accordion title={"Ціна"}>
                <div className="px-4 py-2 w-full bg-gray-700">
                    <DualRangeSlider
                        className={"w-56 bg-black-1000 rounded-full"}
                        min={filterState.available_price_range.min_price}
                        max={filterState.available_price_range.max_price}
                        step={100}
                        value={[filterState.filters.price_range_filters.min, filterState.filters.price_range_filters.max]}
                        onValueChange={([min,max]) => {
                            dispatch(setPriceRange({min: min, max: max}))
                        }}
                    />
                </div>
            </Accordion>
            <Accordion title={"Матеріал"}>
                <div>hello</div>
            </Accordion>
            <Accordion title={"Засіб вираження"}>
                <div>hello</div>
            </Accordion>
            <Accordion title={"Розмір"}>
                <div>hello</div>
            </Accordion>
            <Accordion title={"Колір"}>
                <div>hello</div>
            </Accordion>
        </div>
    );
};

export default FilterMenu;
