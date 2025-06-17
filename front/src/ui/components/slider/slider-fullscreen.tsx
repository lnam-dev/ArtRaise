"use client";

import { FC } from "react";
import { SwiperSlide } from "swiper/react";
import Image from "next/image";
import SliderBase from "./slider-base";
import useDevice from "~/ui/hooks/useDevice";
import { TSliderBaseProps } from "~/types/slider";

const PADDING_FOR_MOBILE = 16;

const SliderFullscreen: FC<TSliderBaseProps> = ({
	slides,
	children,
	swiperProps,
	...props
}) => {
	const { marginsAuto, isDesktop, isTablet } = useDevice();

	const validationDevice = () => {
		if (isDesktop) {
			return -marginsAuto;
		} else if (isTablet) {
			return -marginsAuto - PADDING_FOR_MOBILE;
		}
		return 0;
	};

	return (
		<SliderBase
			slides={slides}
			wrapperStyle="px-4 xl:px-0 xl:px-0 xl:justify-normal"
			headerStyle="xl:pr-0 xl:w-full"
			expandStyle="translate-x-4 sm:translate-x-0"
			swiperProps={{
				slidesOffsetBefore: validationDevice(),
				...swiperProps,
			}}
			unpackedSlides={(slides) => (
				<>
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
				</>
			)}
			{...props}>
			{children}
		</SliderBase>
	);
};

export default SliderFullscreen;
