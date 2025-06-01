import Image from "next/image";
import { TSlide } from "~/types/slider";
import useDevice from "~/ui/hooks/useDevice";

type SliderImgPortraitProps = Pick<TSlide, "imgSrc"> & {
	index: number;
};

const SliderImgSquare = ({ imgSrc, index }: SliderImgPortraitProps) => {
	const { isDesktop } = useDevice();
	return (
		<div className="flex flex-row gap-6">
			<figure className="relative w-full h-[80vh] 2xl:w-[80%]">
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
				<div className="w-full">
					<figure className="relative w-full h-full">
						<Image
							src={imgSrc}
							alt={`Slide ${index + 1}`}
							fill
							className="object-cover"
							loading="lazy"
						/>
					</figure>
				</div>
			)}
		</div>
	);
};
export default SliderImgSquare;
