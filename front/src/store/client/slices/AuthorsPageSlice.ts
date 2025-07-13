import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useState } from "react";
import { TAuthor } from "~/types";
import {
	getFirstLettersOfAuthorsName,
	getMapOfLettersAuthors,
} from "~/app/[locale]/authors/functionsAuthor";

export interface IAuthorsPageState {
	availableLetters: string[];
	selectedLetterIndex: number;
	mapLetterAuthor: Record<string, TAuthor[]>;
	allAuthors: TAuthor[];
}
const initialState: IAuthorsPageState = {
	selectedLetterIndex: -1, //-1 mean that all no one selected(all display without filter)
	availableLetters: [],
	mapLetterAuthor: {},
	allAuthors: [],
};

export const authorsPageSlice = createSlice({
	name: "AuthorsPage",
	initialState,
	reducers: {
		setSelectedLetterIndex: (state, action: PayloadAction<number>) => {
			const isSelectedLetter = action.payload >= 0;
			state.selectedLetterIndex = action.payload;
			const authors = Array.from(state.allAuthors);
			state.mapLetterAuthor = getMapOfLettersAuthors(
				authors,
				isSelectedLetter
					? [state.availableLetters[action.payload]]
					: state.availableLetters
			);
		},
		setAvailableLetters: (state, action: PayloadAction<string[]>) => {
			state.availableLetters = action.payload;
		},
		setAuthors: (state, action: PayloadAction<TAuthor[]>) => {
			state.allAuthors = action.payload;
			const updatedAvailableLetters = getFirstLettersOfAuthorsName([
				...action.payload,
			]);
			console.log(updatedAvailableLetters);
			state.availableLetters = updatedAvailableLetters;
			state.mapLetterAuthor = getMapOfLettersAuthors(
				[...action.payload],
				updatedAvailableLetters
			);
		},
	},
});
export const { setSelectedLetterIndex, setAvailableLetters, setAuthors } =
	authorsPageSlice.actions;
export default authorsPageSlice.reducer;
