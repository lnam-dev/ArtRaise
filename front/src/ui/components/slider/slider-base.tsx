"use client";

import { Swiper } from "swiper/react";
import { useEffect, useRef, useState } from "react";

import useDevice from "~/ui/hooks/useDevice/useDevice";

import { Swiper as SwiperType } from "swiper";
import { TSliderBaseProps } from "~/types/slider";

import SliderNavPanel from "./slider-nav-panel";
import SliderPagination from "./slider-pagination";

import "swiper/css";

const SliderBase: React.FC<TSliderBaseProps> = ({
	slides,
	variant = "classic",
	children,
	swiperProps,
	unpackedSlides,
	headerElements,
	wrapperStyle,
	...props
}) => {
	const { isDesktop } = useDevice();
	const swiperRef = useRef<SwiperType | null>(null);
	const [currentSlideIdx, setSlideIdx] = useState(0);

	useEffect(() => {
		if (!swiperRef.current) return;

		const handleSlideChange = () => {
			setSlideIdx(swiperRef.current?.realIndex || 0);
		};

		swiperRef.current.on("slideChange", handleSlideChange);

		return () => {
			swiperRef.current?.off("slideChange", handleSlideChange);
		};
	}, [swiperRef]);

	return (
		<section {...props}>
			<div className="w-full relative">
				<Swiper
					loop
					centeredSlides={false}
					slidesPerView={1}
					slidesPerGroup={1}
					spaceBetween={0}
					loopAdditionalSlides={1}
					observer={true}
					observeParents={true}
					simulateTouch={true}
					allowTouchMove={true}
					speed={600}
					longSwipes={false}
					threshold={20}
					touchRatio={1}
					onSwiper={(swiper) => {
						swiperRef.current = swiper;
					}}
					className="mb-2 w-full overflow-visible relative"
					{...swiperProps}>
					{unpackedSlides && unpackedSlides(slides)}
					<div
						className={`container absolute bottom-0 left-0 w-full z-20 flex items-end justify-between -translate-x-1/2 left-1/2 ${wrapperStyle}`}>
						{headerElements && headerElements(currentSlideIdx)}
						{isDesktop && (
							<SliderNavPanel
								currentSlide={currentSlideIdx}
								slidesLength={slides.length}
							/>
						)}
					</div>
				</Swiper>
			</div>
			<div className="container mx-auto w-full text-left">
				<div className="mobile-spacing">
					{children && children(currentSlideIdx)}
					{!isDesktop && (
						<SliderPagination
							mode="dark"
							currentSlide={currentSlideIdx}
							slidesLength={slides.length}
						/>
					)}
				</div>
			</div>
		</section>
	);
};

export default SliderBase;
