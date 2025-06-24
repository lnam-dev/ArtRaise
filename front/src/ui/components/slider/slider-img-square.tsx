import Image from "next/image";
import { TSlide } from "~/types/slider";

type SliderImgPortraitSquare = Pick<TSlide, "imgSrc"> & {
	index: number;
};

const SliderImgSquare = ({ imgSrc, index }: SliderImgPortraitSquare) => {
	return (
		<div className="flex flex-row justify-end gap-2 md:gap-4 xl:gap-6 max-h-[90vh] lg:max-h-[75vh] xl:max-h-[70vh]">
			<figure className="flex-grow-[1] relative aspect-square">
				<Image
					src={imgSrc}
					alt={`Slide ${index + 1}`}
					className="h-auto w-full object-cover opacity-30"
					fill
					loading="lazy"
				/>
			</figure>
			<figure className="flex-grow-[1] relative aspect-square">
				<Image
					src={imgSrc}
					alt={`Slide ${index + 1}`}
					className="h-auto w-full object-cover opacity-30"
					fill
					loading="lazy"
				/>
			</figure>
			<figure className="flex-grow-[2] flex-shrink-0 relative aspect-square">
				<Image
					src={imgSrc}
					alt={`Slide ${index + 1}`}
					className="h-full w-auto object-cover object-right"
					fill
					loading="lazy"
				/>
			</figure>
		</div>
	);
};
export default SliderImgSquare;
