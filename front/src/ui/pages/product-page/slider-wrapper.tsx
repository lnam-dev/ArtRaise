"use client";

import { FC } from "react";
import { TSliderItem } from "~/types/slider";

import SliderClassic from "~/ui/components/slider/slider-classic";

import { TArtPiece } from "~/types";

interface SliderWrapperProps {
	artPiece: TArtPiece;
	className?: string;
}

type MinimalSlide = Pick<TSliderItem, "image_url" | "title">;

const SliderWrapper: FC<SliderWrapperProps> = ({ artPiece, ...props }) => {
	const slides: MinimalSlide[] = [
		{
			image_url: artPiece.image_artpiece,
			title: artPiece.title,
		},
	];
	return (
		<SliderClassic
			slides={slides as unknown as TSliderItem[]}
			orientation={artPiece.orientation}
			{...props}
		/>
	);
};

export default SliderWrapper;
