"use client";

import { FC } from "react";
import { SwiperSlide } from "swiper/react";

import SliderBase from "./slider-base";
import SliderImgPortrait from "./slider-img-portrait";
import SliderImgLandscape from "./slider-img-landscape";
import SliderImgSquare from "./slider-img-square";
import SliderButtonExpand from "./slider-button-expand";
import type { TSliderClassicProps } from "~/types/slider";

const orientationMapping = {
	portrait: SliderImgPortrait,
	landscape: SliderImgLandscape,
	square: SliderImgSquare,
};

const SliderClassic: FC<TSliderClassicProps> = ({
	slides,
	orientation,
	...props
}) => {
	const OrientationComponent = orientationMapping[orientation];
	return (
		<SliderBase
			slides={slides}
			wrapperStyle="pl-4 xl:pl-0"
			unpackedSlides={(slides) => (
				<>
					{slides.map((obj, index) => (
						<SwiperSlide key={index}>
							<OrientationComponent
								slides={slides}
								orientation={orientation}
								imgSrc={obj.imgSrc}
								index={index}
							/>
						</SwiperSlide>
					))}
				</>
			)}
			{...props}
		/>
	);
};

export default SliderClassic;
