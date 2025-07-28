"use client";

import { FC } from "react";
import { TSlide } from "~/types/slider";

import SliderClassic from "~/ui/components/slider/slider-classic";

import { TArtPiece } from "~/types";

interface SliderWrapperProps {
	artPiece: TArtPiece;
	className?: string;
}

const SliderWrapper: FC<SliderWrapperProps> = ({ artPiece, ...props }) => {
	const slides: TSlide[] = [
		{
			imgSrc: artPiece.image_artpiece,
			title: artPiece.title,
		},
	];
	return (
		<SliderClassic
			slides={slides}
			orientation={artPiece.orientation}
			{...props}
		/>
	);
};

export default SliderWrapper;
