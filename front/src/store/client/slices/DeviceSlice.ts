import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DeviceState {
	isMobile: boolean;
	isTablet: boolean;
	isDesktop: boolean;
	currentDevice: "mobile" | "tablet" | "desktop";
	containerWidth: number;
	screenWidth: number;
	marginsAuto: number;
}

const initialState: DeviceState = {
	isMobile: false,
	isTablet: false,
	isDesktop: false,
	currentDevice: "desktop",
	containerWidth: 0,
	screenWidth: 0,
	marginsAuto: 0,
};

export const deviceSlice = createSlice({
	name: "device",
	initialState,
	reducers: {
		setDeviceState: (state, action: PayloadAction<DeviceState>) => {
			return action.payload;
		},
	},
});

export const { setDeviceState } = deviceSlice.actions;
export default deviceSlice.reducer;
