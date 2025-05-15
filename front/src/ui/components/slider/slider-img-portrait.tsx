import Image from "next/image";
import { TSlide } from "~/types/slider";
import useDevice from "~/ui/hooks/useDevice";

type SliderImgPortraitProps = Pick<TSlide, "imgSrc"> & {
	index: number;
};

const SliderImgPortrait = ({ imgSrc, index }: SliderImgPortraitProps) => {
	const { isMobile, isTablet, isDesktop } = useDevice();
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
			<div className="columns-2 gap-4 space-y-4 w-full">
				{[1, 2, 3, 4].map((_, index) => (
					<figure key={index} className="relative">
						<Image
							src={imgSrc}
							alt={`Slide ${index + 1}`}
							layout="responsive"
							width={9}
							height={16}
							className="object-cover"
							loading="lazy"
						/>
					</figure>
				))}
			</div>
		</div>
	);
};
export default SliderImgPortrait;
