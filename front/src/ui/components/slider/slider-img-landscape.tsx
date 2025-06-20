import Image from "next/image";
import { TSlide } from "~/types/slider";

type SliderImgLandscapeProps = Pick<TSlide, "imgSrc"> & {
	index: number;
};

const SliderImgLandscape = ({ imgSrc, index }: SliderImgLandscapeProps) => {
	return (
		<figure className="relative w-full aspect-[2/1] h-[70vh]">
			<Image
				src={imgSrc}
				alt={`Slide ${index + 1}`}
				fill
				className="object-cover"
				loading="lazy"
			/>
		</figure>
	);
};
export default SliderImgLandscape;
