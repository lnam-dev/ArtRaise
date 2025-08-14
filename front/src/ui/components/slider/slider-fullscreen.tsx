"use client";

import { FC } from "react";
import { SwiperSlide } from "swiper/react";
import Image from "next/image";

import useDevice from "~/ui/hooks/useDevice/useDevice";

import { TArtPiece } from "~/types";
import { TSliderBaseProps } from "~/types/slider";

import SliderBase from "./slider-base";
import SliderButtonExpand from "./slider-button-expand";
import Turnabout from "../turnabout/turnabout";

const PADDING_FOR_MOBILE = 16;
const ORIENTATION: TArtPiece["orientation"] = "landscape";

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
			swiperProps={{
				slidesOffsetBefore: validationDevice(),
				...swiperProps,
			}}
			unpackedSlides={(slides) => (
				<>
					{slides.map((obj, index) => (
						<SwiperSlide key={index}>
							<figure className="relative w-full aspect-[16/9] h-[70vh] lg:min-h-[80vh] xl:min-h-[90vh] 2xl:min-h-[75vh]">
								<Image
									src={obj.imgSrc}
									alt={`Slide ${index + 1}`}
									className="object-cover"
									fill
									priority
								/>
							</figure>
						</SwiperSlide>
					))}
				</>
			)}
			headerElements={(currentSlideIdx) => (
				<>
					<div
						className={`bg-gradient-light backdrop-blur-md pr-4 before:bg-gradient-light before:backdrop-blur-md before:absolute before:-left-[100%] before:w-[100%] before:h-full xl:pr-0 xl:w-full`}>
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
						<SliderButtonExpand
							className="translate-x-4 sm:translate-x-0"
							slides={slides}
							orientation={ORIENTATION}
						/>
					)}
				</>
			)}
			{...props}
			variant="fullscreen">
			{children}
		</SliderBase>
	);
};

export default SliderFullscreen;
