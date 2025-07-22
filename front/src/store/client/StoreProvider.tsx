"use client";

import { Provider } from "react-redux";
import { setupStore } from "~/store/client/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { useEffect } from "react";
import useDeviceWatcher from "~/ui/hooks/useDevice/useDeviceWatcher";

const store = setupStore();
const persistor = persistStore(store);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<DeviceWrapper>{children}</DeviceWrapper>
			</PersistGate>
		</Provider>
	);
};

// ⬇️ окремий клієнтський компонент, де викликається useDeviceWatcher
const DeviceWrapper = ({ children }: { children: React.ReactNode }) => {
	useDeviceWatcher();
	return <>{children}</>;
};
