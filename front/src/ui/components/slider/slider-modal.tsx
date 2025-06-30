"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useRef, useState } from "react";
import { Swiper as SwiperType } from "swiper";
import { Zoom } from "swiper/modules";
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
					modules={[Zoom]}
					zoom={true}
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
							<div className="w-[100vw] h-[100vh] swiper-zoom-container">
								<div className="flex items-center justify-center w-full h-full translate-x-8">
									<div className="flex flex-row items-start">
										<figure className="relative w-auto h-[90vh]">
											<Image
												src={slide.imgSrc}
												alt={slide.description || slide.title}
												width={0}
												height={0}
												sizes="100vw"
												className="w-auto h-full"
												loading="lazy"
											/>
										</figure>
										<SliderModalClose />
									</div>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
			<div className="container mx-auto w-full text-left">
				<div className="mobile-spacing">
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
