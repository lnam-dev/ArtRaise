"use client"
import React from 'react';
import {useAppDispatch, useAppSelector} from "~/store/client/hooks";
import {filterKeys} from "~/types/filter-types/filter";
import {removeFilter} from "~/store/client/slices/SearchPageSlice";
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
    for (const key of filterKeys) {
        const values = filterState[key]
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
