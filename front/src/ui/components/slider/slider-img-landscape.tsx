import Image from "next/image";
import { TSlide } from "~/types/slider";

type SliderImgLandscapeProps = Pick<TSlide, "imgSrc"> & {
	index: number;
};

const SliderImgLandscape = ({ imgSrc, index }: SliderImgLandscapeProps) => {
	return (
		<div className="relative w-full aspect-[2/1] ">
			<Image
				src={imgSrc}
				alt={`Slide ${index + 1}`}
				fill
				className="object-contain"
				loading="lazy"
			/>
		</div>
	);
};
export default SliderImgLandscape;
