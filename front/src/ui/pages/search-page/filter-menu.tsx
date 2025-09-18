"use client"
import React, {useEffect} from 'react';
import Accordion from "~/ui/components/accordion/accordion";
import FilterTag from "~/ui/components/tag/filter-tag/filter-tag";
import {useAppDispatch, useAppSelector} from "~/store/client/hooks";
import {
    appendFilter, appendSelectedCategoriesSlug,
    removeFilter, removeSelectedCategoriesSlug, setArtpieces, setSelectedPriceRange, setupCurrentPage, setupPagination, setupPriceRange,
} from "~/store/client/slices/SearchPageSlice";
import {useSearchPage} from "~/app/[locale]/search/useSearchPage";
import {DualRangeSlider} from "~/components/ui/dual-range-slider";
import SearchpageSortSelector from "~/ui/pages/search-page/searchpage-sort-selector";

type Props = {
    className?: string;
}
const FilterMenu: React.FC<Props> = ({className}) => {
    const msDebounceDelay = 500;
    const dispatch = useAppDispatch()
    const filterState = useAppSelector(state => state.searchPageReducer)
    const {getSearchPage} = useSearchPage()


    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            dispatch(setupCurrentPage(1));
            const response = await getSearchPage()
            console.log('get search page')
            if (response) {
                const {artpieces, pagination, price_range} = response
                dispatch(setArtpieces(artpieces));
                dispatch(setupPagination(pagination));
                dispatch(setupPriceRange(price_range));
            }
        }, msDebounceDelay)
        return () => clearTimeout(timeoutId);
    }, [filterState.filters, filterState.sort]);


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
        <div className={` ${className}`} onClick={(e)=> {
            e.preventDefault()
            e.stopPropagation()
        }}>
            <span className={"hidden md:block"}><SearchpageSortSelector/></span>
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
                                    {`${filter.name}`}
                                </FilterTag>
                            )
                        })
                    }

                </div>
            </Accordion>
            <Accordion title={"Стиль"}>
                <div className={"flex w-full flex-wrap gap-3 mt-4"}>
                    {
                        filterState.filters.filterKeys.style.map((filter) => {
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
                                    {`${filter.name}`}
                                </FilterTag>
                            )
                        })
                    }

                </div>
            </Accordion>
            <Accordion title={"Тема"}>
                <div className={"flex w-full flex-wrap gap-3 mt-4"}>
                    {
                        filterState.filters.filterKeys.theme.map((filter) => {
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
                                    {`${filter.name}`}
                                </FilterTag>
                            )
                        })
                    }

                </div>
            </Accordion>
            <Accordion title={"Матеріал"}>
                <div className={"flex w-full flex-wrap gap-3 mt-4"}>
                    {
                        filterState.filters.filterKeys.material.map((filter) => {
                            const isSelected = filterState.filters.material.includes(filter.name);
                            const handleOnClick = () => {
                                if (!isSelected) {
                                    dispatch(appendFilter({filterKey: 'material', filterValue: filter.name}))
                                } else {
                                    dispatch(removeFilter({filterKey: 'material', filterValue: filter.name}))
                                }
                            }
                            return (
                                <FilterTag key={filter.name} className={`py-1`} onClick={handleOnClick}
                                           isSelected={isSelected}>
                                    {`${filter.name}`}
                                </FilterTag>
                            )
                        })
                    }

                </div>
            </Accordion>
            <Accordion title={"Ціна"}>
                <div className="px-4 py-2 w-full">
                    <div className={'w-full flex flex-row justify-between'}>
                        <p>{filterState.filters.price_range_filters.min_price}</p>
                        <p>{filterState.filters.price_range_filters.max_price}</p>
                    </div>
                    <DualRangeSlider
                        className={"w-full"}
                        min={filterState.available_price_range.min_price}
                        max={filterState.available_price_range.max_price}
                        step={100}
                        value={[filterState.filters.price_range_filters.min_price, filterState.filters.price_range_filters.max_price]}
                        onValueChange={([min,max]) => {
                            dispatch(setSelectedPriceRange({min_price: min, max_price: max}))
                        }}
                    />
                </div>
            </Accordion>
        </div>
    );
};

export default FilterMenu;
