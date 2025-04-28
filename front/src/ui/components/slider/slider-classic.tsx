"use client";

import { FC } from "react";
import { SwiperSlide } from "swiper/react";
import Image from "next/image";
import SliderBase from "./slider-base";
import { TSliderBaseProps } from "~/types/slider";

const SliderClassic: FC<TSliderBaseProps> = ({
	slides,
	children,
	swiperProps,
	...props
}) => {
	return (
		<SliderBase
			slides={slides}
			wrapperStyle="pl-4 xl:pl-0"
			swiperProps={{
				...swiperProps,
			}}
			unpackedSlides={(slides) => (
				<>
					{slides.map((obj, index) => (
						<SwiperSlide key={index}>
							<div className="relative w-full aspect-[16/9] ">
								<Image
									src={obj.imgSrc}
									alt={`Slide ${index + 1}`}
									fill
									className="object-contain"
									loading="lazy"
								/>
							</div>
						</SwiperSlide>
					))}
				</>
			)}
			{...props}>
			{children}
		</SliderBase>
	);
};

export default SliderClassic;
