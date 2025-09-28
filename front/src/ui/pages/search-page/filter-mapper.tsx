"use client"
import React from 'react';
import {useAppDispatch, useAppSelector} from "~/store/client/hooks";
import {filterKeys} from "~/types/filter-types/filter";
import {removeFilter, removeSelectedCategoriesSlug, setSelectedPriceRange} from "~/store/client/slices/SearchPageSlice";
import DefaultTag from "~/ui/components/tag/default-tag";
import Hash from "~/assets/hash.svg";
import Cross from "~/assets/cross.svg";


type Props = {
    className?: string;
}
type TFilterItem = {
    value: string
    onDelete: () => void
}
const FilterMapper: React.FC<Props> = ({className}) => {
    const filterState = useAppSelector(state => state.searchPageReducer)
    const dispatch = useAppDispatch();
    let filterItems: TFilterItem[] = [];
    const price_range = filterState.selected_price_range
    const isPriceDiffer = price_range != null ? filterState.available_price_range.min_price !== price_range.min_price || filterState.available_price_range.max_price !== price_range.max_price : false
    if (price_range && isPriceDiffer) {
        filterItems.push({
            value: `${price_range.min_price}-${price_range.max_price}`,
            onDelete: () => {
                dispatch(setSelectedPriceRange(null))
            }
        })
    }
    const category = filterState.filters.category
    if(category.appliedCategoriesSlugs) {
        category.appliedCategoriesSlugs.forEach(appliedCategoriesSlug => {
            filterItems.push({
                value: appliedCategoriesSlug,
                onDelete: () => dispatch(removeSelectedCategoriesSlug({slug:appliedCategoriesSlug}))
            })
        })

    }
    for (const key of filterKeys) {
        const values = filterState.filters[key]
        values.forEach( filterValue => {
            if (filterValue.trim() !== "") {
                filterItems.push({
                    value: filterValue,
                    onDelete: () => dispatch(removeFilter({filterKey: key,filterValue:filterValue}))
                })
            }
        })

    }
    return (
        <div className={`w-full flex flex-row min-h-10 overflow-x-auto gap-5 flex-nowrap pb-2 mb-2 ${className}`}>
            {filterItems.length > 0 && <DefaultTag
                className={"border-none flex flex-row w-fit items-center flex-nowrap stroke-gray-950 gap-3 cursor-default"}>
                <p className={"text-nowrap"}>{"Очистити"}</p>
                <Cross height={20} width={20} className={"stroke-2 cursor-pointer"} onClick={() => {
                    filterItems.forEach((value) => value.onDelete())
                }}/>
            </DefaultTag>}
            {filterItems.map((value, index) =>
                <DefaultTag key={index} className={"border-none flex flex-row w-fit items-center flex-nowrap stroke-gray-950 gap-3 cursor-default"}>
                    <Hash height={16} width={16} className={""}/>
                    <p className={"text-nowrap"}>{value.value}</p>
                    <Cross height={20} width={20} className={"stroke-2 cursor-pointer"} onClick={() => {value.onDelete()}}/>
                </DefaultTag>)}
        </div>
    );
};

export default FilterMapper;
