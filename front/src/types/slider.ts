import { Swiper as SwiperType } from "swiper";
import { SwiperOptions } from "swiper/types";

export type TSlide = {
	imgSrc: string;
	title: string;
	subtitle?: string;
	description?: string;
};

export type TSliderBaseProps = React.HTMLAttributes<HTMLElement> & {
	slides: TSlide[];
	swiperProps: SwiperOptions;
	headerStyle?: string;
	wrapperStyle?: string;
	expandStyle?: string;
	unpackedSlides?: (slides: TSlide[]) => React.ReactNode;
	children: (currentSlideIdx: number) => React.ReactNode;
};
