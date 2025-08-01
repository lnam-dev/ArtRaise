"use client"
import React, {useEffect} from 'react';
import Accordion from "~/ui/components/accordion/accordion";
import FilterTag from "~/ui/components/tag/filter-tag/filter-tag";
import {useAppDispatch, useAppSelector} from "~/store/client/hooks";
import {
    appendFilter, ISearchPageState,
    removeFilter, setArtpieces,
    setTitle, setupCurrentPage,
    setupFilterKeysValues, setupPagination, setupPriceRange,
    TFilterKeysValues
} from "~/store/client/slices/SearchPageSlice";
import {useSearchParams} from "next/navigation";
import {filterKeys} from "~/types/filter-types/filter";
import {getArtpiecesByQueryParams, getFilteredUrlParamsFromFilterState} from "~/ui/pages/search-page/func";
import {useSearchPage} from "~/app/[locale]/search/useSearchPage";

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
            if (response.ok) {
                dispatch(setupFilterKeysValues(await response.json() as TFilterKeysValues));
            }
        }
        const getInitialFiltersFromUrl = () => {
            dispatch(setTitle(searchParams.get("title") ?? ""));
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
        const timeoutId = setTimeout(async () => {
            const response = await getSearchPage()
            if (response) {
                const {artpieces} = response
                dispatch(setArtpieces(artpieces));
            }
        }, msDebounceDelay)
        return () => clearTimeout(timeoutId);
    }, [filterState.pagination.current_page]);
    return (
        <div className={` ${className}`}>
            <Accordion title={"Категорія"}>
                <div className={"flex w-full flex-wrap gap-3 mt-4"}>
                    {
                        filterState.filters.filterKeysValues.type.map((filter) => {
                            const isSelected = filterState.filters.type.includes(filter.name);
                            const handleOnClick = () => {
                                if (!isSelected) {
                                    dispatch(appendFilter({filterKey: 'type', filterValue: filter.name}))
                                } else {
                                    dispatch(removeFilter({filterKey: 'type', filterValue: filter.name}))
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
                        filterState.filters.filterKeysValues.style.map((filter) => {
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
                        filterState.filters.filterKeysValues.theme.map((filter) => {
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
                <div className={"w-fit"}>hello</div>
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
