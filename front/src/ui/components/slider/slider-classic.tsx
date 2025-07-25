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
	children,
	orientation,
	swiperProps,
	...props
}) => {
	const OrientationComponent = orientationMapping[orientation];
	return (
		<SliderBase
			slides={slides}
			headerStyle="w-[60%]"
			wrapperStyle="pl-4 xl:pl-0"
			swiperProps={{
				...swiperProps,
			}}
			unpackedSlides={(slides) => (
				<>
					{slides.map((obj, index) => (
						<SwiperSlide key={index}>
							<OrientationComponent imgSrc={obj.imgSrc} index={index} />
						</SwiperSlide>
					))}
				</>
			)}
			headerElements={() => (
				<>{<SliderButtonExpand slides={slides} orientation={orientation} />}</>
			)}
			{...props}>
			{children}
		</SliderBase>
	);
};

export default SliderClassic;
