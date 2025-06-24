import Image from "next/image";
import { TSlide } from "~/types/slider";

type SliderImgLandscapeProps = Pick<TSlide, "imgSrc"> & {
	index: number;
};

const SliderImgLandscape = ({ imgSrc, index }: SliderImgLandscapeProps) => {
	return (
		<figure className="relative w-full max-h-[70vh]">
			<Image
				src={imgSrc}
				alt={`Slide ${index + 1}`}
				layout="responsive"
				width={16}
				height={9}
				className="object-contain"
				loading="lazy"
			/>
		</figure>
	);
};
export default SliderImgLandscape;
