import Image from "next/image";
import { TSlide } from "~/types/slider";
import useDevice from "~/ui/hooks/useDevice";

type SliderImgPortraitProps = Pick<TSlide, "imgSrc"> & {
	index: number;
};

const COLUMNS_IMAGES = [
	["30%", "70%"],
	["70%", "30%"],
];

const FILTERS = [
	"filter sepia-[50%] contrast-125 brightness-90",
	"filter saturate-[130%] contrast-125",
	"filter grayscale",
	"filter saturate-[180%] brightness-[85%] ",
];

const SliderImgPortrait = ({ imgSrc, index }: SliderImgPortraitProps) => {
	const { isDesktop } = useDevice();
	return (
		<div className="flex flex-row gap-6">
			<figure className="relative w-full">
				<Image
					src={imgSrc}
					alt={`Slide ${index + 1}`}
					layout="responsive"
					width={9}
					height={16}
					className="object-contain"
					loading="lazy"
				/>
			</figure>
			{isDesktop && (
				<div className="columns-2 gap-6 w-full">
					{COLUMNS_IMAGES.map((heights, colIdx) => (
						<div key={colIdx} className="space-y-6 w-full h-full">
							{heights.map((height, imgIdx) => {
								const filterClass = FILTERS[colIdx * 2 + imgIdx];
								return (
									<figure
										key={`${colIdx}-${imgIdx}`}
										className="relative"
										style={{ height }}>
										<Image
											src={imgSrc}
											alt={`Slide ${index + 1} - ${colIdx}-${imgIdx}`}
											fill
											className={`object-cover ${filterClass}`}
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
