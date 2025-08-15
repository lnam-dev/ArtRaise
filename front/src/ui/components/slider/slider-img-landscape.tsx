import Image from "next/image";
import { memo } from "react";

import { TSliderItem } from "~/types/slider";

import SliderButtonExpand from "./slider-button-expand";
import { TArtPiece } from "~/types/art";

type SliderImgLandscapeProps = Pick<TSliderItem, "image_url"> & {
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
		containerClass: "relative overflow-hidden",
		imageClass: "scale-110 origin-bottom-right",
	},
] as const;

const SliderImgLandscape = memo<SliderImgLandscapeProps>(
	({ image_url, index, slides, orientation }) => {
		const slideAlt = `Slide ${index + 1}`;

		return (
			<div className="flex flex-row gap-2 md:gap-4 xl:gap-6 max-h-[75vh]">
				<figure className="flex-shrink-0 h-auto w-full lg:w-[70%] xl:w-[60%] 2xl:w-[55%] relative">
					<Image
						src={image_url}
						alt={slideAlt}
						width={0}
						height={0}
						sizes="100vw"
						className="h-auto w-full object-contain max-h-[75vh]"
						priority={index === 0}
					/>
					<SliderButtonExpand
						slides={slides}
						orientation={orientation}
						className="absolute bottom-0 right-0"
					/>
				</figure>

				<div className="grid grid-cols-1 grid-rows-1 lg:grid-cols-2 gap-2 md:gap-4 xl:gap-6 flex-1 self-stretch min-h-0">
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

export default SliderImgLandscape;
