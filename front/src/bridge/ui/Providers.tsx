"use client";
import { CrystallizeProvider } from "@crystallize/reactjs-hooks";
import { AppContextProvider } from "~/ui/app-context/provider";
import { store } from "~/store/client/store";
import { Provider } from "react-redux";

export function Providers({ translations, initialState, children }: any) {
	return (
		<AppContextProvider initialState={initialState} translations={translations}>
			<Provider store={store}>{children}</Provider>
		</AppContextProvider>
	);
}
