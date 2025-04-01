"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useRef, useState } from "react";
import { Swiper as SwiperType } from "swiper";
import useDevice from "~/ui/hooks/useDevice";
import "swiper/css";

import Image from "next/image";
import SliderNavPanel from "./slider-nav-panel";
import SliderButtonExpand from "./slider-button-expand";
import SliderPagination from "./slider-pagination";
import { Turnabout } from "../turnabout/turnabout";
import { TSlide } from "~/types/slider";

type SliderProps = React.HTMLAttributes<HTMLElement> & {
	slides: TSlide[];
};

const PADDING_FOR_MOBILE = 16;

export const Slider: React.FC<SliderProps> = ({ slides, ...props }) => {
	const { marginsAuto, isDesktop, isTablet, isMobile } = useDevice();

	const swiperRef = useRef<SwiperType | null>(null);
	const [currentSlideIdx, setSlideIdx] = useState(0);

	function validationDevice() {
		if (isMobile) {
			return 0;
		} else if (isDesktop) {
			return -marginsAuto + 8;
		} else if (isTablet) {
			return -marginsAuto - PADDING_FOR_MOBILE;
		}
	}

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
					centeredSlides
					slidesPerView={1}
					spaceBetween={0}
					slidesOffsetBefore={validationDevice()}
					loopAdditionalSlides={1}
					observer={true}
					observeParents={true}
					simulateTouch={false}
					speed={600}
					onSwiper={(swiper) => {
						swiperRef.current = swiper;
					}}
					className="mb-2 w-full overflow-visible relative">
					{slides.map((obj, index) => (
						<SwiperSlide key={index}>
							<div className="relative w-full aspect-[16/9] h-[70vh] lg:min-h-[80vh] xl:min-h-[90vh] 2xl:min-h-[75vh]">
								<Image
									src={obj.imgSrc}
									alt={`Slide ${index + 1}`}
									fill
									className="object-cover"
									loading="lazy"
								/>
							</div>
						</SwiperSlide>
					))}
					<div className="container absolute bottom-0 left-0 w-full z-20 flex items-end justify-between px-4 xl:px-0 xl:justify-normal -translate-x-1/2 left-1/2">
						<div className="bg-gradient-light backdrop-blur-md pr-4 xl:pr-0 before:bg-gradient-light before:backdrop-blur-md before:absolute before:-left-[100%] before:w-[100%] before:h-full sm:pr-0 xl:w-full">
							<Turnabout
								currentIndex={currentSlideIdx}
								text={slides.map(({ title }) => title)}
								tag={"h1"}
								textClass="font-namu text-8 md:text-12 lg:text-20 text-black leading-none py-2"
								animation="ease-in-out"
								duration={600}
							/>
						</div>
						{!isDesktop && (
							<SliderButtonExpand className="translate-x-4 sm:translate-x-0" />
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
					<Turnabout
						currentIndex={currentSlideIdx}
						text={slides.map(({ subtitle }) => subtitle)}
						tag={"span"}
						textClass="font-fixel font-medium lg:font-normal text-4 md:text-5 lg:text-6 text-black "
						wrapperClass="mb-1"
						animation="ease-in-out"
						duration={600}
					/>
					<Turnabout
						currentIndex={currentSlideIdx}
						text={slides.map(({ description }) => description)}
						tag={"h3"}
						textClass="font-fixel text-4 font-medium lg:font-normal lg:font-namu md:text-6 lg:text-8 text-black"
						wrapperClass="mb-2 xl:mb-0"
						animation="ease-in-out"
						duration={600}
					/>
					{!isDesktop && (
						<SliderPagination
							mode="dark"
							currentSlide={currentSlideIdx}
							slidesLegnth={slides.length}
							className=""
						/>
					)}
				</div>
			</div>
		</section>
	);
};
