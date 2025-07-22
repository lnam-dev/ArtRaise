"use client";

import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { getDeviceInfo } from "~/store/client/utils/getDeviceInfo";
import { setDeviceState } from "~/store/client/slices/DeviceSlice";

const useDeviceWatcher = () => {
	const dispatch = useDispatch();

	const updateDeviceState = () => {
		const info = getDeviceInfo();
		dispatch(setDeviceState(info));
	};

	useLayoutEffect(() => {
		updateDeviceState();

		const handleResize = () => {
			updateDeviceState();
		};

		window.addEventListener("resize", handleResize);

		const mqMobile = window.matchMedia("(max-width: 767px)");
		const mqTablet = window.matchMedia(
			"(min-width: 768px) and (max-width: 1344px)"
		);
		const mqDesktop = window.matchMedia("(min-width: 1345px)");

		mqMobile.addEventListener("change", handleResize);
		mqTablet.addEventListener("change", handleResize);
		mqDesktop.addEventListener("change", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
			mqMobile.removeEventListener("change", handleResize);
			mqTablet.removeEventListener("change", handleResize);
			mqDesktop.removeEventListener("change", handleResize);
		};
	}, []);
};

export default useDeviceWatcher;
