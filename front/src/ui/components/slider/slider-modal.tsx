"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Zoom } from "swiper/modules";

import "swiper/css";
import "./slider-modal.scss";

import useDevice from "~/ui/hooks/useDevice/useDevice";

import SliderModalClose from "./slider-modal-close";

import { TSliderBaseProps } from "~/types/slider";
import { TArtPiece } from "~/types/art";

const SliderModal: React.FC<{
	slides: TSliderBaseProps["slides"];
	orientation?: TArtPiece["orientation"];
	initialSlide?: number;
}> = ({ slides, orientation = "landscape", initialSlide = 0, ...props }) => {
	const { currentDevice } = useDevice();

	return (
		<section {...props}>
			<div className="slider-modal__wrapper">
				<Swiper
					loop
					modules={[Zoom]}
					zoom={true}
					threshold={20}
					touchRatio={1}
					initialSlide={initialSlide}
					className="slider-modal__swiper">
					<div className="slider-modal__swiper-wrapper">
						<SwiperSlide>
							<div
								className={`slider-modal__container slider-modal__container--${currentDevice} swiper-zoom-container`}>
								<div
									className={`slider-modal__content slider-modal__content--${currentDevice}`}>
									<figure
										className={`slider-modal__image-wrapper slider-modal__image-wrapper--${orientation}`}>
										<Image
											src={slides[initialSlide].image_url}
											alt={
												slides[initialSlide].description ||
												slides[initialSlide].title
											}
											width={0}
											height={0}
											sizes="60vw"
											className={`slider-modal__image slider-modal__image--${orientation}`}
										/>
									</figure>
									<SliderModalClose />
								</div>
							</div>
						</SwiperSlide>
					</div>
				</Swiper>
			</div>
		</section>
	);
};

export default SliderModal;
