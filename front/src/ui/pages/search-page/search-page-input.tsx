"use client"
import React from 'react';
import SearchInput from "~/ui/components/search-bar/search-input";
import {useAppDispatch, useAppSelector} from "~/store/client/hooks";
import {useRouter} from "next/navigation";
import {getFilteredUrlParamsFromObject} from "~/ui/pages/search-page/func";
import {TFilterKeys} from "~/types/filter-types/filter";
import {setTitle} from "~/store/client/slices/SearchPageSlice";

type Props = {
    className?: string;
}

const SearchPageInput: React.FC<Props> = ({className}) => {
    const dispatch = useAppDispatch();
    const searchPageState = useAppSelector(state => state.searchPageReducer)
    const setFilterTags = (key: TFilterKeys, value: string) => {
    }
    const searchFilterState = useAppSelector(state => state.searchPageReducer)
    const router = useRouter();
    // const queryParams = getFilteredUrlParamsFromObject(searchPageState.searchFilters).toString();
    return (
        <SearchInput className={`pl-2 ${className}`} setInputString={(titleValue) => dispatch(setTitle(titleValue))}
                     handleOnSearchClick={() => router.push(`/ua/search/?${getFilteredUrlParamsFromObject(searchFilterState)}`)}
                     searchString={searchPageState.title}/>
    );
};

export default SearchPageInput;
