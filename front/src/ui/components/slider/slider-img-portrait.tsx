import Image from "next/image";
import { TSlide } from "~/types/slider";
import useDevice from "~/ui/hooks/useDevice/useDevice";

type SliderImgPortraitProps = Pick<TSlide, "imgSrc"> & {
	index: number;
};

const COLUMNS_IMAGES = [
	["30%", "70%"],
	["70%", "30%"],
	["30%", "70%"],
	["70%", "30%"],
	["30%", "70%"],
];

const SliderImgPortrait = ({ imgSrc, index }: SliderImgPortraitProps) => {
	return (
		<div className="flex flex-row justify-end gap-2 md:gap-4 xl:gap-6 max-h-[75vh]">
			<figure className="flex-grow-[3] flex-shrink-0 w-auto h-auto relative min-w-[40vh] md:min-w-[45vh] lg:min-w-[50vh] lg:max-w-[50%] xl:max-w-[25%]">
				<Image
					src={imgSrc}
					alt={`Slide ${index + 1}`}
					width={0}
					height={0}
					sizes="100vw"
					className="w-full h-auto"
					loading="lazy"
				/>
			</figure>
			{
				<div className="columns-1 sm:columns-2 xl:columns-3 2xl:columns-4 gap-2 md:gap-4 xl:gap-6 w-full display-none sm:display-block">
					{COLUMNS_IMAGES.map((heights, colIdx) => (
						<div
							key={colIdx}
							className="space-y-2 md:space-y-4 xl:space-y-6 w-full h-full">
							{heights.map((height, imgIdx) => {
								return (
									<figure
										key={`${colIdx}-${imgIdx}`}
										className="relative"
										style={{
											height,
										}}>
										<Image
											src={imgSrc}
											alt={`Slide ${index + 1} - ${colIdx}-${imgIdx}`}
											fill
											className={`object-cover opacity-30 `}
										/>
									</figure>
								);
							})}
						</div>
					))}
				</div>
			}
		</div>
	);
};
export default SliderImgPortrait;
