import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TFilterKeysValues} from "~/types/filter-types/filter";
import {TArtPiece} from "~/types";

//fields like type, material , and so on. Need to select multiply values of this filter
export type TFilterFields = {
    [key in TFilterKeysValues]: string[]
}

type TFilterKey = {
    name: string;
}
type TSortDirection = 'asc' | 'desc';
type TSortBy = 'title' | 'price' | 'date' | 'author'


export type TFilterKeys = {
    [key in TFilterKeysValues]: TFilterKey[]
}

export interface IPagination {
    current_page: number,
    total_pages: number,
    total_items: number,
    has_next: boolean,
    has_previous: boolean,
    page_size: number
}

export type TFilterCategoryKey = TFilterKey & { slug: string }

export interface IPriceRange {
    min_price: number
    max_price: number
}
export interface ISort {
    sort_by: TSortBy,
    sort_direction: TSortDirection,
}


export interface ISearchPageState {
    artpieces: TArtPiece[]
    pagination: IPagination
    available_price_range: IPriceRange,
    sort: ISort,
    filters: {
        query: string,
        category: {
            appliedCategoriesSlugs: string[],
            categoryKeysCounts: TFilterCategoryKey[],
        }
        price_range_filters: {
            min: number,
            max: number
        }
        filterKeys: TFilterKeys
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
    available_price_range: {
        min_price: 0,
        max_price: 100000,
    },
    sort: {
        sort_by: "date",
        sort_direction: "desc",
    },
    filters: {
        query: "",
        price_range_filters: {
            min: 0,
            max: 20000000
        },
        material: [],
        style: [],
        theme: [],
        category: {
            appliedCategoriesSlugs: [],
            categoryKeysCounts: [],
        },
        filterKeys: {
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
        setSelectedPriceRange: (state, action: PayloadAction<{ min: number, max: number }>) => {
            state.filters.price_range_filters.min = action.payload.min;
            state.filters.price_range_filters.max = action.payload.max;
        },
        setArtpieces: (state, action: PayloadAction<TArtPiece[]>) => {
            state.artpieces = action.payload;
        },
        appendFilter: (state, action: PayloadAction<{ filterKey: TFilterKeysValues, filterValue: string }>) => {
            const {filterKey, filterValue} = action.payload;
            const modifiedArray = Array.from(state.filters[filterKey]);
            modifiedArray.push(filterValue);
            state.filters[filterKey] = modifiedArray;
        },
        removeFilter: (state, action: PayloadAction<{ filterKey: TFilterKeysValues, filterValue: string }>) => {
            const {filterKey, filterValue} = action.payload;
            const modifiedArray = Array.from(state.filters[filterKey]);
            state.filters[filterKey] = modifiedArray.filter(filterVal => filterVal !== filterValue);
        },
        setupPagination: (state, action: PayloadAction<IPagination>) => {
            state.pagination = action.payload;
        },
        setupPriceRange: (state, action: PayloadAction<IPriceRange>) => {
            state.available_price_range = action.payload;
        },
        setSort: (state, action: PayloadAction<ISort>) => {
            state.sort = action.payload;
        },
        setupCurrentPage: (state, action: PayloadAction<number>) => {
            if (action.payload >= 1) {
                state.pagination.current_page = action.payload;
            }
        },
        setupCategoriesKeys: (state, action: PayloadAction<TFilterCategoryKey[]>) => {
            state.filters.category.categoryKeysCounts = action.payload;
        },
        appendSelectedCategoriesSlug: (state, action: PayloadAction<{ slug: string }>) => {
            const {slug} = action.payload;
            const modifiedArray = Array.from(state.filters.category.appliedCategoriesSlugs);
            modifiedArray.push(slug);
            state.filters.category.appliedCategoriesSlugs = modifiedArray;
        },
        setupFilterKeys: (state, action: PayloadAction<TFilterKeys>) => {
            state.filters.filterKeys = action.payload;
        },
        removeSelectedCategoriesSlug: (state, action: PayloadAction<{ slug: string }>) => {
            const {slug} = action.payload;
            const modifiedArray = Array.from(state.filters.category.appliedCategoriesSlugs).filter(s => s !== slug);;
            state.filters.category.appliedCategoriesSlugs = modifiedArray;
        },
    }
})

export const {
    setSort,
    removeSelectedCategoriesSlug,
    appendSelectedCategoriesSlug,
    setupCategoriesKeys,
    setTitle,
    setSelectedPriceRange,
    setArtpieces,
    setupCurrentPage,
    setupPriceRange,
    setupFilterKeys,
    appendFilter,
    removeFilter,
    setupPagination
} = SearchPageSlice.actions;
export default SearchPageSlice.reducer;