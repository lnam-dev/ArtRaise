"use client";
import { CrystallizeProvider } from "@crystallize/reactjs-hooks";
import { AppContextProvider } from "~/ui/app-context/provider";
import {StoreProvider} from "~/store/client/StoreProvider";

export function Providers({ translations, initialState, children }: any) {
	return (
		<AppContextProvider initialState={initialState} translations={translations}>
			<StoreProvider>{children}</StoreProvider>
		</AppContextProvider>
	);
}
