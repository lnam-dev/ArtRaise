export const getDeviceInfo =
	(): import("../slices/DeviceSlice").DeviceState => {
		const screenWidth = window.innerWidth;
		const isMobile = screenWidth <= 768;
		const isTablet = screenWidth > 768 && screenWidth <= 992;
		const isDesktop = screenWidth > 1344;

		let currentDevice: "mobile" | "tablet" | "desktop" = "desktop";
		if (isMobile) currentDevice = "mobile";
		else if (isTablet) currentDevice = "tablet";

		const container = document.querySelector(".container");
		const containerWidth = container
			? (container as HTMLElement).offsetWidth
			: screenWidth;

		const marginsAuto = Math.ceil((screenWidth - containerWidth) / 2);

		return {
			isMobile,
			isTablet,
			isDesktop,
			currentDevice,
			containerWidth,
			screenWidth,
			marginsAuto,
		};
	};
