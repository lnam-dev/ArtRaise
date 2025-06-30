import Image from "next/image";
import { TSlide } from "~/types/slider";
import useDevice from "~/ui/hooks/useDevice";

type SliderImgPortraitSquare = Pick<TSlide, "imgSrc"> & {
	index: number;
};

const SliderImgSquare = ({ imgSrc, index }: SliderImgPortraitSquare) => {
	const { isTablet, isDesktop } = useDevice();

	const columnsCount = isTablet ? 1 : isDesktop ? 2 : 0;

	return (
		<div className="flex flex-row justify-end gap-2 md:gap-4 xl:gap-6 max-h-[90vh] lg:max-h-[75vh] xl:max-h-[70vh]">
			{Array.from({ length: columnsCount }, () => (
				<figure className="flex-grow-[2] relative aspect-square">
					<Image
						src={imgSrc}
						alt={`Slide`}
						className="object-cover opacity-30"
						fill
						loading="lazy"
					/>
				</figure>
			))}
			<figure className="flex-grow-[2] flex-shrink-0 w-auto h-auto relative">
				<Image
					src={imgSrc}
					alt={`Slide ${index + 1}`}
					width={0}
					height={0}
					sizes="100vw"
					className="w-full h-auto object-contain object-right"
					loading="lazy"
				/>
			</figure>
		</div>
	);
};
export default SliderImgSquare;
