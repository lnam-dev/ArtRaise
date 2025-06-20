"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useRef, useState } from "react";
import { Swiper as SwiperType } from "swiper";
import useDevice from "~/ui/hooks/useDevice";
import "swiper/css";

import SliderNavPanel from "./slider-nav-panel";
import SliderButtonExpand from "./slider-button-expand";
import SliderPagination from "./slider-pagination";
import Turnabout from "../turnabout/turnabout";
import { TSliderBaseProps } from "~/types/slider";

const SliderBase: React.FC<TSliderBaseProps> = ({
	slides,
	variant = "classic",
	children,
	swiperProps,
	unpackedSlides,
	headerStyle,
	wrapperStyle,
	expandStyle,
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
						<div
							className={`bg-gradient-light backdrop-blur-md pr-4 before:bg-gradient-light before:backdrop-blur-md before:absolute before:-left-[100%] before:w-[100%] before:h-full ${headerStyle}`}>
							<Turnabout
								currentIndex={currentSlideIdx}
								text={slides.map(({ title }) => title)}
								tag={"h1"}
								textClass="font-namu text-8 md:text-12 lg:text-20 text-black leading-none py-2"
								animation="ease-in-out"
								duration={600}
							/>
						</div>
						{(variant === "classic" || !isDesktop) && (
							<SliderButtonExpand className={expandStyle} slides={slides} />
						)}
						{isDesktop && (
							<SliderNavPanel
								currentSlide={currentSlideIdx}
								slidesLegnth={slides.length}
							/>
						)}
					</div>
				</Swiper>
			</div>
			<div className="container mx-auto w-full text-left">
				<div className="px-4 xl:px-0">
					{children(currentSlideIdx)}
					{!isDesktop && (
						<SliderPagination
							mode="dark"
							currentSlide={currentSlideIdx}
							slidesLegnth={slides.length}
						/>
					)}
				</div>
			</div>
		</section>
	);
};

export default SliderBase;
