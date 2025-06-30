"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Zoom } from "swiper/modules";

import "swiper/css";
import "./slider-modal.scss";

import useDevice from "~/ui/hooks/useDevice";

import SliderModalClose from "./slider-modal-close";

import { TSliderBaseProps } from "~/types/slider";
import { TArtPiece } from "~/types/art";

const SliderModal: React.FC<{
	slides: TSliderBaseProps["slides"];
	orientation?: TArtPiece["orientation"];
}> = ({ slides, orientation = "landscape", ...props }) => {
	const { currentDevice } = useDevice();

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
					className="slider-modal__swiper">
					{slides.map((slide, index) => (
						<SwiperSlide key={index}>
							<div className="slider-modal__swiper-wrapper swiper-zoom-container">
								<div
									className={`slider-modal__container slider-modal__container--${currentDevice}`}>
									<div
										className={`slider-modal__content slider-modal__content--${currentDevice}`}>
										<figure
											className={`slider-modal__image-wrapper slider-modal__image-wrapper--${orientation}`}>
											<Image
												src={slide.imgSrc}
												alt={slide.description || slide.title}
												width={0}
												height={0}
												sizes="100vw"
												className={`slider-modal__image slider-modal__image--${orientation}`}
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
