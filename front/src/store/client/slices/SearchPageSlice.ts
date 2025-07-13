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

export interface ISearchPageState  {
    displayArtpieces: TArtPiece[]
    allArtpieces: TArtPiece[]
    artPiecesCount: number
    previewArtPiecesCount: number
    currentPage: number
    countPage: number
    filters: {
        query: string,
        price_range: {
            min: number,
            max: number
        }
        filterKeysValues: TFilterKeysValues
    }& TFilterFields,
}

const initialState: ISearchPageState = {
    allArtpieces: [],
    displayArtpieces: [],
    countPage: 0,
    currentPage: 0,
    artPiecesCount: 0, //count of current artpieces displayed
    previewArtPiecesCount: 0, //count of artpieces, that match filter state , but not currently displayed(used for preview count artpieces)
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
        setupDisplayedArtpieces: (state, action: PayloadAction<TArtPiece[]>) => {
            state.displayArtpieces = action.payload;
        },
        setPreviewArtpiecesCount: (state, action: PayloadAction<number>) => {
            state.previewArtPiecesCount = action.payload;
        },

    }
})

export const {setTitle, setPriceRange, appendFilter, removeFilter, setupFilterKeysValues,setupDisplayedArtpieces,setPreviewArtpiecesCount} = SearchPageSlice.actions;
export default SearchPageSlice.reducer;