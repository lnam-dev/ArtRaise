import { ComponentProps } from "react";
import { useSwiper } from "swiper/react";

import Chewron from "~/assets/chevron-slider.svg";
import SliderPagination from "./slider-pagination";

import useKeyPress from "~/ui/hooks/useKeyPress";

type SliderNavPanelProps = ComponentProps<typeof SliderPagination>;

export default function SliderNavPanel({
	currentSlide,
	slidesLegnth,
}: SliderNavPanelProps) {
	const swiper = useSwiper();

	const handlePrevSlide = () => swiper?.slidePrev();
	const handleNextSlide = () => swiper?.slideNext();

	useKeyPress("ArrowLeft", handlePrevSlide);
	useKeyPress("ArrowRight", handleNextSlide);

	return (
		<div className="flex bg-[#000212] shadow-sm bg-opacity-[64%]">
			<button className="all-unset px-7 py-2" onClick={handlePrevSlide}>
				<Chewron height="44" width="44" />
			</button>
			<SliderPagination
				currentSlide={currentSlide}
				slidesLegnth={slidesLegnth}
			/>
			<button className="all-unset px-7 py-2" onClick={handleNextSlide}>
				<Chewron height="44" width="44" className="-rotate-180" />
			</button>
		</div>
	);
}
