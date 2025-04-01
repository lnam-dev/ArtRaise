import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IAuthorsPageState {
}
const initialState: IAuthorsPageState = {
}

export const authorsPageSlice = createSlice({
    name: "AuthorsPage",
    initialState,
    reducers: {

    }
})
export const {} = authorsPageSlice.actions;
export default authorsPageSlice.reducer
