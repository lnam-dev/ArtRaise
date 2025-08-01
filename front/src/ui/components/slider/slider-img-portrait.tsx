import Image from "next/image";
import { memo } from "react";
import { TSlide } from "~/types/slider";

type SliderImgPortraitProps = Pick<TSlide, "imgSrc"> & {
	index: number;
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

const SliderImgPortrait = memo<SliderImgPortraitProps>(({ imgSrc, index }) => {
	const slideAlt = `Slide ${index + 1}`;

	return (
		<div className="flex flex-row gap-2 md:gap-4 xl:gap-6 max-h-[75vh]">
			<figure className="flex-shrink-0 w-[40vh] md:w-[45vh] lg:w-[50vh] relative">
				<Image
					src={imgSrc}
					alt={slideAlt}
					width={0}
					height={0}
					sizes="50vh"
					className="w-full h-auto"
					priority={index === 0}
				/>
			</figure>

			<div className="grid grid-cols-1 grid-rows-1 md:grid-rows-2 md:grid-cols-3 gap-2 md:gap-4 xl:gap-6 w-full h-auto">
				{GRID_IMAGES_CONFIG.map((config, gridIndex) => (
					<figure
						key={gridIndex}
						className={`${config.containerClass} group cursor-pointer`}>
						<Image
							src={imgSrc}
							alt={slideAlt}
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1280px) 25vw, 20vw"
							className={`object-cover opacity-40 ${config.imageClass} transition-all duration-300 ease-in-out hover:opacity-100 hover:scale-105`}
						/>
					</figure>
				))}
			</div>
		</div>
	);
});

export default SliderImgPortrait;
