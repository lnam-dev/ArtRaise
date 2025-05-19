import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TFilterKeys} from "~/types/filter-types/filter";

//fields like type, material , and so on. Need to select multiply values of this filter
export type TFilterFields = {
    [key in TFilterKeys]: string
}

export  interface ISearchPageState extends TFilterFields {
    title: string,
    price_range: {
        min: number,
        max: number
    },
}

const initialState: ISearchPageState = {
    title: "",
    price_range: {
        min: 0,
        max: 20000000
    },
    type: "",
    material: "",
    style: "",
    theme: ""
}

const SearchPageSlice = createSlice({
    name: "SearchPage",
    initialState: initialState,
    reducers: {
        setTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload;
        },
        setPriceRange: (state, action: PayloadAction<{ min: number, max: number }>) => {
            state.price_range.min = action.payload.min;
            state.price_range.max = action.payload.max;
        },
        appendFilter: (state, action: PayloadAction<{ filterKey: TFilterKeys, filterValue: string}>) => {
            const {filterKey,filterValue} = action.payload;
            state[filterKey] = filterValue;
        },
        removeFilter: (state, action: PayloadAction<{ filterKey: TFilterKeys}>) => {
            const {filterKey} = action.payload;
            state[filterKey] = "";
        },
    }
})

export const {setTitle,setPriceRange,appendFilter,removeFilter} = SearchPageSlice.actions;
export default SearchPageSlice.reducer;