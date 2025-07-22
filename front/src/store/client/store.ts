import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authorsPageReducer from "./slices/AuthorsPageSlice";
import searchPageReducer from "./slices/SearchPageSlice";
import deviceReducer from "./slices/DeviceSlice";

const devicePersistConfig = {
	key: "device",
	storage,
	whitelist: [
		"isMobile",
		"isTablet",
		"isDesktop",
		"currentDevice",
		"containerWidth",
		"screenWidth",
		"marginsAuto",
	],
};

const rootReducer = combineReducers({
	authorsPageReducer,
	searchPageReducer,
	deviceReducer: persistReducer(devicePersistConfig, deviceReducer),
});

export const setupStore = () =>
	configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: {
					ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
				},
			}),
		// middleware: (getDefaultMiddleware) => getDefaultMiddleware({
		// 	serializableCheck:false
		// }),//розкоментувати коли будть конфлікти з serialize types
	});

export const store = setupStore();
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
