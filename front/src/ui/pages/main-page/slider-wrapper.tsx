"use client";

import { FC } from "react";
import Slider from "../../components/slider/slider";
import Turnabout from "../../components/turnabout/turnabout";
import { TSlide } from "~/types/slider";

interface SliderWrapperProps {
	slides: TSlide[];
	className?: string;
}

const SliderWrapper: FC<SliderWrapperProps> = ({ slides, ...props }) => {
	return (
		<Slider slides={slides} {...props}>
			{/* @ts-ignore */}
			{(currentSlideIdx) => (
				<>
					<Turnabout
						currentIndex={currentSlideIdx}
						text={slides.map(({ subtitle }) => subtitle)}
						tag={"span"}
						textClass="font-fixel font-medium lg:font-normal text-4 md:text-5 lg:text-6 text-black "
						wrapperClass="mb-1"
						animation="ease-in-out"
						duration={600}
					/>
					<Turnabout
						currentIndex={currentSlideIdx}
						text={slides.map(({ description }) => description)}
						tag={"h3"}
						textClass="font-fixel text-4 font-medium lg:font-normal lg:font-namu md:text-6 lg:text-8 text-black"
						wrapperClass="mb-2 xl:mb-0"
						animation="ease-in-out"
						duration={600}
					/>
				</>
			)}
		</Slider>
	);
};

export default SliderWrapper;
