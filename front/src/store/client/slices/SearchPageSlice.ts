import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TFilterKeys} from "~/types/filter-types/filter";
import {TArtPiece} from "~/types";

//fields like type, material , and so on. Need to select multiply values of this filter
export type TFilterFields = {
    [key in TFilterKeys]: string[]
}
export type TFilterKeysValues = {
    [key in TFilterKeys]: {
        count: number,
        name: string,
    }[]
}

export interface IPagination {
    current_page: number,
    total_pages: number,
    total_items: number,
    has_next: boolean,
    has_previous: boolean,
    page_size: number
}

export interface IPriceRange {
    min_price: number
    max_price: number
}

export interface ISearchPageState {
    artpieces: TArtPiece[]
    pagination: IPagination
    price_range: IPriceRange,
    filters: {
        query: string,
        price_range: {
            min: number,
            max: number
        }
        filterKeysValues: TFilterKeysValues
    } & TFilterFields,
}

const initialState: ISearchPageState = {
    artpieces: [],
    pagination: {
        total_items: 0,
        current_page: 1,
        total_pages: 1,
        has_next: false,
        has_previous: false,
        page_size: 5
    },
    price_range: {
        min_price: 0,
        max_price: 100000,
    },
    filters: {
        query: "",
        price_range: {
            min: 0,
            max: 20000000
        },
        type: [],
        material: [],
        style: [],
        theme: [],
        filterKeysValues: {
            type: [],
            material: [],
            style: [],
            theme: [],
        }
    }
}

const SearchPageSlice = createSlice({
    name: "SearchPage",
    initialState: initialState,
    reducers: {
        setTitle: (state, action: PayloadAction<string>) => {
            state.filters.query = action.payload;
        },
        setPriceRange: (state, action: PayloadAction<{ min: number, max: number }>) => {
            state.filters.price_range.min = action.payload.min;
            state.filters.price_range.max = action.payload.max;
        },
        setArtpieces: (state, action: PayloadAction<TArtPiece[]>) => {
            state.artpieces = action.payload;
        },
        appendFilter: (state, action: PayloadAction<{ filterKey: TFilterKeys, filterValue: string }>) => {
            const {filterKey, filterValue} = action.payload;
            const modifiedArray = Array.from(state.filters[filterKey]);
            modifiedArray.push(filterValue);
            state.filters[filterKey] = modifiedArray;
        },
        removeFilter: (state, action: PayloadAction<{ filterKey: TFilterKeys, filterValue: string }>) => {
            const {filterKey, filterValue} = action.payload;
            const modifiedArray = Array.from(state.filters[filterKey]);
            state.filters[filterKey] = modifiedArray.filter(filterVal => filterVal !== filterValue);
        },
        setupFilterKeysValues: (state, action: PayloadAction<TFilterKeysValues>) => {
            state.filters.filterKeysValues = action.payload;
        },
        setupPagination: (state, action: PayloadAction<IPagination>) => {
            state.pagination = action.payload;
        },
        setupPriceRange: (state, action: PayloadAction<IPriceRange>) => {
            state.price_range = action.payload;
        },
        setupCurrentPage: (state, action: PayloadAction<number>) => {
            if (action.payload >= 1) {
                state.pagination.current_page = action.payload;
            }
        },
    }
})

export const {
    setTitle,
    setPriceRange,
    setArtpieces,
    setupCurrentPage,
    setupPriceRange,
    appendFilter,
    removeFilter,
    setupFilterKeysValues,
    setupPagination
} = SearchPageSlice.actions;
export default SearchPageSlice.reducer;