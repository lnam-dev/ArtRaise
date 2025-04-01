"use client";

import { useState, useEffect, useLayoutEffect } from "react";

const useDevice = () => {
	const [device, setDevice] = useState({
		isMobile: false,
		isTablet: false,
		isDesktop: false,
		containerWidth: 0,
		screenWidth: 0,
		marginsAuto: 0,
	});

	const updateDevice = () => {
		const screenWidth = window.innerWidth;
		const isMobile = screenWidth <= 767;
		const isTablet = screenWidth >= 768 && screenWidth <= 992;
		const isDesktop = screenWidth > 1344;

		setDevice((prevState) => ({
			...prevState,
			isMobile,
			isTablet,
			isDesktop,
			screenWidth,
		}));
	};

	useEffect(() => {
		const updateDimensions = () => {
			const containerElement = document.querySelector(".container");
			const screenWidth = window.innerWidth;

			if (containerElement) {
				const containerWidth = containerElement.offsetWidth;
				const marginsAuto = Math.ceil((screenWidth - containerWidth) / 2); // Round up to the nearest whole number

				setDevice((prevState) => ({
					...prevState,
					screenWidth,
					containerWidth,
					marginsAuto,
				}));
			}
		};

		updateDimensions();
		window.addEventListener("resize", updateDimensions);

		return () => {
			window.removeEventListener("resize", updateDimensions);
		};
	}, []);

	useEffect(() => {
		updateDevice();
		const mediaQueryMobile = window.matchMedia("(max-width: 767px)");
		const mediaQueryTablet = window.matchMedia(
			"(min-width: 768px) and (max-width: 1344px)"
		);
		const mediaQueryDesktop = window.matchMedia("(min-width: 1345px)");

		const handleMediaQueryChange = () => {
			updateDevice();
		};

		mediaQueryMobile.addEventListener("change", handleMediaQueryChange);
		mediaQueryTablet.addEventListener("change", handleMediaQueryChange);
		mediaQueryDesktop.addEventListener("change", handleMediaQueryChange);

		return () => {
			mediaQueryMobile.removeEventListener("change", handleMediaQueryChange);
			mediaQueryTablet.removeEventListener("change", handleMediaQueryChange);
			mediaQueryDesktop.removeEventListener("change", handleMediaQueryChange);
		};
	}, []);

	return device;
};

export default useDevice;
