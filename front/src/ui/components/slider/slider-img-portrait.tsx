import Image from "next/image";
import { memo } from "react";

import { TSliderItem } from "~/types/slider";

import SliderButtonExpand from "./slider-button-expand";
import { TArtPiece } from "~/types/art";

type SliderImgPortraitProps = Pick<TSliderItem, "image_url"> & {
	index: number;
	slides: TSliderItem[];
	orientation: TArtPiece["orientation"];
};

const GRID_IMAGES_CONFIG = [
	{
		containerClass: "relative overflow-hidden",
		imageClass: "scale-125 origin-top-left",
	},
	{
		containerClass: "relative overflow-hidden md:col-span-2",
		imageClass: "scale-110 origin-center",
	},
	{
		containerClass: "relative overflow-hidden md:col-span-2",
		imageClass: "scale-110 origin-bottom-right",
	},
	{
		containerClass: "relative overflow-hidden",
		imageClass: "scale-130 origin-top-right",
	},
] as const;

const SliderImgPortrait = memo<SliderImgPortraitProps>(
	({ image_url, index, slides, orientation }) => {
		const slideAlt = `Slide ${index + 1}`;

		return (
			<div className="relative flex flex-row gap-2 md:gap-4 xl:gap-6 h-[75vh]">
				<figure className="flex-shrink-0 h-full relative">
					<Image
						src={image_url}
						alt={slideAlt}
						width={0}
						height={0}
						sizes="50vh"
						className="h-full w-auto object-contain"
						priority={index === 0}
					/>
					<SliderButtonExpand
						slides={slides}
						orientation={orientation}
						className="absolute bottom-0 right-0"
					/>
				</figure>

				<div className="grid grid-cols-1 grid-rows-1 md:grid-rows-2 md:grid-cols-3 gap-2 md:gap-4 xl:gap-6 flex-1 h-full">
					{GRID_IMAGES_CONFIG.map((config, gridIndex) => (
						<figure
							key={gridIndex}
							className={`${config.containerClass} group cursor-pointer ${
								gridIndex === 1 ? "block" : "hidden md:block"
							}`}>
							<Image
								src={image_url}
								alt={slideAlt}
								fill
								sizes="(max-width: 768px) 100vw, (max-width: 1280px) 25vw, 20vw"
								className={`object-cover opacity-40 ${config.imageClass} transition-all duration-300 ease-in-out xl:hover:opacity-100 xl:hover:scale-105`}
							/>
						</figure>
					))}
				</div>
			</div>
		);
	}
);

export default SliderImgPortrait;
