"use client";

import { FC } from "react";
import { TSlide } from "~/types/slider";

import SliderClassic from "~/ui/components/slider/slider-classic";
import LinkTo from "~/assets/link-to.svg";
import Link from "~/bridge/ui/Link";
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
			{...props}>
			{/* @ts-ignore */}
			{() => (
				<Link
					to={`authors/${artPiece.author.id}`}
					className="flex gap-2 items-center">
					<p className="font-fixel font-medium leading-0 lg:font-normal text-4 md:text-5 lg:text-6 text-gray-950">
						{artPiece.author.fullname}
					</p>
					<LinkTo className="inline-block fill-gray-950" />
				</Link>
			)}
		</SliderClassic>
	);
};

export default SliderWrapper;
