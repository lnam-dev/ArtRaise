import { SwiperOptions } from "swiper/types";
import { TArtPiece } from "./art";

export type TSlide = {
	imgSrc: string;
	title: string;
	subtitle?: string;
	description?: string;
};

export type TSliderClassicProps = TSliderBaseProps &
	Pick<TArtPiece, "orientation">;

export type TSliderBaseProps = React.HTMLAttributes<HTMLElement> & {
	slides: TSlide[];
	variant: "classic" | "fullscreen";
	swiperProps: SwiperOptions;
	headerStyle?: string;
	wrapperStyle?: string;
	expandStyle?: string;
	unpackedSlides?: (slides: TSlide[]) => React.ReactNode;
	children: (currentSlideIdx: number) => React.ReactNode;
};
