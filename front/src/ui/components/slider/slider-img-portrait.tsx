import Image from "next/image";
import { TSlide } from "~/types/slider";
import useDevice from "~/ui/hooks/useDevice";

type SliderImgPortraitProps = Pick<TSlide, "imgSrc"> & {
	index: number;
};

const COLUMNS_IMAGES = [
	["30%", "70%"],
	["70%", "30%"],
	["30%", "70%"],
];

const SliderImgPortrait = ({ imgSrc, index }: SliderImgPortraitProps) => {
	const { isDesktop } = useDevice();
	return (
		<div className="flex flex-row justify-start gap-6 h-[70vh]">
			<figure className="relative w-full lg:max-w-[50%] xl:max-w-[25%] aspect-[9/16]">
				<Image
					src={imgSrc}
					alt={`Slide ${index + 1}`}
					className="object-cover"
					fill
					loading="lazy"
				/>
			</figure>
			{isDesktop && (
				<div className="columns-3 gap-6 w-full">
					{COLUMNS_IMAGES.map((heights, colIdx) => (
						<div key={colIdx} className="space-y-6 w-full h-full">
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
											loading="lazy"
										/>
									</figure>
								);
							})}
						</div>
					))}
				</div>
			)}
		</div>
	);
};
export default SliderImgPortrait;
