import { ComponentProps } from "react";
import { useSwiper } from "swiper/react";

import SliderPagination from "./slider-pagination";
import SliderNavButton from "./slider-nav-button";

import useKeyPress from "~/ui/hooks/useKeyPress";

type SliderNavPanelProps = ComponentProps<typeof SliderPagination>;

export default function SliderNavPanel({
	currentSlide,
	slidesLength = 0,
}: SliderNavPanelProps) {
	const swiper = useSwiper();

	const handlePrevSlide = () => swiper?.slidePrev();
	const handleNextSlide = () => swiper?.slideNext();

	useKeyPress("ArrowLeft", handlePrevSlide);
	useKeyPress("ArrowRight", handleNextSlide);

	if (slidesLength < 2) return;

	return (
		<div className="flex bg-[#000212] shadow-sm bg-opacity-[64%]">
			<SliderNavButton variable={"left"} onClick={handlePrevSlide} />
			<SliderPagination
				currentSlide={currentSlide}
				slidesLength={slidesLength}
			/>
			<SliderNavButton variable={"right"} onClick={handleNextSlide} />
		</div>
	);
}
