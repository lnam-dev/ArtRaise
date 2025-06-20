"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useRef, useState } from "react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import useDevice from "~/ui/hooks/useDevice";
import SliderPagination from "./slider-pagination";
import { TSliderBaseProps } from "~/types/slider";
import SliderModalClose from "./slider-modal-close";

const SliderModal: React.FC<{ slides: TSliderBaseProps["slides"] }> = ({
	slides,
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
			<div className="h-full w-full relative">
				<Swiper
					loop
					centeredSlides={true}
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
					className="mb-2 w-full overflow-visible relative">
					{slides.map((slide, index) => (
						<SwiperSlide key={index}>
							<figure className="aspect-[16/9] relative h-[70vh]">
								<Image
									src={slide.imgSrc}
									alt={slide.description || slide.title}
									fill
									className="object-scale-down"
								/>
								<SliderModalClose className="absolute top-0 right-0" />
							</figure>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
			<div className="container mx-auto w-full text-left">
				<div className="px-4 xl:px-0">
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

export default SliderModal;
