"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useRef, useState } from "react";
import { Swiper as SwiperType } from "swiper";
import { Zoom } from "swiper/modules";

import "swiper/css";
import "./slider-modal.scss";

import useDevice from "~/ui/hooks/useDevice";

import SliderModalClose from "./slider-modal-close";

import { TSliderBaseProps } from "~/types/slider";
import { TArtPiece } from "~/types/art";

const SliderModal: React.FC<{
	slides: TSliderBaseProps["slides"];
	orientation: Pick<TArtPiece, "orientation">;
}> = ({ slides, ...props }) => {
	const { isDesktop, currentDevice } = useDevice();
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
			<div className="slider-modal__wrapper">
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
					className="slider-modal__swiper">
					{slides.map((slide, index) => (
						<SwiperSlide key={index}>
							<div className="slider-modal__swiper-wrapper swiper-zoom-container">
								<div
									className={`slider-modal__container slider-modal__container--${currentDevice}`}>
									<div
										className={`slider-modal__content slider-modal__content--${currentDevice}`}>
										<figure className="slider-modal__image">
											<Image
												src={slide.imgSrc}
												alt={slide.description || slide.title}
												width={0}
												height={0}
												sizes="100vw"
												className="w-auto h-full max-w-[90vw] lg:max-w-full"
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
		</section>
	);
};

export default SliderModal;
