import Image from "next/image";
import { memo } from "react";

import { TSliderItem } from "~/types/slider";

import SliderButtonExpand from "./slider-button-expand";
import { TArtPiece } from "~/types/art";

type SliderImgSquareProps = Pick<TSliderItem, "image_url"> & {
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
		imageClass: "scale-130 origin-top-top",
	},
] as const;

const SliderImgSquare = memo<SliderImgSquareProps>(
	({ image_url, index, slides, orientation }) => {
		const slideAlt = `Slide ${index + 1}`;

		// Висота блоку: показуємо більше на desktop (75vh замість 65vh). Головне зображення завжди повністю влазить.
		const heightClasses = "h-[75vh] md:h-[50vh] xl:h-[75vh]";

		return (
			<div className={`flex flex-row gap-2 md:gap-4 xl:gap-6 ${heightClasses}`}>
				<figure
					className={`relative flex-shrink-0 aspect-square ${heightClasses} bg-white`}>
					<Image
						src={image_url || "/default.png"}
						alt={slideAlt}
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1024px) 65vw, (max-width: 1280px) 70vw, 60vw"
						className="select-none object-cover w-full h-full"
						priority={index === 0}
					/>
					<SliderButtonExpand
						slides={slides}
						orientation={orientation}
						className="absolute bottom-0 right-0"
					/>
				</figure>

				<div
					className={`grid grid-cols-1 grid-rows-1 md:grid-cols-2 gap-2 md:gap-4 xl:gap-6 flex-1 self-stretch ${heightClasses}`}>
					{GRID_IMAGES_CONFIG.map((config, gridIndex) => (
						<figure
							key={gridIndex}
							className={`${
								config.containerClass
							} group cursor-pointer relative h-full ${
								gridIndex === 1 ? "block" : "hidden md:block"
							}`}>
							<Image
								src={image_url}
								alt={slideAlt}
								fill
								sizes="(max-width: 768px) 100vw, (max-width: 1280px) 25vw, 20vw"
								className={`object-cover ${config.imageClass} opacity-40 transition-all duration-300 ease-in-out xl:group-hover:opacity-100 xl:group-hover:scale-105`}
							/>
						</figure>
					))}
				</div>
			</div>
		);
	}
);

export default SliderImgSquare;
