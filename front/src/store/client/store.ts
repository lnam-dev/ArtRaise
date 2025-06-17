import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authorsPageReducer from "./slices/AuthorsPageSlice"
import searchPageReducer from "./slices/SearchPageSlice"


const rootReducer = combineReducers({
	authorsPageReducer,
	searchPageReducer
})

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		// middleware: (getDefaultMiddleware) => getDefaultMiddleware({
		// 	serializableCheck:false
		// }),//розкоментувати коли будть конфлікти з serialize types
	})
}
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
